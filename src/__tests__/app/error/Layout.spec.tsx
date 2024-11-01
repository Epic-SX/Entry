import Layout from '@/app/[locale]/error/layout';
import { useAlertStore } from '@/stores';
import { render, screen } from '@testing-library/react';

jest.mock('@/stores', () => ({
  useAlertStore: jest.fn(),
}));

jest.mock('@/components/layout', () => ({
  ErrorLayout: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('@/components/notification', () => ({
  Alert: ({ title, show, type }: any) => (
    <div data-testid="alert">
      {show && (
        <div>
          <p>{title}</p>
          <p>{type}</p>
        </div>
      )}
    </div>
  ),
}));

describe('Layout Component', () => {
  it('renders children correctly', () => {
    const mockAlertStore = {
      title: 'Test Alert',
      show: true,
      type: 'error',
    };
    (useAlertStore as any as jest.Mock).mockReturnValue(mockAlertStore);

    render(
      <Layout>
        <div data-testid="child">Child Component</div>
      </Layout>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('alert')).toBeInTheDocument();
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('does not render alert when show is false', () => {
    const mockAlertStore = {
      title: 'Test Alert',
      show: false,
      type: 'error',
    };
    (useAlertStore as any as jest.Mock).mockReturnValue(mockAlertStore);

    render(
      <Layout>
        <div data-testid="child">Child Component</div>
      </Layout>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByText('Test Alert')).not.toBeInTheDocument();
    expect(screen.queryByText('error')).not.toBeInTheDocument();
  });
});
