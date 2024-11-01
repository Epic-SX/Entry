import HtmlText from '@/components/form/dynamic/HtmlText';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/Translation', () => {
  return ({ translationKey, render }: any) => render((key: string) => key);
});

describe('HtmlText', () => {
  const config = { html: 'example_html_key' };
  it('should render the translated HTML text', () => {
    render(<HtmlText config={config} />);
    expect(screen.getByText('example_html_key')).toBeInTheDocument();
  });

  it('should render the HTML text with appropriate styling', () => {
    render(<HtmlText config={config} />);
    const smallElement = screen.getByText('example_html_key');
    expect(smallElement).toHaveClass('text-secondary');
    expect(smallElement.tagName.toLowerCase()).toBe('small');
  });
});
