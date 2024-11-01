import { Modal, Translation } from '@/components';
import React, { FC } from 'react';

type Props = {
    show: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    content: React.ReactNode;
}

const UploadImageModal: FC<Props> = ({ show, onCancel, onConfirm, content }) => {
    return <Modal
        title={(<Translation translationKey={'Pages.common'} render={t => <>{t('photo_upload_modal_title')}</>} />)}
        show={show}
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelLabel={(<Translation translationKey={'ButtonTitle'} render={t => <>{t('cancel_btn')}</>} />)}
        confirmLabel={(<Translation translationKey={'ButtonTitle'} render={t => <>{t('upload_btn')}</>} />)}
        content={content}
    />
}

export default UploadImageModal;