import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { TSendMail } from '@/types';
import SendMailModal from '@/app/[locale]/(protected)/schedules/_components/SendMailModal';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(),
}));

const mockUseForm = useForm as jest.MockedFunction<typeof useForm>;

const mockSendMailTarget: TSendMail & { guardian_name: string } = {
  tours_guardian_id: 1,
  guardian_email: 'guardian@example.com',
  guardian_name: 'Guardian Name',
};

const mockProps = {
  show: true,
  sendMailTarget: mockSendMailTarget,
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe('SendMailModal', () => {
  beforeEach(() => {
    mockUseForm.mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
      setValue: jest.fn(),
      reset: jest.fn(),
      getValues: jest.fn(() => 'guardian@example.com'),
    } as any);
  });

  it('renders modal with the correct content', () => {
    render(<SendMailModal {...mockProps} />);

    expect(screen.getByText('考査お申込みURLメール送信')).toBeInTheDocument();
  });

  it('calls onConfirm with the correct email on confirm button click', async () => {
    render(<SendMailModal {...mockProps} />);

    const confirmButton = screen.getByText('メール送信');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockProps.onConfirm).toHaveBeenCalledWith('guardian@example.com');
    });
  });

  it('calls onCancel and resets the form on cancel button click', async () => {
    render(<SendMailModal {...mockProps} />);

    const cancelButton = screen.getByText('キャンセル');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockProps.onCancel).toHaveBeenCalled();
    });
  });

  it('disables the confirm button when the email field has an error', () => {
    mockUseForm.mockReturnValue({
      ...mockUseForm(),
      formState: {
        errors: {
          mail: {
            message: 'Invalid email',
          },
        },
      },
    } as any);

    render(<SendMailModal {...mockProps} />);

    const confirmButton = screen.getByText('メール送信');
    expect(confirmButton).toBeDisabled();
  });

  it('displays the error message for invalid email', () => {
    mockUseForm.mockReturnValue({
      ...mockUseForm(),
      formState: {
        errors: {
          mail: {
            message: 'Invalid email',
          },
        },
      },
    } as any);

    render(<SendMailModal {...mockProps} />);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
