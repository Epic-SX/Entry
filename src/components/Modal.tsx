import React, { FC } from "react";

type Props = {
  title: string | React.ReactNode;
  show: boolean;
  content?: string | React.ReactNode;
  cancelLabel?: string | React.ReactNode;
  confirmLabel?: string | React.ReactNode;
  disableCancel?: boolean;
  disableConfirm?: boolean;
  onConfirm: (data?: any) => void;
  onCancel: (data?: any) => void;
};

const Modal: FC<Props> = ({
  title,
  show = false,
  cancelLabel,
  content,
  confirmLabel,
  disableCancel = false,
  disableConfirm = false,
  onConfirm,
  onCancel,
}) => {
  if (!show) {
    return null;
  } else {
    return (
      <>
        <div className="modal d-block modal-custom">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={onCancel}
                ></button>
              </div>
              <div className="modal-body">{content}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger pt-1 pb-1"
                  disabled={disableCancel}
                  onClick={onCancel}
                >
                  {cancelLabel ?? "キャンセル"}
                </button>
                <button
                  type="button"
                  className="btn btn-success ms-4 pt-1 pb-1"
                  disabled={disableConfirm}
                  onClick={onConfirm}
                >
                  {confirmLabel ?? "確認"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Modal;
