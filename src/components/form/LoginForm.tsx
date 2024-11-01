'use client';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import Link from 'next/link'
import React, { FC } from 'react'
import { UseFormReturn } from 'react-hook-form';
import { HttpService } from '@/services';
import { api_routes } from '@/routes';
import { LoadingButton, Translation } from '..';

type Props = {
    form: UseFormReturn<{
        email: string;
        password: string;
    }, any, undefined>;
    isLoading: boolean;
    onSubmit: (values: z.infer<typeof LoginSchema>) => void;
}
const LoginForm: FC<Props> = ({ form, onSubmit, isLoading }) => {
    const handleGoogleLogin = async () => {
        const { redirectUrl } = await HttpService.get<{ redirectUrl: string }>(api_routes.google_redirect);
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }
    return (
        <>
            <form className="pe-4 ps-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        <Translation translationKey="LoginForm" render={(t) => <>{t('email')}</>} />
                    </label>
                    <input type="email" className="form-control" id="email" {...form.register("email")} />
                    <small className="text-danger">
                        {form.formState.errors.email?.message}
                    </small>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        <Translation translationKey="LoginForm" render={(t) => <>{t('password')}</>} />
                    </label>
                    <input type="password" className="form-control" id="password" {...form.register("password")} />
                    <small className="text-danger">
                        {form.formState.errors.password?.message}
                    </small>
                </div>
                <div className="pt-2 text-center">
                    <div>
                        {isLoading
                            ? (<LoadingButton label={<Translation translationKey="Login" render={(t) => <>{t('pendingTitle')}</>} />} />)
                            : (<button type="submit" className="btn pt-1 pb-1 px-4 btn-primary me-4">
                                <Translation translationKey="Login" render={(t) => <>{t('title')}</>} />
                            </button>)}
                        <button type="button" className="btn btn-danger pt-1 pb-1 me-4" onClick={handleGoogleLogin}>
                            google <Translation translationKey="Login" render={(t) => <>{t('title')}</>} />
                        </button>
                    </div>
                    <div className="mt-4">
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" href="#">
                            <Translation translationKey="ForgotPassword" render={(t) => <>{t('title')}</>} />
                        </Link>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LoginForm
