import { Alert } from '@/components/notification';
import { useAlertStore } from '@/stores';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/stores', () => ({
  useAlertStore: jest.fn(),
}));

describe('Alert', () => {
  beforeEach(() => {
    (useAlertStore as any as jest.Mock).mockReturnValue({
      hideAlert: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when show is false', () => {
    render(<Alert title="Test Alert" type="info" show={false} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should render alert with correct class and title', () => {
    render(<Alert title="Test Alert" type="info" show={true} />);
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveClass('alert-info');
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
  });

  it('should call hideAlert on close button click', () => {
    const hideAlertMock = jest.fn();
    (useAlertStore as any as jest.Mock).mockReturnValue({
      hideAlert: hideAlertMock,
    });

    render(<Alert title="Test Alert" type="info" show={true} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(hideAlertMock).toHaveBeenCalledTimes(1);
  });
});
