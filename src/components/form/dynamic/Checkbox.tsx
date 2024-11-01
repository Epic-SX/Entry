import { BaseProps } from ".";
import { FC } from "react";
import TranslationErrorMessage from "./TranslationErrorMessage";

type CheckboxProps = BaseProps<any, any>;

const Checkbox: FC<CheckboxProps> = ({ form, config, errorMessage }) => {
    const defaultValue = config.default as any;
    return (
        <div>
            <div className="form-check">
                {
                    config['options']
                    && Object.entries(config['options'])
                        .map(([key, value]) => (
                            <div className="form-check me-2" key={key}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked={key === defaultValue}
                                    value={key}
                                    {...form.register(config.name)}
                                />
                                <label className="form-check-label">{value as any}</label>
                            </div>
                        ))
                }
            </div>
            <TranslationErrorMessage errorKey={errorMessage} />
        </div>
    );
}

export default Checkbox;