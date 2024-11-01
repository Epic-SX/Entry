import React, { FC, ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import InputRow from './InputRow';
import { Translation } from '@/components';
import { useLocale } from 'next-intl';
import { isHidenNameAlp } from '@/libs';

type DynamicFormProps<T extends FieldValues, C = any> = {
  configFormValues: C;
  form: UseFormReturn<T, any, undefined>;
  onSubmit: (data: any) => void;
  formAdditional?: ReactNode;
  formAction?: ReactNode;
}

const DynamicForm: FC<DynamicFormProps<any>> = <T extends FieldValues>({ configFormValues, form, onSubmit, formAction, formAdditional }: DynamicFormProps<T>) => {
  const locale = useLocale();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {Array.isArray(configFormValues) && configFormValues.map((config: any, index) => {
        if (isHidenNameAlp(config, locale)) {
          return null
        } else {
          return (
            <div className="row mb-2 align-items-center" key={index}>
              <div className="col-md-3">
                <strong>
                  <Translation translationKey='FormTitle' render={t => <>{t(config.name)}</>} />
                </strong>
                {(config['must_flg'] === 1)
                  && (
                    <span className="badge bg-danger ms-2">
                      <Translation translationKey='FormValidation' render={t => <>{t("required_title")}</>} />
                    </span>
                  )}
              </div>
              <div className="col-md-9">
                <InputRow config={config} form={form} />
              </div>
            </div>
          )
        }
      })}
      {!!formAdditional && (<>{formAdditional}</>)}
      <div className="text-center pt-4">
        {formAction}
      </div>
    </form>
  )
}

export default DynamicForm;