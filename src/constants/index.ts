import { MenuItemsProps } from "@/types";
import config from "./config";
import message from "./message";
import TRANSLATION_KEY from "./translation-key";
import { public_routes } from "@/routes";
export { config, message, TRANSLATION_KEY };
export * from './regex';


export const menuItems: Array<MenuItemsProps> = [
    {
        path: '/schedules',
        title: '見学会一覧',
        isRequiredAuth: true,
        translationKey: "tours_schedule_list",
    },
    {
        path: '/tours_entries',
        title: '見学会参加者一覧',
        isRequiredAuth: true,
        translationKey: "tours_entries",
    },
    {
        path: '/exam_manages',
        title: '考査情報管理',
        isRequiredAuth: true,
        translationKey: "entry_list",
    },
    {
        path: '/exam_manages/pastel',
        title: 'パステル連携',
        isRequiredAuth: true,
        translationKey: "coordination_to_pastel",
    },
    {
        path: '/bi_report',
        title: '入園者分析',
        isRequiredAuth: true,
        translationKey: "bi_report",
    },
];

export const ACESS_TOKEN = 'access_token';

export const LOGIN_INFO = 'login_info';

export const LAST_VISITED_PATH = 'last_visited_path';

export const IS_LOGOUTED = 'isLogouted';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const HOME_URL:string = process.env.NEXT_PUBLIC_HOME_URL || public_routes.error_invalid_page;

export const entrySteps = [
    'input',
    'payment',
    'submission',
    'completed',
];

export const MAX_ENTRY_STEP = entrySteps.length;

export const MIN_STEP = 1;

export const JP_LOCALE = 'jp';

export const EN_LOCALE = 'en';

export const LOCALES = [EN_LOCALE, JP_LOCALE];

export const LOCALE_KEY = 'locale';