'use client';

import { TLoginRequest, TTourRegistRequest, TourRegistSchema } from '@/schemas';
import { tourService } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RegistedModal from './_component/RegistedModal';
import { useGetScheduleOptions } from '@/hooks';
import { Translation, WindowReloadConfirm } from '@/components';
import { StepBar } from '@/components/form/dynamic';
import { CompletedStep, ConfirmStep, EntryStep } from './_component/step';
import InitActions from './_component/InitActions';
import { MAX_STEP, MIN_STEP, steps, tourFormConfigs } from './config';
import { useAlertStore } from '@/stores';
import { useLocale, useTranslations } from 'next-intl';
import { public_routes } from '@/routes';
import { AxiosError } from 'axios';
import { TRANSLATION_KEY } from '@/constants';
import { useRouter } from '@/navigation';

const tourFull = 'tour_full';

const ToursRegist: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { scheduleOptions } = useGetScheduleOptions();
  const [configFormValues, setConfigFormValues] = useState<any>(Object.values(tourFormConfigs));
  const { showAlert, hideAlert } = useAlertStore();
  const t = useTranslations("FormTitle");
  const [guardianId, setGuardianId] = useState<number | null>(null);
  const router = useRouter();
  const locale = useLocale();
 
  useEffect(() => {
    if (scheduleOptions && scheduleOptions.data) {
      const scheduleOptionsData = scheduleOptions.data.map(({label,value}) => {
        if (label.endsWith(tourFull)) {
          return { value, label: label.replace(tourFull, t('tour_full')) }
        } else {
          return { value, label }
        }
      });
      const newConfigFormValues = { ...tourFormConfigs };
      newConfigFormValues['tour_id']['options'] = scheduleOptionsData;
      setConfigFormValues(Object.values(newConfigFormValues));
    }
  }, [scheduleOptions, t]);

  const registTour = useMutation({
    mutationKey: ['tours', 'regist'],
    mutationFn: (data: TTourRegistRequest) => tourService.regist(data),
    onSuccess() {
      resetRegistedForm();
      router.push(public_routes.tours_regist_complete);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.error_message === 'すでにお申込済みの見学会予定があります') {
          showAlert({
            title: '',
            type: 'fail',
            rootTranslationKey: TRANSLATION_KEY.API_STATUS,
            translationKey: TRANSLATION_KEY.API_TOUR_REGIST_DUPLICATE_ERROR
          })
        } else {
          showAlert({
            title: '',
            type: 'fail',
            rootTranslationKey: TRANSLATION_KEY.API_MESSAGE,
            translationKey: TRANSLATION_KEY.ERROR_500
          })
        }
      } else {
        showAlert({
          title: '',
          type: 'fail',
          rootTranslationKey: TRANSLATION_KEY.API_MESSAGE,
          translationKey: TRANSLATION_KEY.ERROR_500
        })
      }
    },
  });
  useEffect(() => {
    if (registTour.isPending) {
      showAlert({
        title: 'お申込み中',
        type: 'info',
      });
    } else if (registTour.isSuccess) {
      hideAlert();
    }
  }, [hideAlert, registTour.isPending, registTour.isSuccess, showAlert]);
  const createDefaultValues = () => {
    return {
      tour_id: '',
      last_guardian_name: '',
      first_guardian_name: '',
      last_guardian_name_kana: '',
      first_guardian_name_kana: '',
      last_child_name: '',
      first_child_name: '',
      last_child_name_kana: '',
      first_child_name_kana: '',
      child_sex: '',
      child_birthday: '',
      zipcode: '',
      prefecture: '',
      address: '',
      building: '',
      tel: '',
      email: '',
      email_check: '',
      password: '',
      being_in: '',
      trigger: '',
      trigger_other: '',
      entry_will: '',
      entry_year: '',
      entry_month: '',
      other_kindy: '',
      choice_reason: '',
      tour_note: '',
    }
  }
  const guardianInfo = useMutation({
    mutationKey: ['tours', 'guardian_info'],
    mutationFn: (data: TLoginRequest) => tourService.getGuardianInfo(data),
    onSuccess(data) {
      if ((data.data as any)?.guardian_id) {
        setGuardianId((data.data as any).guardian_id);
      }
      const oldValues = Object.entries(data.data)
        .map(([key, value]) => {
          if (value === null || value === undefined || value === 'null' || value === 'undefined') {
            return {
              [key]: ''
            }
          } else {
            return {
              [key]: String(value)
            }
          }
        })
        .reduce((prev, curr) => ({ ...prev, ...curr }), { ...createDefaultValues() });
      oldValues.email_check = data.data.email;
      form.reset({ ...oldValues as any });
      setOpenForm(true);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.error_message === '認証できません') {
          showAlert({
            title: '',
            type: 'fail',
            rootTranslationKey: TRANSLATION_KEY.API_STATUS,
            translationKey: TRANSLATION_KEY.API_TOUR_AUTH_ERROR
          })
        } else {
          showAlert({
            title: '',
            type: 'fail',
            rootTranslationKey: TRANSLATION_KEY.API_MESSAGE,
            translationKey: TRANSLATION_KEY.ERROR_500
          })
        }
      } else {
        showAlert({
          title: '',
          type: 'fail',
          rootTranslationKey: TRANSLATION_KEY.API_MESSAGE,
          translationKey: TRANSLATION_KEY.ERROR_500
        })
      }
    },
    onSettled() {
      setOpenModal(false);
    },
  });

  const form = useForm<TTourRegistRequest>({
    mode: 'onBlur',
    resolver: zodResolver(TourRegistSchema),
    defaultValues: createDefaultValues(),
  });
  
  const incrementStep = () => {
    if (currentStep < MAX_STEP) {
      setCurrentStep(currentStep + 1);
    }
  }
  const decrementStep = () => {
    if (currentStep > MIN_STEP) {
      setCurrentStep(currentStep - 1);
    }
  }

  const onConfirm: SubmitHandler<TTourRegistRequest> = () => {
    incrementStep();
  }

  const handleOpenForm = () => {
    setOpenForm(true);
    form.reset(createDefaultValues());
  }
  const handleOpenModal = () => {
    setGuardianId(null);
    setOpenModal(true);
    setOpenForm(false);
  }
  const handleInfoUpdate = (data: TLoginRequest) => {
    guardianInfo.mutate(data);
  }
  const handleResetForm = () => {
    form.reset();
    Object.entries(form.getValues()).forEach(([key]) => {
      form.setValue(key as keyof TTourRegistRequest, '');
    })
  }
  const handleRegister = () => {
    const data = guardianId
      ? { ...form.getValues(), guardian_id: guardianId ,locale:locale}
      : {...form.getValues(),locale:locale};
    registTour.mutate(data);
  }
  const handleBackAfterCompleted = () => {
    setCurrentStep(1);
    resetRegistedForm();
  }

  const resetRegistedForm = () => {
    form.reset(createDefaultValues());
    setGuardianId(null);
  }
  return (
    <div className="container">
      <WindowReloadConfirm />
      <RegistedModal
        show={openModal}
        onConfirm={handleInfoUpdate}
        onCancel={() => setOpenModal(false)}
      />
      <h2 className="text-secondary">
        <Translation
          translationKey='PageTitle'
          render={t => (<>{t('tours_regist')}</>)}
        />
      </h2>
      {
        openForm && (
          <StepBar
            current={currentStep}
            steps={steps}
            render={step => <Translation translationKey={`Pages.tours.steps`} render={t => <>{t(step)}</>} />}
          />
        )
      }
      {currentStep === 1 && (<InitActions onOpenForm={handleOpenForm} onOpenModal={handleOpenModal} />)}
      {openForm && (
        <div className="card">
          <div className="card-body">
            {(currentStep === 1)
              &&
              (<EntryStep
                configFormValues={configFormValues}
                form={form}
                onConfirm={onConfirm}
                onResetForm={handleResetForm}
              />)}

            {
              currentStep === 2
              && (
                <ConfirmStep
                  configFormValues={configFormValues}
                  form={form}
                  onDecrementStep={decrementStep}
                  disabled={registTour.isPending}
                  onRegister={handleRegister}
                />)
            }
            {
              currentStep === 3 && (<CompletedStep onBack={handleBackAfterCompleted} />)
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default ToursRegist;