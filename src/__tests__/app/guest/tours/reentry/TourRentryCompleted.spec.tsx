import React from 'react';
import { render, screen } from '@testing-library/react';
import TourRentryCompleted from '@/app/[locale]/(guest)/tours/reentry/[id]/completed/page';

jest.mock('@/components', () => ({
  __esModule: true,
  NavigationLink: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  Translation: ({
    translationKey,
    render,
  }: {
    translationKey: string;
    render: any;
  }) => <>{render((key: string) => `${translationKey}.${key}`)}</>,
}));

describe('TourRentryCompleted', () => {
  const defaultProps = {
    searchParams: {
      type: 'success',
      key_transaltion: 'tours_reentry_success',
    },
  };

  const invalidProps = {
    searchParams: {
      type: 'invalid',
      key_transaltion: 'invalid_key',
    },
  };

  it('renders success message correctly', () => {
    render(<TourRentryCompleted {...defaultProps} />);

    expect(
      screen.getByText('Pages.tours.reentry.tours_reentry_success'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('ButtonTitle.return_to_site_btn'),
    ).toBeInTheDocument();
  });

  it('renders warning message correctly', () => {
    const warningProps = {
      searchParams: {
        type: 'warning',
        key_transaltion: 'tours_reentry_full',
      },
    };

    render(<TourRentryCompleted {...warningProps} />);

    expect(
      screen.getByText('Pages.tours.reentry.tours_reentry_full'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('ButtonTitle.return_to_site_btn'),
    ).toBeInTheDocument();
  });

  it('renders invalid page message for invalid access', () => {
    render(<TourRentryCompleted {...invalidProps} />);

    expect(screen.getByText('ErrorMessage.invalid_page')).toBeInTheDocument();
    expect(
      screen.getByText('ButtonTitle.return_to_site_btn'),
    ).toBeInTheDocument();
  });
});
