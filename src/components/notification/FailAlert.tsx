import { TAlert } from '@/types';
import React, { FC } from 'react';
import Alert from './Alert';


type FailAlertProps = TAlert;

const FailAlert: FC<FailAlertProps> = ({ show, title }) => {
    return (<Alert show={show} type="fail" title={title} />)
}

export default FailAlert;