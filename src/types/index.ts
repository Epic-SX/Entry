import { ReactNode } from "react";

export * from "./schedules.type";
export * from "./tasks.type";
export * from "./exam-manages.type";
export * from "./tours.type";

export type MenuItemsProps = {
    path: string;
    title: string;
    translationKey?: string;
    roles?: Array<number>;
    isRequiredAuth?: boolean;
}

export type TAlert = {
    title: string | ReactNode;
    type?: "success" | "fail" | "info" | "warning";
    show: boolean;
    rootTranslationKey?: string;
    translationKey?: string;
}
export type TLoginResponse = {
    access_token: string;
    user: {
        name: string;
        email: string;
        role: number;
    },
    token_type: string;
}
export type TMessageSuccess = {
    success_message: string;
}
export type TMessageError = {
    error_message: string;
}
export type TMessageWarning = {
    warning_message: string;
}
export type TUploadImage = TMessageSuccess & {
    image_url: string;
}

export type BaseModel = {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export type BaseNameModel = {
    first_name: string;
    last_name: string;
    first_name_kana: string;
    last_name_kana: string;
    first_name_alp?: string;
    last_name_alp?: string;
}

