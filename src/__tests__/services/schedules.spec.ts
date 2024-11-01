import {
  scheduleService,
  schedules_members,
  schedules_remind_mail,
  schedules_save_cancel_date,
  schedules_save_status,
  schedules_send_bulk_mail,
  schedules_thanks_mail,
  schedules_url_mail,
  schedules_vacancy_mail,
} from '@/services';
import { TUpdateStatus } from '@/types';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('ScheduleService', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  afterEach(() => {
    mock.reset();
  });
  afterAll(() => {
    mock.restore();
  });

  it('should get list of tour members by id', async () => {
    const id = 1;
    const response = { members: ['member1', 'member2'] };
    mock.onGet(`${schedules_members}/${id}`).reply(200, response);

    const result = await scheduleService.getListTourMemberById(id);

    expect(result).toEqual(response);
  });

  it('should update status', async () => {
    const data: TUpdateStatus = {
      status: 'updated',
      tours_guardian_id: 1,
    };
    const response = { success: true };
    mock.onPost(schedules_save_status, data).reply(200, response);

    const result = await scheduleService.updateStatus(data);

    expect(result).toEqual(response);
  });

  it('should update cancel date', async () => {
    const data = {
      cancel_date: '2024-06-17',
      tours_guardian_id: 1,
    };
    const response = { success: true };
    mock.onPost(schedules_save_cancel_date, data).reply(200, response);

    const result = await scheduleService.updateCancelDate(data);

    expect(result).toEqual(response);
  });

  it('should send mail', async () => {
    const data = {
      url: 'https://example.com',
      tours_guardian_id: 1,
    };
    const response = { message: 'Mail sent successfully' };
    mock.onPost(schedules_url_mail, data).reply(200, response);

    const result = await scheduleService.sendMail(data as any);

    expect(result).toEqual(response);
  });

  it('should send bulk mail', async () => {
    const data = {
      url: 'https://example.com',
      tours_guardian_id: 1,
    };
    const response = { message: 'Mail sent successfully' };
    mock.onPost(schedules_send_bulk_mail, data).reply(200, response);

    const result = await scheduleService.sendBulkMail(data as any);

    expect(result).toEqual(response);
  });

  it('should send vacancy mail', async () => {
    const data = {
      tour_id: 1,
    };
    const response = { message: 'Vacancy mail sent successfully' };
    mock.onPost(schedules_vacancy_mail, data).reply(200, response);

    const result = await scheduleService.sendVacancyMail(data as any);

    expect(result).toEqual(response);
  });

  it('should send remind mail', async () => {
    const data = {
      tour_id: 1,
    };
    const response = { message: 'Remind mail sent successfully' };
    mock.onPost(schedules_remind_mail, data).reply(200, response);

    const result = await scheduleService.sendRemindMail(data as any);

    expect(result).toEqual(response);
  });

  it('should send thanks mail', async () => {
    const data = {
      tour_id: 1,
    };
    const response = { message: 'Thanks mail sent successfully' };
    mock.onPost(schedules_thanks_mail, data).reply(200, response);

    const result = await scheduleService.sendThanksMail(data as any);

    expect(result).toEqual(response);
  });
});
