'use client';

import * as z from 'zod';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TLoginRequest, useLoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginForm } from '@/components/form';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services';
import { TLoginResponse } from '@/types';
import { Translation } from '@/components';
import Cookies from 'js-cookie';
import { IS_LOGOUTED, LAST_VISITED_PATH } from '@/constants';

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};

const Login: FC<Props> = ({ searchParams }) => {
  const isLogouted = Cookies.get(IS_LOGOUTED) === 'true';

  useEffect(() => {
    if (isLogouted) {
      Cookies.remove(LAST_VISITED_PATH);
      Cookies.remove(IS_LOGOUTED);
    }
  }, [isLogouted]);

  const callbackUrl = searchParams.callbackUrl;
  const { schema: LoginSchema, loginType } = useLoginSchema();

  const { mutate: login, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (req: TLoginRequest) => authService.login(req),
    onSuccess: (res: TLoginResponse) =>
      authService.onLoginSuccess(res, callbackUrl),
    onError: (err) => authService.onLoginFail(err),
  });

  const form = useForm<typeof loginType>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (callbackUrl) {
      sessionStorage.removeItem('callbackUrl');
      sessionStorage.setItem('callbackUrl', callbackUrl);
    }
  }, [callbackUrl]);

  useEffect(() => {
    if (authService.isCookieExpired()) {
      authService.onCookieExpired();
    }
  }, []);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    login(values);
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card rounded">
            <div className="card-header text-center text-bg-primary">
              <strong className="text-center">
                <Translation
                  translationKey="Login"
                  render={(t) => <>{t('title')}</>}
                />
              </strong>
            </div>
            <div className="card-body p-4">
              <LoginForm
                isLoading={isPending}
                form={form}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
