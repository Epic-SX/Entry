'use client';

import { HttpService } from '@/services';
import { TLoginResponse } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useRef } from 'react';
import { Spiner, Translation } from '@/components';
import { authService } from '@/services';
import { api_routes } from '@/routes';


const GoogleCallBack: FC = () => {
    const isLoggedIn = authService.isLoggedIn();
    const searchParams = useSearchParams();
    const initialized = useRef(false);
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) {
            router.replace('/');
            return;
        }
        if (!initialized.current) {
            initialized.current = true;
            HttpService.get<TLoginResponse>(`${api_routes.google_callback}?${searchParams.toString()}`)
                .then((res: TLoginResponse) => {
                    const callBackUrl = sessionStorage.getItem("callbackUrl");
                    if (callBackUrl) {
                        authService.onLoginSuccess(res, callBackUrl);
                    } else {
                        authService.onLoginSuccess(res);
                    }
                })
                .catch(err => {
                    authService.onLoginFail(err);
                });
        }
    }, [isLoggedIn, router, searchParams]);

    return (
        <div className="d-flex justify-content-center align-items-center p-4">
            <Spiner />
            <strong className="p-4 text-lg text-dark">
                <Translation translationKey="Login" render={(t) => <>{t('pendingTitle')}</>} />
            </strong>
        </div>
    )
}

export default GoogleCallBack;
