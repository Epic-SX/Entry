import { useTranslations } from "next-intl";
import { FC } from "react";
import ErrorMessage from "../ErrorMessage";

type TranslationErrorMessageProps = {
    errorKey?: string;
}
const TranslationErrorMessage: FC<TranslationErrorMessageProps> = ({ errorKey }) => {
    const tValidation = useTranslations('FormValidation');
    if (!errorKey) {
        return null;
    }
    const message = tValidation(errorKey);
    return (
        <ErrorMessage
            errorMessage={message}
        />
    );
}

export default TranslationErrorMessage;