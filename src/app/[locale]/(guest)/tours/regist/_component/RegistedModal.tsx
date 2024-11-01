import { DownLineList, Modal, Translation } from '@/components';
import { ErrorMessage } from '@/components/form';
import {TLoginRequest, useLoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

type RegistedModalContentProps = {
    form: UseFormReturn<{
        email: string;
        password: string;
    }, any, undefined>
}
const RegistedModalContent: FC<RegistedModalContentProps> = ({ form }) => {
    return (
        <div>
            <div>
                <Translation
                    translationKey='Pages.tours'
                    render={t => (
                        <DownLineList
                            line={t('regist_modal_description')}
                            render={s => (
                                <div>
                                    <small className="text-secondary">
                                        {s}
                                    </small>
                                </div>
                            )} />
                    )}
                />
            </div>
            <div className="mt-3">
                <form className="">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <label className="text-nowrap" htmlFor="email">
                                <small>
                                    <Translation translationKey='LoginForm' render={t => <>{t("email")}</>} />
                                </small>
                                <small className="badge bg-danger small ms-2">
                                    <Translation translationKey='FormValidation' render={t => <>{t("required_title")}</>} />
                                </small>
                            </label>
                        </div>
                        <div className="col-md-7">
                            <input id="email" type="email" className="form-control" {...form.register('email')} />
                            <ErrorMessage errorMessage={form.formState.errors.email?.message} />
                        </div>
                    </div>
                    <div className="row mt-4 align-items-center">
                        <div className="col-md-5">
                            <label className="text-nowrap" htmlFor="password">
                                <small>
                                    <Translation translationKey='LoginForm' render={t => <>{t("password")}</>} />
                                </small>
                                <small className="badge bg-danger small ms-2">
                                    <Translation translationKey='FormValidation' render={t => <>{t("required_title")}</>} />
                                </small>
                            </label>
                        </div>
                        <div className="col-md-7">
                            <input id="password" type="password" className="form-control" {...form.register('password')} />
                            <ErrorMessage errorMessage={form.formState.errors.password?.message} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

type RegistedModalProps = {
    show: boolean;
    onConfirm: (data: TLoginRequest) => void;
    onCancel: () => void;
}

const RegistedModal: FC<RegistedModalProps> = ({ show, onConfirm, onCancel }) => {
    const {schema:LoginSchema,loginType} = useLoginSchema();
    const form = useForm<typeof loginType>({
        mode: "onBlur",
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleConfirm = (data: TLoginRequest) => {
        onConfirm(data);
    }
    return (
        <Modal
            title={(<Translation translationKey='Pages.tours' render={t => <>{t('regist_modal_title')}</>} />)}
            show={show}
            confirmLabel={(<Translation translationKey='ButtonTitle' render={t => <>{t('send_mail_btn')}</>} />)}
            cancelLabel={(<Translation translationKey='ButtonTitle' render={t => <>{t('cancel_btn')}</>} />)}
            content={<RegistedModalContent form={form} />}
            onCancel={onCancel}
            disableConfirm={!form.formState.isValid}
            onConfirm={() => handleConfirm(form.getValues())}
        />
    )
}

export default RegistedModal;