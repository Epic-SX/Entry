import { Modal } from "@/components";
import React, { FC } from "react";

type Props = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const UpdateNoProspectStatusModal: FC<Props> = ({
  show,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title="入園見込みなし変更"
      content={
        <div>
          <span>入園見込みなしに変更します。よろしいですか？</span>
        </div>
      }
      cancelLabel="キャンセル"
      confirmLabel="変更"
      show={show}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default UpdateNoProspectStatusModal;
