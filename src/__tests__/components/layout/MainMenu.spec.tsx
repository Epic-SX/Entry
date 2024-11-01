import MainMenu from '@/components/layout/MainMenu';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/ProtectedLink', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/NavigationLink', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} className="nav-link text-light text-nowrap">
      {children}
    </a>
  ),
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

jest.mock('@/navigation', () => ({
  __esModule: true,
  usePathname: jest.fn().mockReturnValue('/current-path'),
}));

describe('MainMenu', () => {
  it('should render an empty ListMenu if no items are provided', () => {
    jest.mock('@/constants', () => ({
      menuItems: [],
    }));

    render(<MainMenu />);

    const navItems = screen.queryAllByRole('listitem');
    expect(navItems.length).toBe(0);
  });
});
