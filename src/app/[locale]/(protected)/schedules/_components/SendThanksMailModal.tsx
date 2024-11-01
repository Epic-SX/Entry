import { Modal } from '@/components';
import React, { FC } from 'react';

type Props = {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const SendThanksMailModal: FC<Props> = ({ show, onConfirm, onCancel }) => {
    return (
        <Modal
            title="お礼メール送信"
            content={(
                <div>
                    <span>お礼メールを一括送信します。</span> <br />
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

export default SendThanksMailModal;