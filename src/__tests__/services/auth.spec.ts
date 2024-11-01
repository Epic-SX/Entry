import { TLoginRequest } from '@/schemas';
import { HttpService } from '@/services';
import { TLoginResponse } from '@/types';
import Cookies from 'js-cookie';
import { ACESS_TOKEN, HOME_URL, LOGIN_INFO } from '@/constants';
import { AxiosError } from 'axios';
import { navigate } from '@/actions';
import { api_routes, auth_routes } from '@/routes';
import authService from '@/services/auth.service';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('@/services');
jest.mock('@/stores', () => ({
  useAlertStore: {
    getState: jest.fn(() => ({
      hideAlert: jest.fn(),
      showAlert: jest.fn(),
    })),
  },
}));
jest.mock('@/actions', () => ({
  navigate: jest.fn(),
}));

describe('AuthService', () => {
  const loginRequest: TLoginRequest = {
    email: 'test@example.com',
    password: 'password123',
  };

  const loginResponse: TLoginResponse = {
    access_token: 'fake_token',
    user: {
      name: 'John Doe',
      role: 1,
      email: 'test@example.com',
    },
    token_type: 'Bearer',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login', async () => {
      (HttpService.http as jest.Mock).mockReturnValue({
        get: jest.fn().mockResolvedValueOnce({}),
      });
      (HttpService.post as jest.Mock).mockResolvedValueOnce(loginResponse);

      const result = await authService.login(loginRequest);

      expect(HttpService.http).toHaveBeenCalledWith(true);
      expect(HttpService.post).toHaveBeenCalledWith(
        api_routes.login,
        loginRequest,
      );
      expect(result).toEqual(loginResponse);
    });

    it('should throw an error for invalid credentials', async () => {
      const invalidLoginRequest = { ...loginRequest, email: '' };

      await expect(authService.login(invalidLoginRequest)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('logout', () => {
    it('should successfully logout', async () => {
      (HttpService.post as jest.Mock).mockResolvedValueOnce({});

      const result = await authService.logout();

      expect(HttpService.post).toHaveBeenCalledWith(api_routes.logout);
      expect(result).toBe(true);
    });
  });

  describe('onLoginSuccess', () => {
    it('should set cookies and navigate to home', () => {
      authService.onLoginSuccess(loginResponse, null);

      expect(Cookies.set).toHaveBeenCalledWith(
        ACESS_TOKEN,
        loginResponse.access_token,
        { expires: 5 / 24 },
      );
      expect(Cookies.set).toHaveBeenCalledWith(LOGIN_INFO, 'John Doe;1');
      expect(navigate).toHaveBeenCalledWith(HOME_URL);
    });

    it('should navigate to callback URL if provided', () => {
      const callbackUrl = '/dashboard';
      authService.onLoginSuccess(loginResponse, callbackUrl);

      expect(navigate).toHaveBeenCalledWith(callbackUrl);
    });
  });

  describe('onLoginFail', () => {
    it('should handle login failure', () => {
      const error = new AxiosError();
      authService.onLoginFail(error);

      expect(Cookies.remove).toHaveBeenCalledWith(ACESS_TOKEN);
      expect(Cookies.remove).toHaveBeenCalledWith(LOGIN_INFO);
      expect(navigate).toHaveBeenCalledWith(auth_routes.login);
    });
  });

  describe('onLogoutSuccess', () => {
    it('should clear cookies and navigate to login', () => {
      authService.onLogoutSuccess();

      expect(Cookies.remove).toHaveBeenCalledWith(ACESS_TOKEN);
      expect(Cookies.remove).toHaveBeenCalledWith(LOGIN_INFO);
      expect(navigate).toHaveBeenCalledWith(auth_routes.login);
    });
  });

  describe('onCookieExpired', () => {
    it('should show alert and clear cookies', () => {
      authService.onCookieExpired();

      expect(Cookies.remove).toHaveBeenCalledWith(ACESS_TOKEN);
      expect(Cookies.remove).toHaveBeenCalledWith(LOGIN_INFO);
    });
  });

  describe('getLoginInfoFromCookie', () => {
    it('should return login info from cookie', () => {
      (Cookies.get as jest.Mock).mockReturnValue('John Doe;1');

      const result = authService.getLoginInfoFromCookie();

      expect(result).toEqual({ name: 'John Doe', role: 1 });
    });

    it('should return null if no login info in cookie', () => {
      (Cookies.get as jest.Mock).mockReturnValue(null);

      const result = authService.getLoginInfoFromCookie();

      expect(result).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if access token exists', () => {
      (Cookies.get as jest.Mock).mockReturnValue('fake_token');

      const result = authService.isLoggedIn();

      expect(result).toBe(true);
    });

    it('should return false if access token does not exist', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);

      const result = authService.isLoggedIn();

      expect(result).toBe(false);
    });
  });

  describe('isCookieExpired', () => {
    it('should return true if access token does not exist but login info exists', () => {
      (Cookies.get as jest.Mock).mockImplementation((key) => {
        if (key === ACESS_TOKEN) return undefined;
        if (key === LOGIN_INFO) return 'John Doe;1';
        return null;
      });

      const result = authService.isCookieExpired();

      expect(result).toBe(true);
    });

    it('should return false if both access token and login info exist', () => {
      (Cookies.get as jest.Mock).mockImplementation((key) => {
        if (key === ACESS_TOKEN) return 'fake_token';
        if (key === LOGIN_INFO) return 'John Doe;1';
        return null;
      });

      const result = authService.isCookieExpired();

      expect(result).toBe(false);
    });

    it('should return false if neither access token nor login info exist', () => {
      (Cookies.get as jest.Mock).mockReturnValue(null);

      const result = authService.isCookieExpired();

      expect(result).toBe(false);
    });
  });

  describe('getAccessToken', () => {
    it('should return the access token', () => {
      (Cookies.get as jest.Mock).mockReturnValue('fake_token');

      const result = authService.getAccessToken();

      expect(result).toBe('fake_token');
    });
  });

  describe('clearCookie', () => {
    it('should clear the cookies', () => {
      authService.clearCookie();

      expect(Cookies.remove).toHaveBeenCalledWith(ACESS_TOKEN);
      expect(Cookies.remove).toHaveBeenCalledWith(LOGIN_INFO);
    });
  });
});
