import Header from '@/components/layout/Header';
import { render, screen } from '@testing-library/react';

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

jest.mock('@/components/layout/MainMenu', () => ({
  __esModule: true,
  default: () => <div>MainMenu</div>,
}));

jest.mock('@/components/layout/RightMenu', () => ({
  __esModule: true,
  default: () => <div>RightMenu</div>,
}));

jest.mock('@/components/NavigationLink', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('Header', () => {
  it('should render the header with correct content', () => {
    render(<Header />);

    expect(screen.getByText('MainMenu')).toBeInTheDocument();
    expect(screen.getByText('RightMenu')).toBeInTheDocument();
  });
});
