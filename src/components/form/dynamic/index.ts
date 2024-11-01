import { FieldValues, UseFormReturn } from "react-hook-form";
import DynamicForm from "./DynamicForm";
import ConfirmForm from "./ConfirmForm";
import StepBar from "./StepBar";
import TranslationErrorMessage from "./TranslationErrorMessage";

export { DynamicForm,ConfirmForm ,StepBar,TranslationErrorMessage};

export type BaseProps<T extends FieldValues = any, C = any> = {
    form: UseFormReturn<T, any, undefined>;
    config: C;
    errorMessage?: any;
}