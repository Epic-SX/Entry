'use client';
import { TranslationErrorMessage } from '@/components/form/dynamic';
import FormLabel from '@/components/form/FormLabel';
import Input from '@/components/form/Input';
import Radio from '@/components/form/Radio';
import Select from '@/components/form/Select';
import Checkbox from '@/components/form/CheckBox';
import Translation from '@/components/Translation';
import { EN_LOCALE, JP_LOCALE } from '@/constants';
import {
  beingInOptinons,
  entryClassOptions,
  entryClassOptionsMap,
  monthOptions,
  prefectureOptions,
  sexOptions,
} from '@/constants/options';
import { useLocale } from 'next-intl';
import { FC } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import EntryFeeCard from './EntryFeeCard';
import EntryAgreementCard from './EntryAgreementCard';
import { additionalFormValues, pdf_url } from '../config';
import EntryActions from './EntryActions';
import { getEntrySchema } from '@/schemas';
import { z } from 'zod';

type EntryFormFields = z.infer<ReturnType<typeof getEntrySchema>>;
type Props = {
  entryForm: UseFormReturn<EntryFormFields, any, undefined>;
  isValidEntryClass: boolean;
  onSubmit: (data: any) => void;
};

const FormEntry: FC<Props> = ({
  entryForm,
  isValidEntryClass = true,
  onSubmit,
}) => {
  const locale = useLocale();

  const entryClass =
    useWatch({
      control: entryForm.control,
      name: 'entry_class',
    }) || entryForm.getValues('entry_class');

  const getFieldError = (
    fieldName: keyof EntryFormFields,
  ): string | undefined =>
    fieldName in entryForm.formState.errors
      ? (entryForm.formState.errors[fieldName]?.message as string)
      : undefined;

  const isEntryClassInvalid =
    !!entryForm.formState.errors.entry_year?.message ||
    !!entryForm.formState.errors.entry_month?.message;

    

  return (
    <div>
      <form onSubmit={entryForm.handleSubmit(onSubmit as any)}>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="last_guardian_name" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('guardian_name')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <div className="input-group">
                  <FormLabel
                    className="input-group-text"
                    htmlFor="last_guardian_name"
                  >
                    <Translation
                      translationKey="FormTitle"
                      render={(t) => <>{t('last_name')}</>}
                    />
                  </FormLabel>
                  <Input
                    id="last_guardian_name"
                    {...entryForm.register('last_guardian_name')}
                  />
                </div>
                <TranslationErrorMessage
                  errorKey={
                    entryForm.formState.errors.last_guardian_name?.message
                  }
                />
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <FormLabel
                    className="input-group-text"
                    htmlFor="first_guardian_name"
                  >
                    <Translation
                      translationKey="FormTitle"
                      render={(t) => <>{t('first_name')}</>}
                    />
                  </FormLabel>
                  <Input
                    id="first_guardian_name"
                    {...entryForm.register('first_guardian_name')}
                  />
                </div>
                <TranslationErrorMessage
                  errorKey={
                    entryForm.formState.errors.first_guardian_name?.message
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="last_guardian_name_kana" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('guardian_name_kana')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <div className="input-group">
                  <FormLabel
                    className="input-group-text"
                    htmlFor="last_guardian_name_kana"
                  >
                    <Translation
                      translationKey="FormTitle"
                      render={(t) => <>{t('last_name')}</>}
                    />
                  </FormLabel>
                  <Input
                    id="last_guardian_name_kana"
                    {...entryForm.register('last_guardian_name_kana')}
                  />
                </div>
                <TranslationErrorMessage
                  errorKey={
                    entryForm.formState.errors.last_guardian_name_kana?.message
                  }
                />
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <FormLabel
                    className="input-group-text"
                    htmlFor="first_guardian_name_kana"
                  >
                    <Translation
                      translationKey="FormTitle"
                      render={(t) => <>{t('first_name')}</>}
                    />
                  </FormLabel>
                  <Input
                    id="first_guardian_name_kana"
                    {...entryForm.register('first_guardian_name_kana')}
                  />
                </div>
                <TranslationErrorMessage
                  errorKey={
                    entryForm.formState.errors.first_guardian_name_kana?.message
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="last_child_name" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('child_name')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <div className="input-group">
                  <FormLabel
                    className="input-group-text"
                    htmlFor="last_child_name"
                  >
                    <Translation
                      translationKey="FormTitle"
                      render={(t) => <>{t('last_name')}</>}
                    />
                  </FormLabel>
                  <Input
                    id="last_child_name"
                    {...entryForm.register('last_child_name')}
                  />
                </div>
                <TranslationErrorMessage
                  errorKey={entryForm.formState.errors.last_child_name?.message}
                />
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <FormLabel
                    className="input-group-text"
                    htmlFor="first_child_name"
                  >
                    <Translation
                      translationKey="FormTitle"
                      render={(t) => <>{t('first_name')}</>}
                    />
                  </FormLabel>
                  <Input
                    id="first_child_name"
                    {...entryForm.register('first_child_name')}
                  />
                </div>
                <TranslationErrorMessage
                  errorKey={
                    entryForm.formState.errors.first_child_name?.message
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="last_child_name_kana" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('child_name_kana')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <div className="input-group">
                  <FormLabel
                    className="input-group-text"
                    htmlFor="last_child_name_kana"
                  >
                    <Translation
                      translationKey="FormTitle"
                      render={(t) => <>{t('last_name')}</>}
                    />
                  </FormLabel>
                  <Input
                    id="last_child_name_kana"
                    {...entryForm.register('last_child_name_kana')}
                  />
                </div>
                <TranslationErrorMessage
                  errorKey={
                    entryForm.formState.errors.last_child_name_kana?.message
                  }
                />
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <FormLabel
                    className="input-group-text"
                    htmlFor="first_child_name_kana"
                  >
                    <Translation
                      translationKey="FormTitle"
                      render={(t) => <>{t('first_name')}</>}
                    />
                  </FormLabel>
                  <Input
                    id="first_child_name_kana"
                    {...entryForm.register('first_child_name_kana')}
                  />
                </div>
                <TranslationErrorMessage
                  errorKey={
                    entryForm.formState.errors.first_child_name_kana?.message
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {locale === JP_LOCALE && (
          <div className="row mb-2 align-items-center">
            <div className="col-md-3">
              <FormLabel htmlFor="last_child_name_alp" className="fw-bold">
                <Translation
                  translationKey="FormTitle"
                  render={(t) => <>{t('child_name_alp')}</>}
                />
              </FormLabel>
              <span className="badge bg-danger ms-2">
                <Translation
                  translationKey="FormValidation"
                  render={(t) => <>{t('required_title')}</>}
                />
              </span>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <div className="input-group">
                    <FormLabel
                      className="input-group-text"
                      htmlFor="last_child_name_alp"
                    >
                      <Translation
                        translationKey="FormTitle"
                        render={(t) => <>{t('last_name')}</>}
                      />
                    </FormLabel>
                    <Input
                      id="last_child_name_alp"
                      {...entryForm.register('last_child_name_alp' as any)}
                    />
                  </div>
                  <TranslationErrorMessage
                    errorKey={getFieldError('last_child_name_alp' as any)}
                  />
                </div>
                <div className="col-md-4">
                  <div className="input-group">
                    <FormLabel
                      className="input-group-text"
                      htmlFor="first_child_name_alp"
                    >
                      <Translation
                        translationKey="FormTitle"
                        render={(t) => <>{t('first_name')}</>}
                      />
                    </FormLabel>
                    <Input
                      id="first_child_name_alp"
                      {...entryForm.register('first_child_name_alp' as any)}
                    />
                  </div>
                  <TranslationErrorMessage
                    errorKey={getFieldError('first_child_name_alp' as any)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('child_sex')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-9">
            <div className="form-check">
              {sexOptions.map(({ value }) => (
                <div className="form-check me-2" key={value}>
                  <Radio value={value} {...entryForm.register('child_sex')} />
                  <FormLabel className="form-check-label">
                    <Translation
                      translationKey={'GenderOptions'}
                      render={(t) => t(value)}
                    />
                  </FormLabel>
                </div>
              ))}
            </div>
            <TranslationErrorMessage errorKey={getFieldError('child_sex')} />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="child_birthday" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('child_birthday')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-3">
            <Input
              id="child_birthday"
              type="date"
              {...entryForm.register('child_birthday')}
            />
            <TranslationErrorMessage
              errorKey={getFieldError('child_birthday')}
            />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="zipcode" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('zipcode')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-3">
            <div className="input-group">
              <FormLabel className="input-group-text" htmlFor="zipcode">
                〒
              </FormLabel>
              <Input id="zipcode" {...entryForm.register('zipcode')} />
            </div>
            <TranslationErrorMessage errorKey={getFieldError('zipcode')} />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="prefecture" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('prefecture')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-3">
            <Select
              id="prefecture"
              options={prefectureOptions}
              labelFormater={({ value }) => (
                <Translation
                  translationKey="PrefectureOptions"
                  render={(t) => t(value)}
                />
              )}
              {...entryForm.register('prefecture')}
            />
            <TranslationErrorMessage errorKey={getFieldError('prefecture')} />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="address" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('address')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-5">
            <Input id="address" {...entryForm.register('address')} />
            <TranslationErrorMessage errorKey={getFieldError('address')} />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="building" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('building')}</>}
              />
            </FormLabel>
          </div>
          <div className="col-md-3">
            <Input id="building" {...entryForm.register('building')} />
            <TranslationErrorMessage errorKey={getFieldError('building')} />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="tel" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('tel')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-3">
            <Input id="tel" {...entryForm.register('tel')} />
            <TranslationErrorMessage errorKey={getFieldError('tel')} />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="email" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('email')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-3">
            <Input id="email" {...entryForm.register('email')} />
            <TranslationErrorMessage errorKey={getFieldError('email')} />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="email_check" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('email_check')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-3">
            <Input id="email_check" {...entryForm.register('email_check')} />
            <TranslationErrorMessage errorKey={getFieldError('email_check')} />
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col-md-3">
            <FormLabel className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('being_in')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-9">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="form-check">
                  {beingInOptinons.map(({ value }) => (
                    <div className="form-check me-2" key={value}>
                      <Radio
                        value={value}
                        {...entryForm.register('being_in')}
                      />
                      <FormLabel className="form-check-label">
                        <Translation
                          translationKey={'BeingInOptinons'}
                          render={(t) => t(value)}
                        />
                      </FormLabel>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-7">
                <small className="text-secondary">
                  <Translation
                    translationKey={'FormTitle'}
                    render={(t) => t('being_in_note')}
                  />
                </small>
              </div>
            </div>
            <TranslationErrorMessage errorKey={getFieldError('being_in')} />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="entry_year" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('entry_year')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <FormLabel className="input-group-text" htmlFor="entry_year">
                <Translation
                  translationKey="FormTitle"
                  render={(t) => <>{t('entry_year_before_text')}</>}
                />
              </FormLabel>
              <Input
                id="entry_year"
                type="number"
                {...entryForm.register('entry_year')}
                placeholder="ex.) 2025"
              />
              <FormLabel className="input-group-text" htmlFor="entry_year">
                <Translation
                  translationKey="FormTitle"
                  render={(t) => <>{t('entry_year_after_text')}</>}
                />
              </FormLabel>
            </div>
            <TranslationErrorMessage errorKey={getFieldError('entry_year')} />
          </div>
          <div className="col-md-5">
            <small className="text-secondary">
              <Translation
                translationKey={'FormTitle'}
                render={(t) => t('entry_year_note')}
              />
            </small>
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="entry_month" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('entry_month')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-3">
            <Select
              id="entry_month"
              options={monthOptions}
              labelFormater={({ value }) => (
                <Translation
                  translationKey="MonthOptions"
                  render={(t) => t(value)}
                />
              )}
              {...entryForm.register('entry_month')}
            />
            <TranslationErrorMessage errorKey={getFieldError('entry_month')} />
            <TranslationErrorMessage errorKey={getFieldError('entry_date')} />
          </div>
        </div>
        <div className="row mb-2 align-items-center">
          <div className="col-md-3">
            <FormLabel htmlFor="entry_class" className="fw-bold">
              <Translation
                translationKey="FormTitle"
                render={(t) => <>{t('entry_class')}</>}
              />
            </FormLabel>
            <span className="badge bg-danger ms-2">
              <Translation
                translationKey="FormValidation"
                render={(t) => <>{t('required_title')}</>}
              />
            </span>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <Select
                  id="entry_class"
                  options={entryClassOptions}
                  labelFormater={({ value }) => (
                    <Translation
                      translationKey="EntryClassOptions"
                      render={(t) => t(value)}
                    />
                  )}
                  {...entryForm.register('entry_class')}
                  disabled={isEntryClassInvalid || !isValidEntryClass}
                />
                <TranslationErrorMessage
                  errorKey={getFieldError('entry_class')}
                />
              </div>
              {!!entryClass &&
                !!entryClassOptionsMap[entryClass] &&
                !!entryClassOptionsMap[entryClass].length && (
                  <div className="col-md-4">
                    <Select
                      options={entryClassOptionsMap[entryClass]}
                      labelFormater={({ value }) => (
                        <Translation
                          translationKey="EntryClassOptionsMap"
                          render={(t) => t(value)}
                        />
                      )}
                      {...entryForm.register('entry_class_sub')}
                      disabled={isEntryClassInvalid || !isValidEntryClass}
                    />
                    <TranslationErrorMessage
                      errorKey={getFieldError('entry_class_sub')}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
        {locale === EN_LOCALE && (
          <div className="row mb-2 align-items-center">
            <div className="col-md-3">
              <FormLabel htmlFor="english_exam" className="fw-bold">
                <Translation
                  translationKey="FormTitle"
                  render={(t) => <>{t('english_exam')}</>}
                />
              </FormLabel>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-check">
                    <Checkbox
                      id="entry_class"
                      {...entryForm.register('english_exam')}
                    />
                    <label className="form-check-label" htmlFor="exam_checkbox">
                      <Translation
                        translationKey="FormTitle"
                        render={(t) => t('exam_checkbox')}
                      />
                    </label>
                  </div>
                  <TranslationErrorMessage
                    errorKey={getFieldError('english_exam')}
                  />
                </div>
                
              </div>
            </div>
          </div>
        )}
        <div className="mt-4">
          <EntryFeeCard />
          <EntryAgreementCard
            form={entryForm}
            additionalFormValues={additionalFormValues}
            pdf_url={pdf_url}
          />
        </div>
        <div>
          <EntryActions />
        </div>
      </form>
    </div>
  );
};
export default FormEntry;
