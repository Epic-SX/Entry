
const routes = {
    api_routes: {
        login: "/auth/login",
        logout: "/auth/logout",
        google_redirect: "auth/redirect",
        google_callback: "auth/callback",
        csrf: "/sanctum/csrf-cookie",
        entries_store: "entries/store",
        entries_checkout_complete: "entries/checkout_complete",
        entries_tour_entry: "entries/tour_entry",
        master_schedule_options: "master/schedule_options",
        payment_session: "payment/session",
        schedules_members: "schedules/members",
        schedules_save_status: "schedules/save_status",
        schedules_save_cancel_date: "schedules/save_cancel_date",
        schedules_url_mail: "schedules/url_mail",
        schedules_send_bulk_mail: "schedules/send_bulk_mail",
        schedules_vacancy_mail: "schedules/vacancy_mail",
        schedules_remind_mail: "schedules/remind_mail",
        schedules_thanks_mail: "schedules/thanks_mail",
        schedules_delete_tours_guardian: "schedules/delete_tours_guardian",
        tasks: "tasks",
        tasks_photo1_upload: "tasks/photo1_upload",
        tasks_photo2_upload: "tasks/photo2_upload",
        tasks_save_tmp: "tasks/save_tmp",
        tasks_store: "tasks/store",
        tours: "tours",
        tours_store: "tours/store",
        tours_reentry: "tours/reentry",
        tours_set_reentry: "tours/set_reentry",
        v2_tours_get_guardian_info: "v2/tours/get_guardian_info",
        exam_manages_detail: "exam_manages/detail",
        exam_manages_update_exam_date: "exam_manages/update_exam_date",
        exam_manages_update_exam_result: "exam_manages/update_exam_result",
        exam_manages_update_status: "exam_manages/update_status",
        exam_manages_update_no_prospect_status: "exam_manages/update_no_prospect_status",
        exam_manages_delete: "exam_manages/delete",
        exam_manages_get_zoom_url_by_title: "exam_manages/get_zoom_url_by_title",
        preschoolers_store: "preschoolers/store",
    },
    public_routes: {
        tours_regist: "/tours/regist",
        tours_regist_complete: "/tours/regist/complete",
        entries: "/entries",
        stripe: "/stripe",
        stripe_success: "/stripe/success",
        tasks: "/tasks",
        tasks_complete: "/tasks/complete",
        payment_success: "/payment-success",
        error_invalid_page: "/error/invalid-page",
    },
    private_routes: {
        household_survey_completed: "/household-survey/completed",
        default: "/",
    },
    auth_routes: {
        login: "/auth/login",
        logout: "/auth/logout",
        google: "/auth/google",
    },
};

export const isApiRoute = (route: string) => {
    return Object.values(routes.api_routes).includes(route);
}
export const isPublicRoute = (route: string) => {
    return Object.values(routes.public_routes).includes(route);
}
export const isAuthRoute = (route: string) => {
    return Object.values(routes.auth_routes).includes(route);
}

export const {
    api_routes,
    public_routes,
    auth_routes,
    private_routes,
} = routes;
export default routes;