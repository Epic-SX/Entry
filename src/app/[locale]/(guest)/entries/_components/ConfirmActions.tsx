import { LoadingButton, Translation } from "@/components";
import { FC } from "react";

type ConfirmActionsProps = {
    isCheckoutLoading: boolean;
    decrementStep: () => void;
    onCheckout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

}

const ConfirmActions: FC<ConfirmActionsProps> = ({ isCheckoutLoading, decrementStep, onCheckout }) => {
    return (
        <div className="text-center">
            <button className="btn btn-danger me-3" onClick={decrementStep} disabled={isCheckoutLoading}>
                <Translation translationKey="ButtonTitle" render={t => <>{t('returns_to_the_input_screen_btn')}</>} />
            </button>
            {isCheckoutLoading
                ? (<LoadingButton label={(<Translation translationKey="ApiStatus" render={t => <>{t('processing')}...</>} />)} />)
                : <button className="btn btn-success" onClick={onCheckout}>
                    <Translation translationKey="ButtonTitle" render={t => <>{t('go_to_credit_card_payment_screen_btn')}</>} />
                </button>}

        </div>

    );
}

export default ConfirmActions;