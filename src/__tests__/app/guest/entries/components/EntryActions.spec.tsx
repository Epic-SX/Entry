import React from 'react';
import { render, screen } from '@testing-library/react';
import EntryActions from '@/app/[locale]/(guest)/entries/_components/EntryActions';

jest.mock('@/components', () => ({
  Translation: ({
    render,
  }: {
    translationKey: string;
    render: (t: (id: string) => string) => React.ReactNode;
  }) => <div>{render((key) => key)}</div>,
}));

describe('EntryActions', () => {
  it('renders correctly', () => {
    render(<EntryActions />);

    expect(
      screen.getByText('go_to_confirmation_screen_btn'),
    ).toBeInTheDocument();
  });
});
