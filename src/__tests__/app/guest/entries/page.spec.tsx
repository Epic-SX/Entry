import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import Entries from '@/app/[locale]/(guest)/entries/page';
import { useAlertStore } from '@/stores';
import { useLocale, useTranslations } from 'next-intl';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
jest.mock('@/stores', () => ({
  useAlertStore: jest.fn(),
}));
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(),
}));
jest.mock('@/services', () => ({
  entryService: {
    tourEntry: jest.fn(),
    createEntry: jest.fn(),
  },
  paymentService: {
    createPaymentSession: jest.fn(),
  },
}));
jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(),
}));
jest.mock('@/components/Translation', () => ({
  __esModule: true,
  default: ({ render }: any) => <>{render((key: any) => key)}</>,
}));
const mockStripe = {
  redirectToCheckout: jest.fn(),
};

describe('Entries Component', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({ data: null });
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
      setValue: jest.fn(),
      getValues: jest.fn(),
    });
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useAlertStore as any as jest.Mock).mockReturnValue({
      showAlert: jest.fn(),
    });
    (loadStripe as jest.Mock).mockResolvedValue(mockStripe);
    (useLocale as jest.Mock).mockReturnValue('jp');
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  it('renders correctly', () => {
    render(<Entries searchParams={{ id: 1, token: 'test-token' }} />);

    expect(screen.getAllByText(/title/i).length).toBeGreaterThan(0);
  });
});
