import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '@/app/[locale]/auth/login/page';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { authService } from '@/services';
import { useLoginSchema } from '@/schemas';

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));

jest.mock('@/schemas', () => ({
  useLoginSchema: jest.fn(),
}));

jest.mock('@/services', () => ({
  authService: {
    login: jest.fn(),
    onLoginSuccess: jest.fn(),
    onLoginFail: jest.fn(),
    isCookieExpired: jest.fn().mockReturnValue(false),
    onCookieExpired: jest.fn(),
  },
}));

jest.mock('@/components', () => ({
  LoginForm: ({ isLoading, form, onSubmit }: any) => (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input name="email" placeholder="Email" ref={form.register} />
      <input
        name="password"
        placeholder="Password"
        ref={form.register}
        type="password"
      />
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  ),
  Translation: ({ render }: any) => render((key: any) => key),
}));

describe('Login Component', () => {
  const mockLoginSchema = {
    schema: {},
    loginType: {},
  };
  const mockFormMethods = {
    handleSubmit: jest.fn((fn) => fn),
    register: jest.fn(),
    formState: {
      errors: {},
    },
  };
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useLoginSchema as jest.Mock).mockReturnValue(mockLoginSchema);
    (useForm as jest.Mock).mockReturnValue(mockFormMethods);
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(<Login searchParams={{}} />);
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
  });

  it('sets callbackUrl in session storage', () => {
    const callbackUrl = '/dashboard';
    render(<Login searchParams={{ callbackUrl }} />);
    expect(sessionStorage.getItem('callbackUrl')).toBe(callbackUrl);
  });

  it('checks if cookie is expired and handles it', () => {
    (authService.isCookieExpired as jest.Mock).mockReturnValue(true);

    render(<Login searchParams={{}} />);
    expect(authService.onCookieExpired).toHaveBeenCalled();
  });
});
