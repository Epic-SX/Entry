import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CompletedStep from '@/app/[locale]/(guest)/tours/regist/_component/step/CompletedStep';

jest.mock('@/components', () => ({
  Translation: ({
    translationKey,
    render,
  }: {
    translationKey: string;
    render: any;
  }) => <>{render((key: string) => `${translationKey}.${key}`)}</>,
}));

describe('CompletedStep', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders CompletedStep component correctly', () => {
    render(<CompletedStep onBack={mockOnBack} />);

    expect(
      screen.getByText('Pages.tours.regist_completed_message'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('ButtonTitle.return_to_site_btn'),
    ).toBeInTheDocument();
  });

  it('calls onBack when the button is clicked', () => {
    render(<CompletedStep onBack={mockOnBack} />);

    const button = screen.getByText('ButtonTitle.return_to_site_btn');
    fireEvent.click(button);

    expect(mockOnBack).toHaveBeenCalled();
  });
});
