'use client';

import { DownLineList, Translation } from '@/components';
import { StepBar } from '@/components/form/dynamic';
import { entrySteps } from '@/constants';
import { public_routes } from '@/routes';
import { tasksService } from '@/services';
import { useAlertStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react'

type Props = {
    searchParams: {
        token: string;
    }
}

const TaskComplete: FC<Props> = ({ searchParams }) => {
    const router = useRouter();
    const { showAlert } = useAlertStore();

    const getTaskByToken = useQuery({
        queryKey: ['tasks', 'getTaskByToken'],
        queryFn: () => tasksService.getTaskByToken(searchParams),
        enabled: !!searchParams.token,
        retry: 0,
    });

    useEffect(() => {
        if (!searchParams.token) {
            router.push(public_routes.error_invalid_page);
        }
        if (getTaskByToken.isError) {
            const error = getTaskByToken.error;
            let message = '';
            if (error instanceof AxiosError) {
                message = error.response?.data.error_message;
            }
            if (message) {
                showAlert({ type: 'fail', title: message });
            }
            router.push(public_routes.error_invalid_page);
        }

    }, [getTaskByToken.error, getTaskByToken.isError, router, searchParams.token, showAlert]);


    return (
        <div className="container">
            <StepBar
                width={3}
                current={4}
                steps={entrySteps}
                render={step => <Translation translationKey={'Pages.entries.steps'} render={t => <>{t(step)}</>} />}
            />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mb-2 p-3">
                        <div className="alert alert-success text-center" role="alert">
                            <Translation
                                translationKey="Pages.tasks"
                                render={t => <>
                                    <DownLineList
                                        line={t('regist_completed_message')}
                                        render={s => <p className="text-sm text-dark">{s}</p>}
                                    />
                                </>}
                            />
                        </div>
                        <div className="text-center">
                            <Link href="/" className="btn btn-success">
                                <Translation
                                    translationKey='ButtonTitle'
                                    render={t => <>{t('home_return_btn')}</>}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskComplete;