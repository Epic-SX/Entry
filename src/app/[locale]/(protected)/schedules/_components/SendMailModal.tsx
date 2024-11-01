'use client';

import { Modal } from '@/components';
import { SendMailSchema, TSendMailRequest } from '@/schemas';
import { TSendMail } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form';

type SendMailContentProps = {
  guardian_name: string;
  form: ReturnType<typeof useForm<TSendMailRequest>>;
}

const SendMailContent: FC<SendMailContentProps> = ({ guardian_name, form }) => {
  return (
    <div>
      <p>
        <strong className="me-2">{guardian_name}</strong>
        <span>様</span>
        <span>に考査お申込みURLをメールで送信します。</span>
      </p>
      <p>よろしいですか？</p>
      <p>メールアドレス：</p>
      <div>
        <input className="form-control" {...form.register('mail')} type="email" />
        <p className="text-danger">{form.formState.errors.mail?.message}</p>
      </div>
    </div>
  );
}

type Props = {
  show: boolean;
  sendMailTarget: TSendMail & { guardian_name: string };
  onConfirm: (mail: string) => void;
  onCancel: () => void;
}

const SendMailModal: FC<Props> = ({ show, sendMailTarget, onConfirm, onCancel }) => {
  const form = useForm<TSendMailRequest>({
    mode: 'onBlur',
    resolver: zodResolver(SendMailSchema),
    defaultValues: {
      mail: sendMailTarget.guardian_email
    }
  })

  useEffect(() => {
    if (sendMailTarget.guardian_email) {
      form.setValue('mail', sendMailTarget.guardian_email);
    }
  }, [form, sendMailTarget.guardian_email]);

  const handleCancelModal = () => {
    form.reset({
      mail: sendMailTarget.guardian_email
    });
    onCancel();
  }
  return (
    <Modal
      title='考査お申込みURLメール送信'
      show={show}
      content={<SendMailContent guardian_name={sendMailTarget.guardian_name} form={form} />}
      disableConfirm={!!form.formState.errors.mail?.message}
      cancelLabel='キャンセル'
      confirmLabel='メール送信'
      onConfirm={() => onConfirm(form.getValues('mail'))}
      onCancel={handleCancelModal}
    />
  )
}

export default SendMailModal;