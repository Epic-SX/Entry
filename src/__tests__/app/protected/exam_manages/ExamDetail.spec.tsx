import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAlertStore } from '@/stores';
import ExamDetail from '@/app/[locale]/(protected)/exam_manages/detail/[id]/page';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('@/services', () => ({
  examManagesService: {
    getExamById: jest.fn(),
    updateExamDate: jest.fn(),
    updateExamResult: jest.fn(),
    updateStatus: jest.fn(),
    delete: jest.fn(),
    updateNoProspectStatus: jest.fn(),
  },
}));

jest.mock('@/stores', () => ({
  useAlertStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}));

jest.mock('@/components', () => ({
  NavigationLink: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock('@/app/[locale]/(protected)/exam_manages/_component', () => ({
  ApplicantInformation: ({ isNoData }: any) =>
    isNoData ? <div>No Data</div> : <div>Applicant Information</div>,
  AssignmentAnswerContent: ({ examEntry, answers }: any) => (
    <div>Assignment Answer Content</div>
  ),
  DeleteModal: ({ show, onConfirm, onCancel }: any) =>
    show ? (
      <div>
        <button onClick={onConfirm}>Confirm Delete</button>
        <button onClick={onCancel}>Cancel Delete</button>
      </div>
    ) : null,
  StatusChangeModal: ({ show, onConfirm, onCancel, defaultValues }: any) =>
    show ? (
      <div>
        <button onClick={() => onConfirm(defaultValues)}>
          Confirm Status Change
        </button>
        <button onClick={onCancel}>Cancel Status Change</button>
      </div>
    ) : null,
  PassFailNotificationModal: ({
    show,
    onConfirm,
    onCancel,
    defaultValues,
  }: any) =>
    show ? (
      <div>
        <button onClick={() => onConfirm(defaultValues)}>
          Confirm Pass/Fail
        </button>
        <button onClick={onCancel}>Cancel Pass/Fail</button>
      </div>
    ) : null,
  ExamDateNotificationModal: ({
    show,
    onConfirm,
    onCancel,
    defaultValues,
  }: any) =>
    show ? (
      <div>
        <button onClick={() => onConfirm(defaultValues)}>
          Confirm Exam Date
        </button>
        <button onClick={onCancel}>Cancel Exam Date</button>
      </div>
    ) : null,
  UpdateNoProspectStatusModal: ({ show, onConfirm, onCancel }: any) =>
    show ? (
      <div>
        <button onClick={onConfirm}>Confirm No Prospect Status</button>
        <button onClick={onCancel}>Cancel No Prospect Status</button>
      </div>
    ) : null,
}));

describe('ExamDetail', () => {
  const mockShowAlert = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlertStore as unknown as jest.Mock as jest.Mock).mockReturnValue({
      showAlert: mockShowAlert,
    });
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: {
        exam_entry: { id: 1, status_value: 1, shouldShowAssignmentInfo: true },
        guardian: {},
        child: {},
        answers: [],
      },
    });
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
  });

  it('renders ExamDetail component correctly', () => {
    render(<ExamDetail params={{ id: 1 }} />);

    expect(screen.getByText('申込み情報詳細')).toBeInTheDocument();
    expect(screen.getByText('Applicant Information')).toBeInTheDocument();
    expect(screen.getByText('Assignment Answer Content')).toBeInTheDocument();
    expect(screen.getByText('戻る')).toBeInTheDocument();
  });
});
