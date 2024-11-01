import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import TourReentry from '@/app/[locale]/(guest)/tours/reentry/[id]/[token]/page';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components', () => ({
  __esModule: true,
  Translation: ({ render }: { translationKey: string; render: any }) => (
    <>{render((key: string) => key)}</>
  ),
}));

const mockRouterPush = jest.fn();
const mockRouterReplace = jest.fn();

describe('TourReentry', () => {
  const defaultProps = {
    params: {
      id: 1,
      token: 'test-token',
      locale: 'en',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
      replace: mockRouterReplace,
    });

    (useQuery as jest.Mock).mockReturnValue({
      data: {
        data: {
          tour_date: '2023-06-25',
          guardian_name: 'John Doe',
          child_name: 'Jane Doe',
        },
      },
      isError: false,
      isFetching: false,
      isLoading: false,
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
  });

  it('renders correctly with data', async () => {
    render(<TourReentry {...defaultProps} />);

    expect(screen.getByText('2023-06-25')).toBeInTheDocument();
    expect(screen.getByText('guardian_name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('child_name')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetching: true,
      isLoading: true,
    });

    render(<TourReentry {...defaultProps} />);

    expect(
      screen.queryByText('PageTitle.tours_regist'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Pages.tours.reentry.note'),
    ).not.toBeInTheDocument();
  });
});
