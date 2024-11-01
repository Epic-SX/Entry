import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { JP_LOCALE } from '@/constants';
import { TTaskAnswer } from '@/types';
import { useLocale } from 'next-intl';
import ExamEntry from '@/app/[locale]/(guest)/tasks/_components/ExamEntry';

jest.mock('@/components/Translation', () => ({
  __esModule: true,
  default: ({ render }: { translationKey: string; render: any }) => (
    <>{render((key: string) => key)}</>
  ),
}));

jest.mock('@/components/form/dynamic', () => ({
  TranslationErrorMessage: ({ errorKey }: { errorKey: string }) => (
    <div>{errorKey}</div>
  ),
}));

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

describe('ExamEntry', () => {
  let mockForm: UseFormReturn<any>;

  beforeEach(() => {
    mockForm = {
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: {
        errors: {},
      },
      trigger: jest.fn(),
      reset: jest.fn(),
      getValues: jest.fn().mockReturnValue('Test answer'),
    } as unknown as UseFormReturn<any>;

    (useForm as jest.Mock).mockReturnValue(mockForm);
  });

  const mockExam: TTaskAnswer = {
    task: {
      question: 'Question in English',
      question_jp: '質問',
    },
  } as TTaskAnswer;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with English question', () => {
    (useLocale as jest.Mock).mockReturnValue('en');

    render(<ExamEntry index={0} exam={mockExam} form={mockForm} />);

    expect(screen.getByText('Question in English')).toBeInTheDocument();
  });

  it('renders correctly with Japanese question', () => {
    (useLocale as jest.Mock).mockReturnValue(JP_LOCALE);

    render(<ExamEntry index={0} exam={mockExam} form={mockForm} />);

    expect(screen.getByText('質問')).toBeInTheDocument();
  });

  it('renders textarea when isConfirm is false', () => {
    (useLocale as jest.Mock).mockReturnValue('en');

    render(
      <ExamEntry index={0} exam={mockExam} form={mockForm} isConfirm={false} />,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays value when isConfirm is true', () => {
    (useLocale as jest.Mock).mockReturnValue('en');

    render(
      <ExamEntry index={0} exam={mockExam} form={mockForm} isConfirm={true} />,
    );

    expect(screen.getByText('Test answer')).toBeInTheDocument();
  });
});
