import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SendVacancyMailModal from '@/app/[locale]/(protected)/schedules/_components/SendVacancyMailModal';

const mockProps = {
  show: true,
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe('SendVacancyMailModal', () => {
  it('renders modal with the correct content', () => {
    render(<SendVacancyMailModal {...mockProps} />);

    expect(screen.getByText('空席連絡メール送信')).toBeInTheDocument();
    expect(
      screen.getByText(
        '空席ができたことをお知らせするメールを一括送信します。',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('よろしいですか？')).toBeInTheDocument();
  });

  it('calls onConfirm when the confirm button is clicked', () => {
    render(<SendVacancyMailModal {...mockProps} />);

    const confirmButton = screen.getByText('送信');
    fireEvent.click(confirmButton);

    expect(mockProps.onConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(<SendVacancyMailModal {...mockProps} />);

    const cancelButton = screen.getByText('キャンセル');
    fireEvent.click(cancelButton);

    expect(mockProps.onCancel).toHaveBeenCalled();
  });
});
