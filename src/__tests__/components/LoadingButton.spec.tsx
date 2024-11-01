import LoadingButton from '@/components/LoadingButton';
import { render, screen } from '@testing-library/react';

describe('LoadingButton', () => {
  it('should render with default label', () => {
    render(<LoadingButton />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Loading...');
    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render with custom label', () => {
    const customLabel = 'Please wait';
    render(<LoadingButton label={customLabel} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(customLabel);
    expect(screen.getByRole('status')).toHaveTextContent(customLabel);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render with custom class', () => {
    const customClass = 'custom-class';
    render(<LoadingButton className={customClass} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('btn btn-primary');
    expect(screen.getByRole('button')).toHaveClass(customClass);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
