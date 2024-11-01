import ConfirmForm from '@/components/form/dynamic/ConfirmForm';
import { isHidenNameAlp } from '@/libs';
import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}));

jest.mock('@/components/Translation', () => {
  return ({ translationKey, render }: any) => render((key: string) => key);
});

jest.mock('@/libs', () => ({
  isHidenNameAlp: jest.fn().mockReturnValue(false),
}));

describe('ConfirmForm', () => {
  let mockFormReturn: ReturnType<typeof useForm>;

  beforeEach(() => {
    (useLocale as jest.Mock).mockReturnValue('en');
    mockFormReturn = {
      getValues: jest.fn((name) => {
        const values: Record<string, any> = {
          first_name: 'John',
          last_name: 'Doe',
          name: 'John Doe',
          select: 'option1',
          checkbox: ['option1', 'option2'],
          radio: 'option1',
          password: 'password',
        };
        return values[name];
      }),
      register: jest.fn(),
      formState: {
        errors: {},
      },
      handleSubmit: jest.fn(),
      setValue: jest.fn(),
      watch: jest.fn(),
      reset: jest.fn(),
      trigger: jest.fn(),
      control: {},
      clearErrors: jest.fn(),
      setError: jest.fn(),
      unregister: jest.fn(),
    } as unknown as ReturnType<typeof useForm>;
  });

  const configFormValues = [
    { name: 'name', type: 'name', label: 'Name' },
    {
      name: 'select',
      type: 'select',
      options: { option1: 'Option 1', option2: 'Option 2' },
      label: 'Select',
    },
    {
      name: 'checkbox',
      type: 'checkbox',
      options: { option1: 'Option 1', option2: 'Option 2' },
      label: 'Checkbox',
    },
    {
      name: 'radio',
      type: 'radio',
      options: { option1: 'Option 1', option2: 'Option 2' },
      label: 'Radio',
    },
    { name: 'password', type: 'password', label: 'Password' },
  ];

  it('should render form fields correctly', () => {
    render(
      <ConfirmForm
        configFormValues={configFormValues}
        form={mockFormReturn as any}
        actions={null}
      />,
    );

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('select')).toBeInTheDocument();
    expect(screen.getByText('checkbox')).toBeInTheDocument();
    expect(screen.getByText('radio')).toBeInTheDocument();
    expect(screen.getByText('password')).toBeInTheDocument();

    expect(screen.getByText('Doe John')).toBeInTheDocument();
    expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();
    expect(screen.getByText('********')).toBeInTheDocument();
  });

  it('should hide fields based on locale and config', () => {
    (isHidenNameAlp as jest.Mock).mockReturnValue(true);
    render(
      <ConfirmForm
        configFormValues={configFormValues}
        form={mockFormReturn as any}
        actions={null}
      />,
    );
    expect(screen.queryByText('name')).not.toBeInTheDocument();
    expect(screen.queryByText('select')).not.toBeInTheDocument();
  });

  it('should render actions correctly', () => {
    render(
      <ConfirmForm
        configFormValues={configFormValues}
        form={mockFormReturn as any}
        actions={<div>Actions</div>}
      />,
    );

    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
