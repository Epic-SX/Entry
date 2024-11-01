import GoogleCallBack from '@/app/[locale]/auth/google/page';
import { HttpService, authService } from '@/services';
import { TLoginResponse } from '@/types';
import { render, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('@/services');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(),
}));

jest.mock('@/components/Translation', () => ({
  __esModule: true,
  default: ({ render }: any) => <>{render((key: any) => key)}</>,
}));

const mockRouter = {
  push: jest.fn(),
};

const mockSearchParams = {
  toString: jest.fn(() => 'code=test_code'),
};

(HttpService.get as jest.Mock) = jest.fn();
(authService.onLoginSuccess as jest.Mock) = jest.fn();
(authService.onLoginFail as jest.Mock) = jest.fn();
(useRouter as jest.Mock).mockReturnValue(mockRouter);
(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

describe('GoogleCallBack', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles successful login with callbackUrl', async () => {
    const mockResponse: TLoginResponse = { token: 'test_token' } as any;
    (HttpService.get as jest.Mock).mockResolvedValueOnce(mockResponse);
    sessionStorage.setItem('callbackUrl', '/dashboard');

    render(<GoogleCallBack />);

    await waitFor(() => {
      expect(authService.onLoginSuccess).toHaveBeenCalledWith(
        mockResponse,
        '/dashboard',
      );
    });

    sessionStorage.removeItem('callbackUrl');
  });

  it('handles login failure', async () => {
    const mockError = new Error('Login failed');
    (HttpService.get as jest.Mock).mockRejectedValueOnce(mockError);

    render(<GoogleCallBack />);

    await waitFor(() => {
      expect(authService.onLoginFail).toHaveBeenCalledWith(mockError);
    });
  });
});
