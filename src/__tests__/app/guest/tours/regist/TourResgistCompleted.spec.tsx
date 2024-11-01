import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import TourResgistCompleted from '@/app/[locale]/(guest)/tours/regist/complete/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/[locale]/(guest)/tours/regist/_component/step', () => ({
  CompletedStep: ({ onBack }: { onBack: () => void }) => (
    <button onClick={onBack}>CompletedStep Button</button>
  ),
}));

describe('TourResgistCompleted', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders TourResgistCompleted component correctly', () => {
    render(<TourResgistCompleted />);

    expect(screen.getByText('CompletedStep Button')).toBeInTheDocument();
  });

  it('calls router.push("/") when the CompletedStep button is clicked', () => {
    render(<TourResgistCompleted />);

    const button = screen.getByText('CompletedStep Button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
