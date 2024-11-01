import { Modal } from '@/components';
import React, { FC } from 'react';

type Props = {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const SendVacancyMailModal: FC<Props> = ({ show, onConfirm, onCancel }) => {
    return (
        <Modal
            title="空席連絡メール送信"
            content={(
                <div>
                    <span>空席ができたことをお知らせするメールを一括送信します。</span> <br />
                    <span>よろしいですか？</span>
                </div>
            )}
            cancelLabel="キャンセル"
            show={show}
            confirmLabel="送信"
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    )
}

export default SendVacancyMailModal;