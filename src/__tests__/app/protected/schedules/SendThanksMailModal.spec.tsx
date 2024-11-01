import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SendThanksMailModal from '@/app/[locale]/(protected)/schedules/_components/SendThanksMailModal';

const mockProps = {
  show: true,
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe('SendThanksMailModal', () => {
  it('renders modal with the correct content', () => {
    render(<SendThanksMailModal {...mockProps} />);

    expect(screen.getByText('お礼メール送信')).toBeInTheDocument();
    expect(
      screen.getByText('お礼メールを一括送信します。'),
    ).toBeInTheDocument();
    expect(screen.getByText('よろしいですか？')).toBeInTheDocument();
  });

  it('calls onConfirm when the confirm button is clicked', () => {
    render(<SendThanksMailModal {...mockProps} />);

    const confirmButton = screen.getByText('送信');
    fireEvent.click(confirmButton);

    expect(mockProps.onConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(<SendThanksMailModal {...mockProps} />);

    const cancelButton = screen.getByText('キャンセル');
    fireEvent.click(cancelButton);

    expect(mockProps.onCancel).toHaveBeenCalled();
  });
});
