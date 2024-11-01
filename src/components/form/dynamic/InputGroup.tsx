import { FC } from "react";
import { BaseProps } from ".";
import Translation from "@/components/Translation";
import TranslationErrorMessage from "./TranslationErrorMessage";


type InputGroupProps = BaseProps<any> & {
    type: string;
    name?: any;
    groupBeforeText?: string | React.ReactNode;
    groupAfterText?: string | React.ReactNode;
}
const InputGroup: FC<InputGroupProps> = ({
    config,
    form,
    type,
    errorMessage,
    name,
    groupBeforeText,
    groupAfterText }) => {

    return (
        <div className="">
            <div className="input-group">
                {(groupBeforeText || config['before_text']) && (
                    <span className="input-group-text">
                        {groupBeforeText ? groupBeforeText : (<Translation translationKey='FormTitle' render={t => <>{t(config['before_text'])}</>} />)}
                    </span>
                )}
                <input
                    type={type}
                    className="form-control"
                    {...form.register(name ? name : config.name)}
                />
                {(groupAfterText || config['after_text']) && (
                    <span className="input-group-text">
                        {groupAfterText ? groupAfterText : (<Translation translationKey='FormTitle' render={t => <>{t(config['after_text'])}</>} />)}
                    </span>
                )}
            </div>
            <TranslationErrorMessage errorKey={errorMessage} />
        </div>
    );
}

export default InputGroup;