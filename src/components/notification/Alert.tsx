'use client';

import { useAlertStore } from '@/stores';
import { TAlert } from '@/types';
import clsx from 'clsx';
import React, { FC } from 'react';
type Props = TAlert;
const Alert: FC<Props> = ({ title, type, show = false }) => {
    const { hideAlert } = useAlertStore();
    if (!show) {
        return null;
    }

    let classNameType = '';
    switch (type) {
        case "success":
            classNameType = 'alert-success';
            break;
        case "fail":
            classNameType = 'alert-danger';
            break;
        case "info":
            classNameType = 'alert-primary';
            break;
        case "warning":
            classNameType = 'alert-warning';
            break;
        default:
            classNameType = 'alert-primary';
            break;
    }
    const Icon = ()=>{
        if (type === "success") {
            return <i className="fas fa-check-circle" />
        }
        if (type === "fail") {
            return <i className="fas fa-exclamation-circle"></i>
        }
        if (type === "warning") {
            return <i className="fas fa-exclamation-triangle" />
        }
        return null;
    }
    
    return (
        <div className={clsx(`alert placeholder-glow alert-custom ${classNameType} alert-dismissible fade show rounded-0`)} role="alert">
            <div className='d-flex align-items-center'>
                <Icon />
                {type === "info" && (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
                <div className='ms-2'>
                    <strong>{title}</strong>
                </div>
            </div>
            <button type="button" className="btn-close" onClick={hideAlert} aria-label="Close"></button>
        </div>
    );
}

export default Alert;
