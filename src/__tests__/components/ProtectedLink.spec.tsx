import ProtectedLink from '@/components/ProtectedLink';
import { authService } from '@/services';
import { render, screen } from '@testing-library/react';

jest.mock('@/services', () => ({
  authService: {
    getLoginInfoFromCookie: jest.fn(),
    isLoggedIn: jest.fn(),
  },
}));

describe('ProtectedLink', () => {
  const mockGetLoginInfoFromCookie =
    authService.getLoginInfoFromCookie as jest.Mock;
  const mockIsLoggedIn = authService.isLoggedIn as jest.Mock;

  it('should render children if isRequiredAuth is false', () => {
    render(
      <ProtectedLink isRequiredAuth={false}>
        <div>Protected Content</div>
      </ProtectedLink>,
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should render children if user is authenticated and has required role', () => {
    mockGetLoginInfoFromCookie.mockReturnValue({ role: 1 });
    mockIsLoggedIn.mockReturnValue(true);

    render(
      <ProtectedLink roles={[1]} isRequiredAuth={true}>
        <div>Protected Content</div>
      </ProtectedLink>,
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should not render children if user is not authenticated', () => {
    mockGetLoginInfoFromCookie.mockReturnValue(null);
    mockIsLoggedIn.mockReturnValue(false);

    render(
      <ProtectedLink roles={[1]} isRequiredAuth={true}>
        <div>Protected Content</div>
      </ProtectedLink>,
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
