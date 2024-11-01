import { Translation } from '@/components';
import { DynamicForm } from '@/components/form/dynamic';
import { TTourRegistRequest } from '@/schemas';
import React, { FC } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

type EntryStepProps = {
  configFormValues: any;
  form: UseFormReturn<TTourRegistRequest, any>;
  onConfirm: SubmitHandler<TTourRegistRequest>;
  onResetForm: () => void;
}

const EntryStep: FC<EntryStepProps> = ({ configFormValues, form, onConfirm, onResetForm }) => {
  return (
    <div>
      <DynamicForm
        configFormValues={configFormValues}
        form={form}
        onSubmit={onConfirm}
        formAction={(<>
          <div className="text-center pt-4">
            <button className="btn btn-danger me-4" type='button' onClick={onResetForm}>
              <Translation
                translationKey='ButtonTitle'
                render={t => <>{t('reset_form_btn')}</>}
              />
            </button>
            <button className="btn btn-success" type='submit'>
              <Translation
                translationKey='ButtonTitle'
                render={t => <>{t('go_to_confirmation_screen_btn')}</>}
              />
            </button>
          </div>
        </>)}
      />
    </div>
  )
}

export default EntryStep;
