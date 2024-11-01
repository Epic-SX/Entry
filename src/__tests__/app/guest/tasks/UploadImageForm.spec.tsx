import React from 'react';
import { render, screen } from '@testing-library/react';
import { UseFormReturn } from 'react-hook-form';
import UploadImageForm from '@/app/[locale]/(guest)/tasks/_components/UploadImageForm';

jest.mock('@/components/Translation', () => ({
  __esModule: true,
  default: ({ render }: { translationKey: string; render: any }) => (
    <>{render((key: string) => key)}</>
  ),
}));

jest.mock('@/components/form/dynamic', () => ({
  __esModule: true,
  TranslationErrorMessage: ({ errorKey }: { errorKey: string }) => (
    <div>{errorKey}</div>
  ),
}));

describe('UploadImageForm', () => {
  const mockForm: UseFormReturn<any> = {
    register: jest.fn(),
    handleSubmit: jest.fn(),
    watch: jest.fn(),
    setValue: jest.fn(),
    getValues: jest.fn(),
    reset: jest.fn(),
    trigger: jest.fn(),
    control: {} as any,
    formState: {
      errors: {},
    },
  } as unknown as UseFormReturn<any>;

  const defaultProps = {
    form: mockForm,
    photoName: 'testPhoto',
  };

  it('renders correctly', () => {
    render(<UploadImageForm {...defaultProps} />);

    expect(
      screen.getByText('photo_upload_modal_content_title'),
    ).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    const errorForm = {
      ...mockForm,
      formState: {
        errors: {
          testPhoto: { message: 'Error message' },
        },
      },
    } as unknown as UseFormReturn<any>;

    render(<UploadImageForm {...defaultProps} form={errorForm} />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('calls form register method', () => {
    render(<UploadImageForm {...defaultProps} />);

    expect(mockForm.register).toHaveBeenCalledWith('testPhoto');
  });
});
