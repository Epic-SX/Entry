import { Translation } from "@/components";
import { config } from "@/constants";
import { FC } from "react";

const ConfirmFeeCard: FC = () => {
    return (
        <div className="card">
            <div className="card-header">
                <span>
                    <Translation
                        translationKey="Pages.common"
                        render={t => <>{t('examination_fee')}</>}
                    />
                </span>
            </div>
            <div className="card-body">
                <div>
                    <div>
                        <span>
                            <Translation
                                translationKey="Pages.common"
                                render={t => <>{t('the_payment_amount_is', { amount: config.exam_price })}</>}
                            />
                        </span>
                    </div>
                    <div>
                        <span>
                            <Translation
                                translationKey="Pages.common"
                                render={t => <>{t('credit_card_on_the_next_screen')}</>}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmFeeCard;