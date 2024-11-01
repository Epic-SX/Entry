import { Translation } from "@/components";
import { TranslationErrorMessage } from "@/components/form/dynamic";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

type UploadImageFormProps = {
    form: UseFormReturn<any>;
    photoName: string;
}

const UploadImageForm: FC<UploadImageFormProps> = ({ form, photoName }) => {
    return (
        <form>
            <div className="text-center">
                <div>
                    <span>
                        <Translation
                            translationKey="Pages.common"
                            render={t => <>{t('photo_upload_modal_content_title')}</>} />
                    </span>
                </div>
                <div className="mt-3">
                    <div className="input-group">
                        <input
                            className="form-control"
                            id="upload_img"
                            type="file" {...form.register(photoName)}
                            accept="image/jpeg,image/png,image/jpg"
                        />
                    </div>
                </div>
                <TranslationErrorMessage errorKey={form.formState.errors[photoName]?.message as any} />
            </div>
        </form>
    );
}

export default UploadImageForm;