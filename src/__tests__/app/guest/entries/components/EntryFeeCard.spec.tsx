import React from 'react';
import { render, screen } from '@testing-library/react';
import { config } from '@/constants';
import EntryFeeCard from '@/app/[locale]/(guest)/entries/_components/EntryFeeCard';

jest.mock('@/components', () => ({
  Translation: ({
    render,
  }: {
    translationKey: string;
    render: (t: (id: string) => string) => React.ReactNode;
  }) => <div>{render((key) => key)}</div>,
}));

describe('EntryFeeCard', () => {
  it('renders correctly', () => {
    render(<EntryFeeCard />);

    expect(screen.getAllByText('examination_fee').length).toBeGreaterThan(0);
    expect(screen.getByText(':')).toBeInTheDocument();
    expect(screen.getByText(`¥${config.exam_price}`)).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('tax_included')).toBeInTheDocument();
    expect(screen.getByText('examination_fee_note')).toBeInTheDocument();
  });
});
