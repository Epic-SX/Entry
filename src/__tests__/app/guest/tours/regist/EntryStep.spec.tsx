import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, UseFormReturn } from 'react-hook-form';
import EntryStep from '@/app/[locale]/(guest)/tours/regist/_component/step/EntryStep';
import { TTourRegistRequest } from '@/schemas';

jest.mock('@/components', () => ({
  Translation: ({
    translationKey,
    render,
  }: {
    translationKey: string;
    render: any;
  }) => <>{render((key: string) => `${translationKey}.${key}`)}</>,
}));

jest.mock('@/components/form/dynamic', () => ({
  DynamicForm: ({ configFormValues, form, onSubmit, formAction }: any) => (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>{JSON.stringify(configFormValues)}</div>
      <div>{JSON.stringify(form)}</div>
      <div>{formAction}</div>
    </form>
  ),
}));

describe('EntryStep', () => {
  let mockForm: UseFormReturn<TTourRegistRequest, any>;
  const mockOnConfirm = jest.fn();
  const mockOnResetForm = jest.fn();
  const mockConfigFormValues = { someKey: 'someValue' };

  const MockComponent = () => {
    mockForm = useForm<TTourRegistRequest>();
    return (
      <EntryStep
        configFormValues={mockConfigFormValues}
        form={mockForm}
        onConfirm={mockOnConfirm}
        onResetForm={mockOnResetForm}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders EntryStep component correctly', () => {
    render(<MockComponent />);

    expect(screen.getByText('{"someKey":"someValue"}')).toBeInTheDocument();
    expect(screen.getByText('ButtonTitle.reset_form_btn')).toBeInTheDocument();
    expect(screen.getByText('ButtonTitle.go_to_confirmation_screen_btn')).toBeInTheDocument();
  });

  it('calls onResetForm when the reset button is clicked', () => {
    render(<MockComponent />);

    const resetButton = screen.getByText('ButtonTitle.reset_form_btn');
    fireEvent.click(resetButton);

    expect(mockOnResetForm).toHaveBeenCalled();
  });
});
