import Footer from '@/components/layout/Footer';
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

describe('Footer', () => {
  it('should render the footer with correct content', () => {
    render(<Footer />);

    expect(screen.getByText('HeaderTitle.title')).toBeInTheDocument();
    expect(screen.getByText('copyright(c) 2020-2024')).toBeInTheDocument();
  });
});
