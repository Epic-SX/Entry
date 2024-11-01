import { render, screen } from '@testing-library/react';
import ErrorLayout from '@/components/layout/ErrorLayout';

jest.mock('@/components/layout/Header', () => ({
  __esModule: true,
  default: () => <div>Mock Header</div>,
}));

jest.mock('@/components/layout/Footer', () => ({
  __esModule: true,
  default: () => <div>Mock Footer</div>,
}));

describe('ErrorLayout', () => {
  it('should render Header, Footer, and children correctly', () => {
    render(<ErrorLayout>Child Content</ErrorLayout>);
    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText('Mock Footer')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
