import DynamicForm from '@/components/form/dynamic/DynamicForm';
import { isHidenNameAlp } from '@/libs';
import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}));

jest.mock('@/components/Translation', () => {
  return ({ translationKey, render }: any) => render((key: string) => key);
});

jest.mock('@/libs', () => ({
  isHidenNameAlp: jest.fn().mockReturnValue(false),
}));

jest.mock('@/components/form/dynamic/InputRow', () => {
  return jest.fn(() => <div>InputRow</div>);
});

describe('DynamicForm', () => {
  let mockFormReturn: UseFormReturn<any, any>;

  beforeEach(() => {
    (useLocale as jest.Mock).mockReturnValue('en');
    mockFormReturn = {
      handleSubmit: jest.fn().mockImplementation((fn) => (e: any) => {
        e.preventDefault();
        return fn({});
      }),
      register: jest.fn(),
      formState: {
        errors: {},
      },
      getValues: jest.fn(),
      setValue: jest.fn(),
      watch: jest.fn(),
      reset: jest.fn(),
      trigger: jest.fn(),
      control: {},
      clearErrors: jest.fn(),
      setError: jest.fn(),
      unregister: jest.fn(),
    } as unknown as UseFormReturn<any, any>;
  });

  const configFormValues = [
    { name: 'name', type: 'text', label: 'Name', must_flg: 1 },
    { name: 'email', type: 'email', label: 'Email', must_flg: 0 },
  ];

  const onSubmit = jest.fn();

  it('should render form fields correctly', () => {
    render(
      <DynamicForm
        configFormValues={configFormValues}
        form={mockFormReturn}
        onSubmit={onSubmit}
      />,
    );

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('required_title')).toBeInTheDocument();
    expect(screen.getAllByText('InputRow')).toHaveLength(2);
  });

  it('should hide fields based on locale and config', () => {
    (isHidenNameAlp as jest.Mock).mockReturnValueOnce(true);
    render(
      <DynamicForm
        configFormValues={configFormValues}
        form={mockFormReturn}
        onSubmit={onSubmit}
      />,
    );
    expect(screen.queryByText('name')).not.toBeInTheDocument();
  });
});
