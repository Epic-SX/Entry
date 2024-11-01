import { BaseModel, BaseNameModel } from ".";

export type ExamDetail = BaseModel & {
    application_date: string;
    being_in: string;
    cancel_date: string;
    child_id: number;
    entry_class: string;
    entry_date: string;
    entry_month: string;
    entry_year: string;
    exam_date: string;
    guardian_id: number;
    locale: string;
    photo1: string;
    photo2: string;
    result_division: string;
    result_division_value: number;
    send_result_date: string;
    send_task_date: string;
    status: string;
    status_value: number;
    token: string;
    guardian: TGuardian;
    child: TChild;
    assignment_submission_url: string;
    shouldShowAssignmentInfo: boolean;
}

export type TGuardian = BaseModel & BaseNameModel & {
    address: string;
    building: string;
    email: string;
    password_hash: string;
    prefecture: string;
    tel: string;
    zipcode: string;
}

export type TChild = BaseModel & BaseNameModel & {
    birthday: string;
    guardian_id: number;
    sex: string;
}