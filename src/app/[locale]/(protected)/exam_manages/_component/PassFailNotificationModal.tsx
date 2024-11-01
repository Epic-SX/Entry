'use client';
import { Modal } from '@/components';
import { config } from '@/constants';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type PassFailSchema = {
    value: string
}

type Props = {
    show: boolean;
    onConfirm: (status: string) => void;
    onCancel: () => void;
    defaultValues?: string;
}

const passFailOptions = Object.entries(config.result_division);

const PassFailNotificationModal: FC<Props> = ({ show, defaultValues, onConfirm, onCancel }) => {

    const form = useForm<PassFailSchema>();

    useEffect(() => {
        form.setValue('value', defaultValues ?? '');
    }, [defaultValues, form]);

    const handleConfirm = () => {
        onConfirm(form.getValues('value'));
    };

    return (
        <Modal
            title="合否登録・通知"
            content={(
                <div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <span>合否</span>
                        </div>
                        <div className="col-md-8">
                            <select className="form-select" {...form.register('value')}>
                                {passFailOptions.map(([k, v]) => (
                                    <option key={k} value={k}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="p-2 mt-4 border-top">
                        <small className="text-danger">
                            ※「未判定」以外を設定して「登録・通知」ボタンをクリックすると情
                        </small><br />
                        <small className="text-danger">
                            報を更新するとともに保護者の方へメール連絡が自動で送られます。
                        </small>
                    </div>
                </div>
            )}
            cancelLabel="キャンセル"
            confirmLabel="登録・通知"
            show={show}
            onConfirm={handleConfirm}
            onCancel={onCancel}
        />
    )
}

export default PassFailNotificationModal;