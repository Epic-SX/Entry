import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useRouter } from '@/navigation';
import { entryService } from '@/services';
import { useAlertStore } from '@/stores';
import { useLocale } from 'next-intl';
import { AxiosError } from 'axios';
import PaymentSuccess from '@/app/[locale]/(guest)/payment-success/page';

jest.mock('@/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/services', () => ({
  entryService: {
    checkoutComplete: jest.fn(),
  },
}));

jest.mock('@/stores', () => ({
  useAlertStore: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}));

describe('PaymentSuccess', () => {
  const mockPush = jest.fn();
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAlertStore as unknown as jest.Mock as jest.Mock).mockReturnValue({
      showAlert: mockShowAlert,
    });
    (useLocale as jest.Mock).mockReturnValue('en');
  });

  it('redirects to tasks_complete on successful payment', async () => {
    const mockResponse = { completed: true };
    (entryService.checkoutComplete as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    render(<PaymentSuccess searchParams={{ token: 'test-token' }} />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/tasks/complete?token=test-token');
    });
  });

  it('redirects to tasks with success message on incomplete payment', async () => {
    const mockResponse = { completed: false, success_message: 'Success' };
    (entryService.checkoutComplete as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    render(<PaymentSuccess searchParams={{ token: 'test-token' }} />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('tasks?token=test-token');
    });
  });

  it('redirects to error_invalid_page on API error', async () => {
    const mockError = new AxiosError('Error');
    (entryService.checkoutComplete as jest.Mock).mockRejectedValue(mockError);

    render(<PaymentSuccess searchParams={{ token: 'test-token' }} />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/error/invalid-page?callBackUrl=/entries',
      );
    });
  });

  it('redirects to error_invalid_page if token is missing', () => {
    render(<PaymentSuccess searchParams={{ token: '' }} />);

    expect(mockPush).toHaveBeenCalledWith('/error/invalid-page');
  });
});
