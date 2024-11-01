import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import ConfirmStep from '@/app/[locale]/(guest)/tours/regist/_component/step/ConfirmStep';

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
  ConfirmForm: ({ configFormValues, form, actions }: any) => (
    <div>
      <div>{JSON.stringify(configFormValues)}</div>
      <div>{JSON.stringify(form)}</div>
      <div>{actions}</div>
    </div>
  ),
}));

describe('ConfirmStep', () => {
  const mockOnDecrementStep = jest.fn();
  const mockOnRegister = jest.fn();
  const mockConfigFormValues = { someKey: 'someValue' };

  const MockComponent = () => {
    const mockForm = useForm();
    return (
      <ConfirmStep
        configFormValues={mockConfigFormValues}
        form={mockForm}
        onDecrementStep={mockOnDecrementStep}
        onRegister={mockOnRegister}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ConfirmStep component correctly', () => {
    render(<MockComponent />);

    expect(screen.getByText('{"someKey":"someValue"}')).toBeInTheDocument();
    expect(
      screen.getByText('ButtonTitle.returns_to_the_input_screen_btn'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('ButtonTitle.regist_completed_btn'),
    ).toBeInTheDocument();
  });

  it('calls onDecrementStep when the back button is clicked', () => {
    render(<MockComponent />);

    const backButton = screen.getByText(
      'ButtonTitle.returns_to_the_input_screen_btn',
    );
    fireEvent.click(backButton);

    expect(mockOnDecrementStep).toHaveBeenCalled();
  });

  it('calls onRegister when the register button is clicked', () => {
    render(<MockComponent />);

    const registerButton = screen.getByText('ButtonTitle.regist_completed_btn');
    fireEvent.click(registerButton);

    expect(mockOnRegister).toHaveBeenCalled();
  });
});
