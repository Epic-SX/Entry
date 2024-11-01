import React from 'react';
import { render, screen } from '@testing-library/react';
import ApplicantInformation from '@/app/[locale]/(protected)/exam_manages/_component/ApplicantInformation';
import { TGuardian, TChild, ExamDetail } from '@/types';

const mockGuardian: TGuardian = {
  last_name: 'Doe',
  first_name: 'John',
  last_name_kana: 'ドウ',
  first_name_kana: 'ジョン',
  address: '123 Main St',
  tel: '123-456-7890',
  email: 'john.doe@example.com',
} as unknown as TGuardian;

const mockChild: TChild = {
  last_name: 'Doe',
  first_name: 'Jane',
  last_name_kana: 'ドウ',
  first_name_kana: 'ジェーン',
  last_name_alp: 'Doe',
  first_name_alp: 'Jane',
  sex: 'Female',
  birthday: '2010-01-01',
} as unknown as TChild;

const mockExamEntry: ExamDetail = {
  being_in: 'Yes',
  entry_class: 'Kindergarten',
  entry_year: '2021',
  entry_month: 'April',
  entry_date: '2021-01-01',
  send_task_date: '2021-02-01',
  exam_date: '2021-03-01',
  status: 'Pending',
  result_division: 'Passed',
  assignment_submission_url: 'http://example.com',
} as unknown as ExamDetail;

describe('ApplicantInformation', () => {
  it('renders ApplicantInformation component correctly with data', () => {
    render(
      <ApplicantInformation
        examEntry={mockExamEntry}
        guardian={mockGuardian}
        child={mockChild}
        isNoData={false}
      />,
    );

    expect(screen.getByText('申込み者情報')).toBeInTheDocument();
    expect(screen.getByText('保護者名')).toBeInTheDocument();
    expect(screen.getByText('Doe John (ドウ ジョン)')).toBeInTheDocument();
    expect(screen.getByText('お子さんのお名前')).toBeInTheDocument();
    expect(screen.getByText('Doe Jane (ドウ ジェーン)')).toBeInTheDocument();
    expect(screen.getByText('お子さんのお名前(ローマ字)')).toBeInTheDocument();
    expect(screen.getByText('Doe Jane')).toBeInTheDocument();
    expect(screen.getByText('お子さんの性別')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('お子さんの誕生日')).toBeInTheDocument();
    expect(screen.getByText('2010-01-01')).toBeInTheDocument();
    expect(screen.getByText('住所')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('電話番号')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('在園・卒園状況')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('入園希望学年')).toBeInTheDocument();
    expect(screen.getByText('Kindergarten')).toBeInTheDocument();
    expect(screen.getByText('入園希望年度')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('入園希望月')).toBeInTheDocument();
    expect(screen.getByText('April')).toBeInTheDocument();
    expect(screen.getByText('処理履歴')).toBeInTheDocument();
    expect(screen.getByText('申込み日:')).toBeInTheDocument();
    expect(screen.getByText('2021-01-01')).toBeInTheDocument();
    expect(screen.getByText('課題提出日:')).toBeInTheDocument();
    expect(screen.getByText('2021-02-01')).toBeInTheDocument();
    expect(screen.getByText('考査（予定）日:')).toBeInTheDocument();
    expect(screen.getByText('2021-03-01')).toBeInTheDocument();
    expect(screen.getByText('ステータス')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('合否')).toBeInTheDocument();
    expect(screen.getByText('Passed')).toBeInTheDocument();
    expect(screen.getByText('課題提出URL')).toBeInTheDocument();
    expect(screen.getByText('http://example.com')).toBeInTheDocument();
  });

  it('renders no data message when isNoData is true', () => {
    render(
      <ApplicantInformation
        examEntry={undefined}
        guardian={undefined}
        child={undefined}
        isNoData={true}
      />,
    );

    expect(screen.getByText('申込み者情報はありません。')).toBeInTheDocument();
  });
});
