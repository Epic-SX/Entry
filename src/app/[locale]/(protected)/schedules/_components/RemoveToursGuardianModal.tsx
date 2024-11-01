import { Modal } from '@/components';
import React, { FC } from 'react';
type Props = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
const RemoveToursGuardianModal: FC<Props> = ({ show, onConfirm, onCancel }) => {
  return (
    <Modal
      title="見学会参加者削除"
      show={show}
      content={
        <div className="text-secondary">
          参加者を削除します。よろしいですか？
        </div>
      }
      cancelLabel="キャンセル"
      confirmLabel="削除"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default RemoveToursGuardianModal;
