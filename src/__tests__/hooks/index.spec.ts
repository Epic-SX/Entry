import { renderHook } from '@testing-library/react';
import { useGetCurrentUser } from '@/hooks';
import authService from '@/services/auth.service';

jest.mock('@/services/auth.service');
jest.mock('@/services');
jest.mock('@tanstack/react-query', () => {
  const originalModule = jest.requireActual('@tanstack/react-query');
  return {
    ...originalModule,
    useQuery: jest.fn(),
  };
});

describe('useGetCurrentUser', () => {
  it('should return current user info and authentication status', () => {
    const loginInfo = { user: { id: 1, name: 'John Doe' } };
    (authService.getLoginInfoFromCookie as jest.Mock).mockReturnValue(
      loginInfo,
    );
    (authService.isLoggedIn as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useGetCurrentUser());

    expect(result.current).toEqual({
      ...loginInfo,
      isAuthenticated: true,
    });
  });
});
