import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmActions from '@/app/[locale]/(guest)/entries/_components/ConfirmActions';

jest.mock('@/components', () => ({
  Translation: ({
    render,
  }: {
    translationKey: string;
    render: (t: (id: string) => string) => React.ReactNode;
  }) => <div>{render((key) => key)}</div>,
  LoadingButton: ({ label }: { label: React.ReactNode }) => (
    <button>{label}</button>
  ),
}));

describe('ConfirmActions', () => {
  const mockDecrementStep = jest.fn();
  const mockOnCheckout = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with isCheckoutLoading=false', () => {
    render(
      <ConfirmActions
        isCheckoutLoading={false}
        decrementStep={mockDecrementStep}
        onCheckout={mockOnCheckout}
      />,
    );

    expect(
      screen.getByText('returns_to_the_input_screen_btn'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('go_to_credit_card_payment_screen_btn'),
    ).toBeInTheDocument();
  });

  it('renders correctly with isCheckoutLoading=true', () => {
    render(
      <ConfirmActions
        isCheckoutLoading={true}
        decrementStep={mockDecrementStep}
        onCheckout={mockOnCheckout}
      />,
    );

    expect(
      screen.getByText('returns_to_the_input_screen_btn'),
    ).toBeInTheDocument();
    expect(screen.getByText('processing...')).toBeInTheDocument();
  });

  it('calls decrementStep when the back button is clicked', () => {
    render(
      <ConfirmActions
        isCheckoutLoading={false}
        decrementStep={mockDecrementStep}
        onCheckout={mockOnCheckout}
      />,
    );

    const backButton = screen.getByText('returns_to_the_input_screen_btn');
    fireEvent.click(backButton);

    expect(mockDecrementStep).toHaveBeenCalledTimes(1);
  });

  it('calls onCheckout when the checkout button is clicked', () => {
    render(
      <ConfirmActions
        isCheckoutLoading={false}
        decrementStep={mockDecrementStep}
        onCheckout={mockOnCheckout}
      />,
    );

    const checkoutButton = screen.getByText(
      'go_to_credit_card_payment_screen_btn',
    );
    fireEvent.click(checkoutButton);

    expect(mockOnCheckout).toHaveBeenCalledTimes(1);
  });
});
