import React from 'react';
import { render, screen } from '@testing-library/react';
import AssignmentAnswerContent from '@/app/[locale]/(protected)/exam_manages/_component/AssignmentAnswerContent';
import { ExamDetail, TTaskAnswer } from '@/types';

const mockExamEntry: ExamDetail = {
  photo1: '/img/child_photo.png',
  photo2: '/img/parent_child_photo.png',
} as unknown as ExamDetail;

const mockAnswers: TTaskAnswer[] = [
  { question: 'q1', answer: 'ans1' },
  { question: 'q2', answer: 'ans2' },
] as unknown as TTaskAnswer[];

describe('AssignmentAnswerContent', () => {
  it('renders AssignmentAnswerContent component correctly with data', () => {
    render(
      <AssignmentAnswerContent
        examEntry={mockExamEntry}
        answers={mockAnswers}
      />,
    );

    expect(screen.getByText('課題解答内容')).toBeInTheDocument();
    expect(screen.getByText('お子さんの顔写真')).toBeInTheDocument();
    expect(screen.getByText('保護者と一緒の写真')).toBeInTheDocument();
    expect(screen.getByText('設問1')).toBeInTheDocument();
    expect(screen.getByText('設問2')).toBeInTheDocument();
    expect(screen.getByText('q1')).toBeInTheDocument();
    expect(screen.getByText('q2')).toBeInTheDocument();
  });

  it('renders AssignmentAnswerContent component correctly without answers', () => {
    render(<AssignmentAnswerContent examEntry={mockExamEntry} answers={[]} />);

    expect(screen.getByText('課題解答内容')).toBeInTheDocument();
    expect(screen.queryByText('設問1')).not.toBeInTheDocument();
  });

  it('renders default image when no photo is provided', () => {
    const examEntryWithoutPhotos: ExamDetail = {
      photo1: '',
      photo2: '',
    } as unknown as ExamDetail;

    render(
      <AssignmentAnswerContent
        examEntry={examEntryWithoutPhotos}
        answers={mockAnswers}
      />,
    );

    expect(screen.getAllByAltText('placeholder').length).toBe(2);
  });
});
