import {
    TListTourMember,
    TMessageSuccess,
    TSendBulkMail,
    TSendMail,
    TUpdateCancelDate,
    TUpdateStatus
} from "@/types";
import {
    HttpService,
    schedules_members,
    schedules_save_status,
    schedules_save_cancel_date,
    schedules_url_mail,
    schedules_send_bulk_mail,
    schedules_vacancy_mail,
    schedules_remind_mail,
    schedules_thanks_mail,
    schedules_delete_tours_guardian,
} from ".";

class ScheduleService {
    async getListTourMemberById(id: number): Promise<TListTourMember> {
        return HttpService.get<TListTourMember>(`${schedules_members}/${id}`);
    }
    async updateStatus(data: TUpdateStatus): Promise<any> {
        return HttpService.post(schedules_save_status, data);
    }
    async updateCancelDate(data: TUpdateCancelDate): Promise<any> {
        return HttpService.post(schedules_save_cancel_date, data);
    }
    async sendMail(data: TSendMail): Promise<TMessageSuccess> {
        return HttpService.post(schedules_url_mail, data);
    }
    async sendBulkMail(data: TSendBulkMail): Promise<any> {
        return HttpService.post(schedules_send_bulk_mail, data);
    }
    async sendVacancyMail(data: { tour_id: number }): Promise<TMessageSuccess> {
        return HttpService.post(schedules_vacancy_mail, data)
    }
    async sendRemindMail(data: { tour_id: number }): Promise<TMessageSuccess> {
        return HttpService.post(schedules_remind_mail, data)
    }
    async sendThanksMail(data: { tour_id: number }): Promise<TMessageSuccess> {
        return HttpService.post(schedules_thanks_mail, data)
    }
    async deleteToursGuardian(tours_guardian_id: number): Promise<any> {
       return HttpService.delete(`${schedules_delete_tours_guardian}/${tours_guardian_id}`) 
    }
}

const scheduleService = new ScheduleService();
export default scheduleService 