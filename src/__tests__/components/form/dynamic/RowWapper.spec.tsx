import RowWapper from '@/components/form/dynamic/RowWapper';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/Translation', () => {
  return ({ render }: any) => render((key: string) => key);
});

describe('RowWapper', () => {
  it('should render children correctly', () => {
    render(
      <RowWapper>
        <div data-testid="child">Child Content</div>
      </RowWapper>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('should render note if config contains note', () => {
    const config = { note: 'This is a note' };
    render(
      <RowWapper config={config}>
        <div>Child Content</div>
      </RowWapper>,
    );

    expect(screen.getByText('This is a note')).toBeInTheDocument();
  });

  it('should not render note if config does not contain note', () => {
    render(
      <RowWapper>
        <div>Child Content</div>
      </RowWapper>,
    );

    expect(screen.queryByText('This is a note')).not.toBeInTheDocument();
  });
});
