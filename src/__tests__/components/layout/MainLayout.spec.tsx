import MainLayout from '@/components/layout/MainLayout';
import { useAlertStore, usePendingAlertStore } from '@/stores';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/layout/Header', () => ({
  __esModule: true,
  default: () => <div>Mock Header</div>,
}));
jest.mock('@/components/layout/Footer', () => ({
  __esModule: true,
  default: () => <div>Mock Footer</div>,
}));

jest.mock('@/components/notification', () => ({
  __esModule: true,
  Alert: ({
    title,
    show,
    type,
  }: {
    title: React.ReactNode;
    show: boolean;
    type: string;
  }) => (show ? <div>{`Alert: ${type} - ${title}`}</div> : null),
  PendingAlert: ({ show }: { show: boolean }) =>
    show ? <div>PendingAlert</div> : null,
}));

jest.mock('@/components/Translation', () => ({
  __esModule: true,
  default: ({
    translationKey,
    render,
  }: {
    translationKey: string;
    render: any;
  }) => <>{render((key: string) => `${translationKey}.${key}`)}</>,
}));

jest.mock('@/stores', () => ({
  useAlertStore: jest.fn(),
  usePendingAlertStore: jest.fn(),
}));

describe('MainLayout', () => {
  beforeEach(() => {
    (useAlertStore as any as jest.Mock).mockReturnValue({
      title: 'Alert Title',
      show: true,
      type: 'warning',
      translationKey: 'alert_translation_key',
      rootTranslationKey: 'root_translation_key',
    });
    (usePendingAlertStore as any as jest.Mock).mockReturnValue({
      show: true,
    });
  });

  it('should render the main layout with header, footer, alert, and pending alert', () => {
    render(<MainLayout>Content</MainLayout>);

    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText('Mock Footer')).toBeInTheDocument();
  });
});
