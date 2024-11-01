'use client';

import { StepBar } from '@/components/form/dynamic';
import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { TEntryRegistRequest, getEntrySchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MAX_ENTRY_STEP,
  MIN_STEP,
  TRANSLATION_KEY,
  entrySteps,
  message,
} from '@/constants';
import { loadStripe } from '@stripe/stripe-js';
import { entryService, paymentService } from '@/services';
import { usePathname, useRouter } from 'next/navigation';
import { useAlertStore } from '@/stores';
import { ConfirmActions, ConfirmFeeCard } from './_components';
import { Translation } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import * as z from 'zod';
import FormEntry from './_components/FormEntry';
import FormConfirm from './_components/FormConfirm';
import moment from 'moment';
import { AxiosError } from 'axios';
import { public_routes } from '@/routes';
import { Noto_Serif_JP } from 'next/font/google';
import clsx from 'clsx';

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

type Props = {
  searchParams: {
    id: number;
    token: string;
  };
};

const Entries: FC<Props> = ({ searchParams }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const path = usePathname();
  const { showAlert, hideAlert } = useAlertStore();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isValidEntryClass, setIsValidEntryClass] = useState(true);
  const locale = useLocale();
  const EntryRegistSchema = getEntrySchema(locale);
  type EntryFormFields = z.infer<ReturnType<typeof getEntrySchema>>;

  const entryForm = useForm<EntryFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(EntryRegistSchema),
    defaultValues: {
      child_sex: '',
      being_in: '',
      entry_month: '',
      entry_class: '',
      entry_class_sub: '',
      total_pledge: [],
      pledge3: [],
      pledge4: [],
      pledge6: [],
      pledge7: [],
    },
  });

  const tourEntryQuery = useQuery({
    queryKey: ['tourEntry', searchParams],
    queryFn: () => entryService.tourEntry(searchParams),
    enabled: !!searchParams.id && !!searchParams.token,
    retry: 0,
  });

  useEffect(() => {
    if (tourEntryQuery.isError) {
      const error = tourEntryQuery.error;
      if (error instanceof AxiosError) {
        router.push(public_routes.error_invalid_page);
      }
    }
  }, [router, tourEntryQuery.error, tourEntryQuery.isError]);

  useEffect(() => {
    if (tourEntryQuery.data) {
      Object.entries(tourEntryQuery.data.data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          entryForm.setValue(key as any, String(value));
        }
      });
    }
  }, [entryForm, tourEntryQuery.data]);

  const incrementStep = () => {
    if (currentStep < MAX_ENTRY_STEP) {
      setCurrentStep(currentStep + 1);
    }
  };
  const decrementStep = () => {
    if (currentStep > MIN_STEP) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit: SubmitHandler<TEntryRegistRequest> = (data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log({ data });
    }
    incrementStep();
  };

  const handleCheckout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      setIsCheckoutLoading(true);
      // store entry data
      const { entry_class_sub, entry_class, ...rest } = entryForm.getValues();
      let final_entry_class = '';
      if (entry_class_sub && entry_class === '3') {
        final_entry_class = entry_class_sub;
      } else {
        final_entry_class = entry_class;
      }
      const requestEntryData = {
        ...rest,
        entry_class: final_entry_class,
        guardian_id: null,
        child_id: null,
        locale: locale,
      };
      const entryResponse = await entryService.createEntry(requestEntryData);
      // proceed to payment
      if (entryResponse.token) {
        const stripe = await stripePromise;
        const getSessionId = await paymentService.createPaymentSession({
          success_url: `${window.location.origin}/payment-success?token=${entryResponse.token}`,
          cancel_url: `${window.location.origin}${path}`,
          email: entryForm.getValues('email'),
        });
        if (getSessionId.id) {
          await stripe!.redirectToCheckout({
            sessionId: getSessionId.id,
          });
        }
      }
    } catch (e) {
      showAlert({
        title: message.error_500,
        type: 'fail',
        rootTranslationKey: TRANSLATION_KEY.API_MESSAGE,
        translationKey: TRANSLATION_KEY.ERROR_500,
      });
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const childBirthDay =
    useWatch({
      control: entryForm.control,
      name: 'child_birthday',
    }) || entryForm.getValues('child_birthday');

  const entryYear =
    useWatch({
      control: entryForm.control,
      name: 'entry_year',
    }) || entryForm.getValues('entry_year');

  const entryMonth =
    useWatch({
      control: entryForm.control,
      name: 'entry_month',
    }) || entryForm.getValues('entry_month');

  useEffect(() => {
    hideAlert();
    if (entryYear && entryMonth) {
      setIsValidEntryClass(true);
      // Validate entry year and month
      const currentYear = moment().year();
      const currentMonth = moment().month() + 1;

      const year = parseInt(entryYear);
      const month = parseInt(entryMonth);

      let errorCondition = false;
      if (currentMonth < 4) {
        // 現在が1-3月の場合、入園希望年度が現在年-1と等しい、かつ入園希望月が現在の月と等しい場合エラー
        errorCondition = year === currentYear - 1 && month === currentMonth;
      } else {
        // 現在が4月以降の場合、入園希望年度が現在年と等しい、かつ入園希望月が現在の月と等しい場合エラー
        errorCondition = year === currentYear && month === currentMonth;
      }

      if (errorCondition) {
        entryForm.setError('entry_date', {
          type: 'custom',
          message: 'entry_date_invalid',
        });
        setIsValidEntryClass(false);
        return;
      } else {
        entryForm.clearErrors('entry_date');
        setIsValidEntryClass(true);
      }

      if (childBirthDay) {
        entryForm.clearErrors('entry_class');
        const childBirthDate = moment(childBirthDay, 'YYYY-MM-DD');
        let academicYearStart;
        // 学年開始年月日を計算 (学年開始年月日＝入園希望年月から遡って一番近い4/2)
        if (month >= 4) {
          academicYearStart = moment(`${entryYear}-04-02`, 'YYYY-MM-DD');
        } else {
          academicYearStart = moment(
            `${entryYear}-04-02`,
            'YYYY-MM-DD',
          ).add(1, 'years');
        }

        const diffYear = academicYearStart.diff(childBirthDate, 'years');
        childBirthDate.add(diffYear, 'years');
        const diffMonth = academicYearStart.diff(childBirthDate, 'months');
        childBirthDate.subtract(diffYear, 'years');

        // 学年開始年月日時点で2歳の場合
        if (diffYear >= 2) {
          // < 2year6month
          if (diffYear * 12 + diffMonth < 2 * 12 + 6) {
            entryForm.setValue('entry_class', '3'); // 入園希望月が4月ならば”ふたば”
          } else {
            entryForm.setValue('entry_class', '99'); // それ以外ならば”その他”
          }
        }
        // 学年開始年月日時点で2歳未満の場合
        else if (diffYear < 2) {
          // Calculate child age
          const academicYearDate = moment(
            `${entryYear}-${entryMonth}-02`,
            'YYYY-MM-DD',
          );

          const childAgeYear = academicYearDate.diff(childBirthDate, 'years');
          childBirthDate.add(childAgeYear, 'years');
          const childAgeMonth = academicYearDate.diff(childBirthDate, 'months');
          childBirthDate.subtract(childAgeYear, 'years');

          if (childAgeYear * 12 + childAgeMonth >= 1 * 12 + 6) {
            entryForm.setValue('entry_class', '2'); // 入園希望年月の1日時点で1歳6ヶ月を超えている場合”めばえ”
          } else {
            // そうでない場合はエラーメッセージ”入園希望月時点で1歳6ヶ月を超えている必要があります”を表示
            showAlert({
              title: 'エラー',
              type: 'fail',
              rootTranslationKey: 'FormValidation',
              translationKey: 'entry_class_invalid',
            });
            entryForm.setError('entry_class', {
              type: 'custom',
              message: 'entry_class_invalid',
            });
            entryForm.setValue('entry_class', '');
            setIsValidEntryClass(false);
          }
        } else {
          entryForm.setValue('entry_class', '');
        }
      }
    }
  }, [childBirthDay, entryForm, entryMonth, entryYear, hideAlert, showAlert]);

  return (
    <div className={clsx('container', notoSerifJP.className)}>
      <div className="pt-3">
        {currentStep < 3 && (
          <h2 className="text-secondary">
            <Translation
              translationKey="Pages.entries"
              render={(t) => <>{t('title')}</>}
            />
          </h2>
        )}
        {currentStep === 3 && <h2 className="text-secondary">課題提出</h2>}
        <StepBar
          width={3}
          current={currentStep}
          steps={entrySteps}
          render={(step) => (
            <Translation
              translationKey={'Pages.entries.steps'}
              render={(t) => <>{t(step)}</>}
            />
          )}
        />
        {currentStep === 1 && (
          <div className="card">
            <div className="card-body">
              <div>
                <span className="text-secondary">
                  <Translation
                    translationKey="Pages.entries"
                    render={(t) => <>{t('description')}</>}
                  />
                </span>
              </div>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className="card mt-3">
            <div className="card-body">
              <FormEntry
                entryForm={entryForm}
                onSubmit={onSubmit}
                isValidEntryClass={isValidEntryClass}
              />
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <div className="card">
              <div className="card-body">
                <FormConfirm data={entryForm.getValues()} />
              </div>
            </div>
            <ConfirmFeeCard />
            <ConfirmActions
              isCheckoutLoading={isCheckoutLoading}
              decrementStep={decrementStep}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Entries;
