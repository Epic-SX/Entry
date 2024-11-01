import HttpService from "./http.service";
import authService from "./auth.service";
import scheduleService from "./schedules.service";
import tourService from "./tour.service";
import masterService from "./master.service";
import paymentService from "./payment.service";
import entryService from "./entry.service";
import tasksService from "./tasks.service";
import { api_routes } from "@/routes";
import examManagesService from "./exam-manages.service";


export {
    HttpService,
    authService,
    scheduleService,
    tourService,
    masterService,
    paymentService,
    entryService,
    tasksService,
    examManagesService,
};
export const {
    login,
    logout,
    google_redirect,
    google_callback,
    csrf,
    entries_store,
    entries_checkout_complete,
    entries_tour_entry,
    master_schedule_options,
    payment_session,
    schedules_members,
    schedules_save_status,
    schedules_save_cancel_date,
    schedules_url_mail,
    schedules_send_bulk_mail,
    tasks,
    tasks_photo1_upload,
    tasks_photo2_upload,
    tasks_save_tmp,
    tasks_store,
    tours,
    tours_store,
    tours_reentry,
    tours_set_reentry,
    v2_tours_get_guardian_info,
    exam_manages_detail,
    exam_manages_update_exam_date,
    exam_manages_update_exam_result,
    exam_manages_update_status,
    exam_manages_update_no_prospect_status,
    exam_manages_delete,
    exam_manages_get_zoom_url_by_title,
    schedules_vacancy_mail,
    schedules_remind_mail,
    schedules_thanks_mail,
    schedules_delete_tours_guardian,
    preschoolers_store,
} = api_routes;