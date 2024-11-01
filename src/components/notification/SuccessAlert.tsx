import { TAlert } from '@/types';
import React, { FC } from 'react';
import Alert from './Alert';


type SuccessAlertProps = TAlert;

const SuccessAlert: FC<SuccessAlertProps> = ({ show, title }) => {
    return (<Alert show={show} type="success" title={title} />)
}

export default SuccessAlert;