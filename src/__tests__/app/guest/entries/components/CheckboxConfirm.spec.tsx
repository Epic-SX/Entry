import React from 'react';
import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import CheckboxConfirm from '@/app/[locale]/(guest)/entries/_components/CheckboxConfirm';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/components/form/dynamic', () => ({
  TranslationErrorMessage: ({ errorKey }: { errorKey: string }) => (
    <div>{errorKey}</div>
  ),
}));

describe('CheckboxConfirm', () => {
  const mockUseFormReturn = {
    register: jest.fn(),
    formState: {
      errors: {},
    },
  };

  it('renders correctly with labels', () => {
    const mockTranslations = (key: string) => {
      if (key === 'pledge_with_examination_entry_list.mockTranslationKey') {
        return 'Label 1\nLabel 2\nLabel 3';
      }
      return key;
    };

    (useTranslations as jest.Mock).mockReturnValue(mockTranslations);

    render(
      <CheckboxConfirm
        form={mockUseFormReturn as any}
        name="testCheckbox"
        translationKey="mockTranslationKey"
        lables="testLabels"
      />,
    );

    expect(screen.getByText('Label 1')).toBeInTheDocument();
    expect(screen.getByText('Label 2')).toBeInTheDocument();
    expect(screen.getByText('Label 3')).toBeInTheDocument();
  });

  it('renders correctly with single label', () => {
    const mockTranslations = (key: string) => {
      if (key === 'pledge_with_examination_entry_list.mockTranslationKey') {
        return 'Single Label';
      }
      return key;
    };

    (useTranslations as jest.Mock).mockReturnValue(mockTranslations);

    render(
      <CheckboxConfirm
        form={mockUseFormReturn as any}
        name="testCheckbox"
        translationKey="mockTranslationKey"
        lables="testLabels"
      />,
    );

    expect(screen.getByText('Single Label')).toBeInTheDocument();
  });

  it('renders error message', () => {
    const mockTranslations = (key: string) => {
      if (key === 'pledge_with_examination_entry_list.mockTranslationKey') {
        return 'Label 1';
      }
      return key;
    };

    (useTranslations as jest.Mock).mockReturnValue(mockTranslations);

    const mockFormWithError = {
      ...mockUseFormReturn,
      formState: {
        errors: {
          testCheckbox: { message: 'Test error message' },
        },
      },
    };

    render(
      <CheckboxConfirm
        form={mockFormWithError as any}
        name="testCheckbox"
        translationKey="mockTranslationKey"
        lables="testLabels"
      />,
    );

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });
});
