import { Translation } from "@/components";
import { TranslationErrorMessage } from "@/components/form/dynamic";
import { JP_LOCALE } from "@/constants";
import { TTaskAnswer } from "@/types";
import { useLocale } from "next-intl";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type ExamEntryProps = {
    index: number;
    exam: TTaskAnswer;
    form: UseFormReturn<any>;
    isConfirm?: boolean;
}

const ExamEntry: FC<ExamEntryProps> = ({ index, exam, form, isConfirm }) => {
    const locale = useLocale();
    return (
        <div className="card" key={index}>
            <div className="card-header">
                <div className="d-flex align-items-center">
                    <span>
                        <Translation translationKey="Pages.common" render={t => <>{t('question')}</>} />
                    </span>
                    <span className="ms-2 fw-bold">{index + 1}</span>
                    {!isConfirm && (
                        <span className="badge text-bg-danger ms-3">
                            <small>
                                <Translation translationKey="FormValidation" render={t => <>{t('required_title')}</>} />
                            </small>
                        </span>
                    )}
                </div>
                {locale === JP_LOCALE
                    ? (<div dangerouslySetInnerHTML={{ __html: exam.task.question_jp }} />)
                    : (<div dangerouslySetInnerHTML={{ __html: exam.task.question }} />)}

            </div>
            <div className="card-body">
                {isConfirm
                    ? (<>{form.getValues(`task_${index + 1}`)}</>)
                    : (<>
                        <textarea className="form-control" rows={15} {...form.register(`task_${index + 1}`)}></textarea>
                        <TranslationErrorMessage
                            errorKey={form.formState.errors[`task_${index + 1}`]?.message as any}
                        />
                    </>)}
            </div>
        </div>
    );
}

export default ExamEntry;