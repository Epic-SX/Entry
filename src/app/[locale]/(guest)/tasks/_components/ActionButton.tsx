import { FC } from "react";

type ActionButtonProps = {
    onBack: (e?: any) => void;
    onConfirm: (e?: any) => void;
    disabled?: boolean;
    backLabel: string | React.ReactNode;
    confirmLabel: string | React.ReactNode;
}
const ActionButton: FC<ActionButtonProps> = ({ backLabel, confirmLabel,disabled, onBack, onConfirm }) => {
    return (
        <>
            <button
                className="btn btn-danger me-3"
                onClick={onBack}
                disabled={disabled}
            >
                {backLabel}
            </button>
            <button
                type='button'
                className="btn btn-success"
                onClick={onConfirm}
                disabled={disabled}
            >
                {confirmLabel}
            </button>
        </>
    );
}

export default ActionButton;