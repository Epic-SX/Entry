export type TListTourMember = {
    tour: TTour;
    guest_array: Array<TGuest>;
    application_count: number;
}
export type TTour = {
    id: number,
    event_date: string;
    event_time: string;
    description: string;
    capacity: number,
    deleted_at: string;
    created_at: string;
    updated_at: string;
}
export type TGuest = {
    tours_guardian_id: number,
    status_division: number,
    cancel_date: string;
    send_mail_date: string;
    guardian_name: string;
    tel: string;
    email: string;
    child_name: string;
}

export type TUpdateStatus = {
    status: string;
    tours_guardian_id: number;
}
export type TUpdateCancelDate = {
    cancel_date: string;
    tours_guardian_id: number;
}
export type TSendMail = {
    tours_guardian_id: number;
    guardian_email: string;
}
export type TSendBulkMail = {
    tours_guardian_ids: Array<number>;
}