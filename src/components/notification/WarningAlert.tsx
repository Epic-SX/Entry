import { TAlert } from '@/types';
import React, { FC } from 'react';
import Alert from './Alert';


type WarningAlertProps = TAlert;

const WarningAlert: FC<WarningAlertProps> = ({ show, title }) => {
    return (<Alert show={show} type="warning" title={title} />)
}

export default WarningAlert;