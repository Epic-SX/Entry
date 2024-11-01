import React from 'react';
import { render, screen } from '@testing-library/react';
import { config } from '@/constants';
import ConfirmFeeCard from '@/app/[locale]/(guest)/entries/_components/ConfirmFeeCard';

jest.mock('@/components', () => ({
  Translation: ({
    render,
  }: {
    translationKey: string;
    render: (t: (id: string, options?: any) => string) => React.ReactNode;
  }) => (
    <div>
      {render((key, options) => {
        if (key === 'examination_fee') return 'Examination Fee';
        if (key === 'the_payment_amount_is')
          return `The payment amount is ${options.amount}`;
        if (key === 'credit_card_on_the_next_screen')
          return 'Credit card on the next screen';
        return key;
      })}
    </div>
  ),
}));

describe('ConfirmFeeCard', () => {
  it('renders correctly', () => {
    render(<ConfirmFeeCard />);

    expect(screen.getByText('Examination Fee')).toBeInTheDocument();
    expect(
      screen.getByText(`The payment amount is ${config.exam_price}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Credit card on the next screen'),
    ).toBeInTheDocument();
  });
});
