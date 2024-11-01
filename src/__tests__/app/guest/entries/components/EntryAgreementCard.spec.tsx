import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import EntryAgreementCard from '@/app/[locale]/(guest)/entries/_components/EntryAgreementCard';

jest.mock('@/components', () => ({
  Translation: ({
    render,
  }: {
    translationKey: string;
    render: (t: (id: string) => string) => React.ReactNode;
  }) => <div>{render((key) => key)}</div>,
}));

jest.mock('@/app/[locale]/(guest)/entries/_components/AdditionalForm', () => ({
  __esModule: true,
  default: () => <div>Mocked AdditionalForm</div>,
}));
const MockEntryAgreementCard = () => {
  const mockForm = useForm();

  return (
    <EntryAgreementCard
      form={mockForm}
      additionalFormValues={{ someValue: 'test' }}
      pdf_url="http://example.com/pdf"
    />
  );
};

describe('EntryAgreementCard', () => {
  it('renders correctly', () => {
    render(<MockEntryAgreementCard />);

    expect(
      screen.getByText('pledge_with_examination_entry_title'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('pledge_with_examination_entry_note'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('pledge_with_examination_entry_link'),
    ).toBeInTheDocument();
    expect(screen.getByText('Mocked AdditionalForm')).toBeInTheDocument();

    const link = screen.getByRole('link', {
      name: 'pledge_with_examination_entry_link',
    });
    expect(link).toHaveAttribute('href', 'http://example.com/pdf');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
