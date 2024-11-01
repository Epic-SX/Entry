import Translation from '@/components/Translation';
import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('Translation', () => {
  it('should render the content returned by the render function with the translation function', () => {
    const mockUseTranslations = useTranslations as jest.Mock;
    const mockTranslationFunction = jest.fn(
      (id: string) => `translated: ${id}`,
    );
    mockUseTranslations.mockReturnValue(mockTranslationFunction);

    render(
      <Translation
        translationKey="testKey"
        render={(t) => <div>{t('some.translation')}</div>}
      />,
    );

    expect(
      screen.getByText('translated: some.translation'),
    ).toBeInTheDocument();
    expect(mockTranslationFunction).toHaveBeenCalledWith('some.translation');
  });

  it('should call the render function with the translation function', () => {
    const mockUseTranslations = useTranslations as jest.Mock;
    const mockTranslationFunction = jest.fn(
      (id: string) => `translated: ${id}`,
    );
    mockUseTranslations.mockReturnValue(mockTranslationFunction);

    const renderFunction = jest.fn((t) => (
      <div>{t('another.translation')}</div>
    ));

    render(<Translation translationKey="anotherKey" render={renderFunction} />);

    expect(renderFunction).toHaveBeenCalledWith(mockTranslationFunction);
    expect(mockTranslationFunction).toHaveBeenCalledWith('another.translation');
  });
});
