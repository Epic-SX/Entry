import { Translation } from "@/components";
import { config } from "@/constants";
import { FC } from "react";

const EntryFeeCard: FC = () => {
    return (
        <div className="card">
            <div className="card-header text-center">
                <span>
                    <Translation translationKey="Pages.common" render={t => <>{t('examination_fee')}</>} />
                </span>
            </div>
            <div className="card-body">
                <div className="text-center p-3">
                    <div>
                        <span>
                            <Translation translationKey="Pages.common" render={t => <>{t('examination_fee')}</>} />
                        </span>
                        <span className="me-2">:</span>
                        <strong>¥{config.exam_price}</strong>
                        <span>-</span>
                        <span>(<Translation translationKey="Pages.common" render={t => <>{t('tax_included')}</>} />)</span>
                    </div>
                    <div>
                        <small>
                            <Translation translationKey="Pages.common" render={t => <>{t('examination_fee_note')}</>} />
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default EntryFeeCard;