import { Modal } from '@/components';
import React, { FC } from 'react';

type Props = {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteModal: FC<Props> = ({ show, onConfirm, onCancel }) => {
    return (
        <Modal
            title="考査データ削除"
            content={(
                <div>
                    <span>選択した考査情報を削除します。よろしいですか？</span>
                </div>
            )}
            cancelLabel="キャンセル"
            confirmLabel="削除"
            show={show}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    )
}

export default DeleteModal;