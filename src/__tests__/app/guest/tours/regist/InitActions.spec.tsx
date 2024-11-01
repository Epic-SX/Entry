import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InitActions from '@/app/[locale]/(guest)/tours/regist/_component/InitActions';

jest.mock('@/components', () => ({
  Translation: ({
    translationKey,
    render,
  }: {
    translationKey: string;
    render: any;
  }) => <>{render((key: string) => `${translationKey}.${key}`)}</>,
  DownLineList: ({
    line,
    render,
  }: {
    line: string;
    render: (line: string) => React.ReactNode;
  }) => <>{render(line)}</>,
}));

describe('InitActions', () => {
  const mockOnOpenForm = jest.fn();
  const mockOnOpenModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders InitActions component correctly', () => {
    render(
      <InitActions onOpenForm={mockOnOpenForm} onOpenModal={mockOnOpenModal} />,
    );

    expect(
      screen.getByText('Pages.tours.tour_description'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('ButtonTitle.for_first_time_applicants_btn'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('ButtonTitle.those_who_have_already_applied_btn'),
    ).toBeInTheDocument();
  });

  it('calls onOpenForm when the first-time applicants button is clicked', () => {
    render(
      <InitActions onOpenForm={mockOnOpenForm} onOpenModal={mockOnOpenModal} />,
    );

    const firstTimeButton = screen.getByText(
      'ButtonTitle.for_first_time_applicants_btn',
    );
    fireEvent.click(firstTimeButton);

    expect(mockOnOpenForm).toHaveBeenCalled();
  });

  it('calls onOpenModal when the already applied button is clicked', () => {
    render(
      <InitActions onOpenForm={mockOnOpenForm} onOpenModal={mockOnOpenModal} />,
    );

    const alreadyAppliedButton = screen.getByText(
      'ButtonTitle.those_who_have_already_applied_btn',
    );
    fireEvent.click(alreadyAppliedButton);

    expect(mockOnOpenModal).toHaveBeenCalled();
  });
});
