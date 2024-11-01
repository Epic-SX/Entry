import AuthLayout from '@/components/layout/AuthLayout';
import { auth_routes } from '@/routes';
import authService from '@/services/auth.service';
import { render, waitFor, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/services/auth.service', () => ({
  isLoggedIn: jest.fn(),
}));

jest.mock('@/components', () => ({
  __esModule: true,
  default: ({ count }: { count: number }) => (
    <div>Loading {count} skeletons...</div>
  ),
}));

describe('AuthLayout', () => {
  const useRouterMock = useRouter as jest.Mock;
  const usePathnameMock = usePathname as jest.Mock;
  const useSearchParamsMock = useSearchParams as jest.Mock;
  const isLoggedInMock = authService.isLoggedIn as jest.Mock;

  const mockReplace = jest.fn();

  beforeEach(() => {
    useRouterMock.mockReturnValue({ replace: mockReplace });
    usePathnameMock.mockReturnValue('/test-path');
    useSearchParamsMock.mockReturnValue(
      new URLSearchParams('param1=value1&param2=value2'),
    );
    isLoggedInMock.mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to login if not logged in', async () => {
    render(<AuthLayout>Child Content</AuthLayout>);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        `${auth_routes.login}?callbackUrl=%2Ftest-path%3Fparam1%3Dvalue1%26param2%3Dvalue2`,
      );
    });
  });

  it('should display children content if logged in', async () => {
    isLoggedInMock.mockReturnValue(true);

    render(<AuthLayout>Child Content</AuthLayout>);

    await waitFor(() => {
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });
  });
});
