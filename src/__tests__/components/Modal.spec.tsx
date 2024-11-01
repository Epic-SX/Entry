import Modal from '@/components/Modal';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Modal', () => {
  const defaultProps = {
    title: 'Test Title',
    show: true,
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  it('should render correctly when show is true', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('キャンセル')).toBeInTheDocument();
    expect(screen.getByText('確認')).toBeInTheDocument();
  });

  it('should not render when show is false', () => {
    render(<Modal {...defaultProps} show={false} />);

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('should call onConfirm when the confirm button is clicked', () => {
    render(<Modal {...defaultProps} />);

    const confirmButton = screen.getByText('確認');
    fireEvent.click(confirmButton);

    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('should call onCancel when the cancel button is clicked', () => {
    render(<Modal {...defaultProps} />);

    const cancelButton = screen.getByText('キャンセル');
    fireEvent.click(cancelButton);

    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it('should disable the cancel button when disableCancel is true', () => {
    render(<Modal {...defaultProps} disableCancel={true} />);

    const cancelButton = screen.getByText('キャンセル');
    expect(cancelButton).toBeDisabled();
  });

  it('should disable the confirm button when disableConfirm is true', () => {
    render(<Modal {...defaultProps} disableConfirm={true} />);

    const confirmButton = screen.getByText('確認');
    expect(confirmButton).toBeDisabled();
  });

  it('should render custom content correctly', () => {
    const customContent = <div>Custom Content</div>;
    render(<Modal {...defaultProps} content={customContent} />);

    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });
});
