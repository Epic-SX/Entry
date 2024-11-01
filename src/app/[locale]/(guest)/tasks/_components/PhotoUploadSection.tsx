import { LoadingButton, Translation } from "@/components";
import { ErrorMessage } from "@/components/form";
import { TUploadImage } from "@/types";
import { UseMutationResult } from "@tanstack/react-query";
import Image, { StaticImageData } from "next/image";
import { FC, ReactNode } from "react";

type PhotoUploadSectionProps = {
    title: string | ReactNode;
    photoUrl: string;
    defaultImg: StaticImageData | string;
    isConfirm?: boolean;
    uploadMutation: UseMutationResult<TUploadImage, Error, FormData, unknown>;
    setShowModal: (value: React.SetStateAction<boolean>) => void;
    errorMessage?: string;
}
const PhotoUploadSection: FC<PhotoUploadSectionProps> = ({
    title,
    photoUrl,
    defaultImg,
    isConfirm,
    uploadMutation,
    errorMessage,
    setShowModal }) => {
    return (
        <div className="col-md-6">
            <div>
                <div className="mb-2">
                    <strong>{title}</strong>
                </div>
                <Image
                    src={photoUrl || defaultImg}
                    alt="placeholder"
                    className="img-thumbnail"
                    width={200} height={200}
                    priority
                />
                {!isConfirm && (
                    <>
                        <div className="mt-2">
                            {
                                uploadMutation.isPending
                                    ? (<LoadingButton label={(<Translation translationKey="ButtonTitle" render={t => <>{t('processing_upload_btn')}</>}/>)} />)
                                    : (<button
                                        className="btn btn-success"
                                        type='button'
                                        onClick={() => setShowModal(true)}
                                    >
                                        <Translation
                                            translationKey='ButtonTitle'
                                            render={t => <>{t('change_photo_btn')}</>}
                                        />
                                    </button>)
                            }
                        </div>
                        {errorMessage && (<ErrorMessage errorMessage={errorMessage} />)}
                    </>
                )}
            </div>
        </div>
    );
}

export default PhotoUploadSection;