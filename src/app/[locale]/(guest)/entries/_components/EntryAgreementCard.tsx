import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import AdditionalForm from "./AdditionalForm";
import { Translation } from "@/components";

type AgreementCardProps = {
    form: UseFormReturn<any>;
    additionalFormValues: any;
    pdf_url: string;
}
const EntryAgreementCard: FC<AgreementCardProps> = ({ form, additionalFormValues, pdf_url }) => {
    return (
        <div className="card">
            <div className="card-header text-center">
                <span>
                    <Translation translationKey="Pages.common" render={t => <>{t('pledge_with_examination_entry_title')}</>} />
                </span>
            </div>
            <div className="card-body">
                <div>
                    <div>
                        <span>
                            <Translation translationKey="Pages.common" render={t => <>{t('pledge_with_examination_entry_note')}</>} />
                        </span>
                    </div>
                    <div>
                        <a className="text-danger" href={pdf_url} target="_blank">
                            <Translation translationKey="Pages.common" render={t => <>{t('pledge_with_examination_entry_link')}</>} />
                        </a>
                    </div>
                </div>
                <hr />
                <div>
                    <AdditionalForm values={additionalFormValues} form={form} />
                </div>
            </div>
        </div>
    );
}

export default EntryAgreementCard;