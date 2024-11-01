import { FC } from "react";
import CheckboxConfirm from "./CheckboxConfirm";

type AdditionalFormProps = {
    values: Array<{ lables: string; name: string }>;
    form: any;
}

const AdditionalForm: FC<AdditionalFormProps> = ({ values, form }) => {
    if (!values || values.length === 0) {
        return null;
    }
    return (
        <div className="form-check">
            {values.map((item, index) => (
                <CheckboxConfirm translationKey={`${index+1}`} key={index} {...item} form={form} />
            ))}
        </div>
    );
}

export default AdditionalForm;