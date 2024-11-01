'use client';

import { TRANSLATION_KEY } from '@/constants';
import { useRouter } from '@/navigation';
import { public_routes } from '@/routes';
import { entryService } from '@/services';
import { useAlertStore } from '@/stores';
import { AxiosError } from 'axios';
import { useLocale } from 'next-intl';
import { FC, useEffect, useRef, useState } from 'react';

type Props = {
    searchParams: {
        token: string;
    };
}
const PaymentSuccess: FC<Props> = ({ searchParams }) => {
    const router = useRouter();
    const { showAlert } = useAlertStore();
    const initialized = useRef(false);
    const locale = useLocale();
    const[isLoading, setIsLoading] =useState(true);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            if (searchParams.token) {
                entryService.checkoutComplete({ token: searchParams.token, locale: locale })
                    .then((res) => {
                        const completed = (res as any).completed;
                        if (completed) {
                            router.push(`${public_routes.tasks_complete}?token=${searchParams.token}`);
                        } else {
                            router.push(`tasks?token=${searchParams.token}`);
                            showAlert({
                                title: (res as any).success_message,
                                type: 'success',
                                rootTranslationKey: 'Pages.entries',
                                translationKey: 'regist_completed_message',
                            });
                        }
                    })
                    .catch((error) => {
                        let errorMessage = 'エラーが発生しました';
                        if (error instanceof AxiosError) {
                            errorMessage = error.response?.data?.error_message || 'エラーが発生しました';
                        }
                        router.push(`${public_routes.error_invalid_page}?callBackUrl=${public_routes.entries}`);
                        showAlert({
                            title: errorMessage,
                            type: 'fail',
                            rootTranslationKey: TRANSLATION_KEY.API_MESSAGE,
                            translationKey: TRANSLATION_KEY.ERROR_500,
                        });
                    }).finally(() => {
                        setIsLoading(false);
                    });
            } else {
                router.push(public_routes.error_invalid_page);
            }
        }
    }, [locale, router, searchParams.token, showAlert]);
    
    if (isLoading) {
        return  (
            <div className="card mt-4 pt-4" aria-hidden="true">
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div>
        )
    }
    return null;
}

export default PaymentSuccess;