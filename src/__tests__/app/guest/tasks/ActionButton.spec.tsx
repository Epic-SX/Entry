import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButton from '@/app/[locale]/(guest)/tasks/_components/ActionButton';

describe('ActionButton', () => {
  const mockOnBack = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with string labels', () => {
    render(
      <ActionButton
        backLabel="Back"
        confirmLabel="Confirm"
        onBack={mockOnBack}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('renders correctly with React node labels', () => {
    render(
      <ActionButton
        backLabel={<span>Back</span>}
        confirmLabel={<span>Confirm</span>}
        onBack={mockOnBack}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('calls onBack when the back button is clicked', () => {
    render(
      <ActionButton
        backLabel="Back"
        confirmLabel="Confirm"
        onBack={mockOnBack}
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByText('Back'));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('calls onConfirm when the confirm button is clicked', () => {
    render(
      <ActionButton
        backLabel="Back"
        confirmLabel="Confirm"
        onBack={mockOnBack}
        onConfirm={mockOnConfirm}
      />,
    );

    fireEvent.click(screen.getByText('Confirm'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
