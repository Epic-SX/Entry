import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import Checkbox from '@/components/form/dynamic/Checkbox';

jest.mock('@/components/form/dynamic/TranslationErrorMessage', () => {
  const MockTranslationErrorMessage = ({ errorKey }: { errorKey: string }) => (
    <div data-testid="error-message">{errorKey}</div>
  );
  MockTranslationErrorMessage.displayName = 'MockTranslationErrorMessage';
  return MockTranslationErrorMessage;
});

describe('Checkbox', () => {
  let mockFormReturn: ReturnType<typeof useForm>;

  beforeEach(() => {
    mockFormReturn = {
      register: jest.fn(),
      formState: {
        errors: {},
      },
      handleSubmit: jest.fn(),
      setValue: jest.fn(),
      getValues: jest.fn(),
      watch: jest.fn(),
      reset: jest.fn(),
      trigger: jest.fn(),
      control: {},
      clearErrors: jest.fn(),
      setError: jest.fn(),
      unregister: jest.fn(),
    } as unknown as ReturnType<typeof useForm>;
  });

  const config = {
    name: 'testCheckbox',
    default: 'option1',
    options: {
      option1: 'Option 1',
      option2: 'Option 2',
    },
  };

  it('should render checkbox options correctly', () => {
    render(
      <Checkbox
        form={mockFormReturn as any}
        config={config}
        errorMessage={''}
      />,
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should display the error message when there is an error', () => {
    const errorMessage = 'This field is required';
    render(
      <Checkbox
        form={mockFormReturn as any}
        config={config}
        errorMessage={errorMessage}
      />,
    );

    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
  });
});
