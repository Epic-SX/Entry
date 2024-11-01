'use client';
import { Translation } from '@/components';
import Link from 'next/link';
import React, { FC } from 'react'

type Props = {
    searchParams: {
        message?: string;
        type?: "success" | "fail" | "warning" | "info";
        callBackUrl?: string;
    }
}

const InvalidPage: FC<Props> = ({ searchParams }) => {
    //const { showAlert } = useAlertStore();
    // useEffect(() => {
    //     if (searchParams.message) {
    //         showAlert({ 
    //             title: searchParams.message, type: searchParams.type ?? 'fail' });
    //     }
    // }, [searchParams.message, searchParams.type, showAlert]);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 p-4">
                    <div className="card p-4">
                        <div className="alert alert-warning text-center">
                            <strong>
                                <Translation
                                    translationKey='ErrorMessage'
                                    render={t => <>{t('invalid_page')}</>}
                                />
                            </strong>
                        </div>
                        <div className="text-center">
                            <Link href={searchParams.callBackUrl || "/"} className="btn btn-danger">
                                <Translation
                                    translationKey='ButtonTitle'
                                    render={t => <>{t('return_to_site_btn')}</>}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvalidPage;