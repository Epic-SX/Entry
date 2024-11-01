import ErrorMessage from '@/components/form/ErrorMessage';
import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('ErrorMessage', () => {
  it('should render null if no errorMessage is provided', () => {
    render(<ErrorMessage />);
    const errorMessageElement = screen.queryByText(/./);
    expect(errorMessageElement).not.toBeInTheDocument();
  });

  it('should render the error message if provided', () => {
    const errorMessage = 'This is an error';
    render(<ErrorMessage errorMessage={errorMessage} />);
    const errorMessageElement = screen.getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveClass('text-danger');
    expect(errorMessageElement).toHaveClass('fst-italic');
  });

  it('should render a translated required_general message if the error message is "Expected string, received null"', () => {
    const mockTranslation = 'Field is required';
    (useTranslations as jest.Mock).mockReturnValue(() => mockTranslation);

    render(<ErrorMessage errorMessage="Expected string, received null" />);
    const translatedMessageElement = screen.getByText(mockTranslation);
    expect(translatedMessageElement).toBeInTheDocument();
    expect(translatedMessageElement).toHaveClass('text-danger');
    expect(translatedMessageElement).toHaveClass('fst-italic');
  });

});
