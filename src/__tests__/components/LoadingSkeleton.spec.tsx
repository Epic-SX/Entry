import LoadingSkeleton from '@/components/LoadingSkeleton';
import { render, screen } from '@testing-library/react';
import Skeleton from 'react-loading-skeleton';

jest.mock('react-loading-skeleton', () => {
  return jest.fn(() => <div data-testid="skeleton"></div>);
});

describe('LoadingSkeleton', () => {
  it('should render the Skeleton component', () => {
    render(<LoadingSkeleton />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('should pass props to the Skeleton component', () => {
    const height = 50;
    const width = 100;

    render(<LoadingSkeleton height={height} width={width} />);

    expect(Skeleton).toHaveBeenCalledWith(
      expect.objectContaining({ height, width }),
      {},
    );
  });

  it('should render multiple Skeleton components when count prop is provided', () => {
    const count = 3;

    render(<LoadingSkeleton count={count} />);

    expect(Skeleton).toHaveBeenCalledWith(
      expect.objectContaining({ count }),
      {},
    );
  });

  it('should render Skeleton with default props if none are provided', () => {
    render(<LoadingSkeleton />);

    expect(Skeleton).toHaveBeenCalledWith({}, {});
  });
});
