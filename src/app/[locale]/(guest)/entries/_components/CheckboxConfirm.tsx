import { TranslationErrorMessage } from "@/components/form/dynamic";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type CheckboxConfirmProps = {
    form: UseFormReturn<any, any, undefined>;
    lables: string;
    name: string;
    translationKey: string;
}

const CheckboxConfirm: FC<CheckboxConfirmProps> = ({ form, name, translationKey }) => {
    const t = useTranslations("Pages.common");
    const labelArray = t(`pledge_with_examination_entry_list.${translationKey}`).split('\n');
    if (labelArray.length == 0) {
        return null;
    }
    return (
        <div className="mb-3">
            <input className="form-check-input" type="checkbox" value="1"  {...form.register(name)} />
            <label className="form-check-label">
                <small className="fw-bold text-dark">{labelArray[0]}</small>
                {labelArray.length > 1 && (
                    <ul>
                        {labelArray.slice(1).map((label, index) =>
                            <li key={index}>
                                <small className="text-secondary">{label}</small>
                            </li>)}
                    </ul>
                )}
            </label>
            <TranslationErrorMessage errorKey={form.formState.errors[name]?.message as any} />
        </div>
    );
}
export default CheckboxConfirm;