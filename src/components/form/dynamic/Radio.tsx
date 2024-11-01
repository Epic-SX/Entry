import { FC } from "react";
import { BaseProps } from ".";
import Translation from "@/components/Translation";
import TranslationErrorMessage from "./TranslationErrorMessage";

type RadioProps = BaseProps;

const Radio: FC<RadioProps> = ({ form, config, errorMessage }) => {
    const defaultValue = config.default as any;
    return (
        <div>
            <div className="form-check">
                {
                    config['options' as keyof typeof config]
                    && Object.entries(config['options' as keyof typeof config])
                        .map(([key, value]) => (
                            <div className="form-check me-2" key={key}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value={key}
                                    defaultChecked={key === defaultValue}
                                    {...form.register(config.name)}
                                />
                                <label className="form-check-label">
                                    <Translation
                                        translationKey={config['option_translate_key']}
                                        render={(t) => t(key as any)}
                                    />
                                </label>
                            </div>
                        ))
                }
            </div>
            <TranslationErrorMessage errorKey={errorMessage} />
        </div>
    );
}

export default Radio;