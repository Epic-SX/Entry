import TranslationErrorMessage from '@/components/form/dynamic/TranslationErrorMessage';
import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/components/form/ErrorMessage', () => ({
  __esModule: true,
  default: ({ errorMessage }: { errorMessage: string }) => (
    <div>{errorMessage}</div>
  ),
}));

describe('TranslationErrorMessage', () => {
  it('should render translated error message if errorKey is provided', () => {
    const tValidationMock = jest
      .fn()
      .mockReturnValue('Translated error message');
    (useTranslations as jest.Mock).mockReturnValue(tValidationMock);

    render(<TranslationErrorMessage errorKey="some_error_key" />);

    expect(tValidationMock).toHaveBeenCalledWith('some_error_key');
    expect(screen.getByText('Translated error message')).toBeInTheDocument();
  });
});
