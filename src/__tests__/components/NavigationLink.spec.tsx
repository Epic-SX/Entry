import NavigationLink from '@/components/NavigationLink';
import { render, screen } from '@testing-library/react';
import { useSelectedLayoutSegment } from 'next/navigation';

jest.mock('@/navigation', () => ({
  Link: jest.fn(({ children, ...props }) => <a {...props}>{children}</a>),
}));

jest.mock('next/navigation', () => ({
  useSelectedLayoutSegment: jest.fn(),
}));

describe('NavigationLink', () => {
  const mockUseSelectedLayoutSegment = useSelectedLayoutSegment as jest.Mock;

  it('should render the link with correct href', () => {
    mockUseSelectedLayoutSegment.mockReturnValue(null);
    render(<NavigationLink href="/test">Test Link</NavigationLink>);

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test');
  });

  it('should set aria-current to "page" if the link is active', () => {
    mockUseSelectedLayoutSegment.mockReturnValue('test');
    render(<NavigationLink href="/test">Test Link</NavigationLink>);

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveAttribute('aria-current', 'page');
    expect(linkElement).toHaveClass('active');
  });

  it('should not set aria-current if the link is not active', () => {
    mockUseSelectedLayoutSegment.mockReturnValue('other');
    render(<NavigationLink href="/test">Test Link</NavigationLink>);

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).not.toHaveAttribute('aria-current');
    expect(linkElement).not.toHaveClass('active');
  });
});
