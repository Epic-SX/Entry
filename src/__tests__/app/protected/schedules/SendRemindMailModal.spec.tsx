import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SendRemindMailModal from '@/app/[locale]/(protected)/schedules/_components/SendRemindMailModal';

const mockProps = {
  show: true,
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe('SendRemindMailModal', () => {
  it('renders modal with the correct content', () => {
    render(<SendRemindMailModal {...mockProps} />);

    expect(screen.getByText('リマインドメール送信')).toBeInTheDocument();
    expect(
      screen.getByText('リマインドメールを一括送信します。'),
    ).toBeInTheDocument();
    expect(screen.getByText('よろしいですか？')).toBeInTheDocument();
  });

  it('calls onConfirm when the confirm button is clicked', () => {
    render(<SendRemindMailModal {...mockProps} />);

    const confirmButton = screen.getByText('送信');
    fireEvent.click(confirmButton);

    expect(mockProps.onConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(<SendRemindMailModal {...mockProps} />);

    const cancelButton = screen.getByText('キャンセル');
    fireEvent.click(cancelButton);

    expect(mockProps.onCancel).toHaveBeenCalled();
  });
});
