import { TAlert } from '@/types';
import React, { FC } from 'react';
import Alert from './Alert';


type InfoAlertProps = TAlert;

const InfoAlert: FC<InfoAlertProps> = ({ show, title }) => {
    return (<Alert show={show} type="info" title={title} />)
}

export default InfoAlert;