import { Translation } from '@/components';
import { ConfirmForm } from '@/components/form/dynamic'
import React, { FC } from 'react'
import { UseFormReturn } from 'react-hook-form';
type ConfirmStepProps = {
  configFormValues: any;
  form: UseFormReturn<any, any, undefined>;
  disabled?: boolean;
  onDecrementStep: () => void;
  onRegister: () => void;
}
const ConfirmStep: FC<ConfirmStepProps> = ({ configFormValues, form,disabled, onDecrementStep, onRegister }) => {
  return (
    <ConfirmForm
      configFormValues={configFormValues}
      form={form}
      actions={(<>
        <div className="text-center">
          <button className="btn btn-danger me-4" onClick={onDecrementStep} disabled={disabled}>
            <Translation
              translationKey='ButtonTitle'
              render={t => <>{t('returns_to_the_input_screen_btn')}</>}
            />
          </button>
          <button className="btn btn-success" onClick={onRegister} disabled={disabled}>
            <Translation
              translationKey='ButtonTitle'
              render={t => <>{t('regist_completed_btn')}</>}
            />
          </button>
        </div>
      </>)}
    />
  )
}

export default ConfirmStep