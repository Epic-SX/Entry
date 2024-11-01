import { TAlert } from '@/types';
import React, { FC } from 'react';
import Alert from './Alert';
import Translation from '../Translation';
import { TRANSLATION_KEY } from '@/constants';

type PendingAlertProps = Pick<TAlert, 'show'>;

const PendingAlert: FC<PendingAlertProps> = ({ show }) => {
    return (
        <Alert
            show={show}
            type="info"
            title={(
                <Translation
                    translationKey={TRANSLATION_KEY.API_STATUS}
                    render={(t) => <>{t(TRANSLATION_KEY.API_STATUS_PROCESSING)}</>}
                />)}
        />)
}

export default PendingAlert