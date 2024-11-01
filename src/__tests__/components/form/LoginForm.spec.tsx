import LoginForm from '@/components/form/LoginForm';
import { HttpService } from '@/services';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('@/services', () => ({
  HttpService: {
    get: jest.fn(),
  },
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn().mockReturnValue((key: string) => key),
}));

jest.mock('next/link', () => {
  const Link = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  Link.displayName = 'Link';
  return Link;
});

jest.mock('@/components', () => ({
  LoadingButton: jest.fn(() => <button>Loading...</button>),
  Translation: jest.fn(
    ({
      render,
    }: {
      render: (t: (key: string) => string) => React.ReactNode;
    }) => <>{render((key) => key)}</>,
  ),
}));

const mockFormReturn = {
  handleSubmit: jest.fn(),
  register: jest.fn(),
  formState: {
    errors: {},
  },
};

describe('LoginForm', () => {
  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue(mockFormReturn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render form elements correctly', () => {
    render(
      <LoginForm
        form={mockFormReturn as any}
        onSubmit={jest.fn()}
        isLoading={false}
      />,
    );

    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
  });

  it('should display loading button when isLoading is true', () => {
    render(
      <LoginForm
        form={mockFormReturn as any}
        onSubmit={jest.fn()}
        isLoading={true}
      />,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should call handleGoogleLogin on Google button click', async () => {
    const mockRedirectUrl = 'http://localhost/';
    (HttpService.get as jest.Mock).mockResolvedValue({
      redirectUrl: mockRedirectUrl,
    });
    render(
      <LoginForm
        form={mockFormReturn as any}
        onSubmit={jest.fn()}
        isLoading={false}
      />,
    );
    const googleBtn = screen.getAllByRole('button')[1];
    fireEvent.click(googleBtn);
    await waitFor(() => expect(window.location.href).toBe(mockRedirectUrl));
  });

  it('should call onSubmit with form values on form submit', () => {
    const mockOnSubmit = jest.fn();
    mockFormReturn.handleSubmit.mockImplementation(
      (fn: any) => (e: React.FormEvent) => {
        e.preventDefault();
        fn({
          email: 'test@example.com',
          password: 'password',
        });
      },
    );

    render(
      <LoginForm
        form={mockFormReturn as any}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />,
    );

    fireEvent.input(screen.getByLabelText('email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('password'), {
      target: { value: 'password' },
    });
    fireEvent.submit(screen.getAllByRole('button')[0]);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should display validation errors', () => {
    mockFormReturn.formState.errors = {
      email: { message: 'Email is required' },
      password: { message: 'Password is required' },
    };
    render(
      <LoginForm
        form={mockFormReturn as any}
        onSubmit={jest.fn()}
        isLoading={false}
      />,
    );
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
});
