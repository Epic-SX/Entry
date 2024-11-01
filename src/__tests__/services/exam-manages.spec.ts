import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  exam_manages_detail,
  exam_manages_update_exam_date,
  exam_manages_update_exam_result,
  exam_manages_update_status,
  exam_manages_delete,
  exam_manages_get_zoom_url_by_title,
  exam_manages_update_no_prospect_status,
  examManagesService,
} from '@/services';
import { ExamStatusSchema } from '@/schemas';

describe('ExamManagesService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('getExamById', () => {
    it('should fetch exam details by ID', async () => {
      const id = 1;
      const response = {
        exam_entry: {},
        guardian: {},
        child: {},
        answers: [],
      };

      mock.onGet(`${exam_manages_detail}/${id}`).reply(200, response);

      const result = await examManagesService.getExamById(id);

      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(`${exam_manages_detail}/${id}`);
      expect(result).toEqual(response);
    });
  });

  describe('updateExamDate', () => {
    it('should update exam date', async () => {
      const params = {
        id: 1,
        exam_date: '2023-06-01',
        exam_time: '10:00',
        memo: 'memo',
        title: 'title',
        zoom_url: 'url',
      };
      const response = { success: true, message: 'updated' };

      mock.onPost(exam_manages_update_exam_date).reply(200, response);

      const result = await examManagesService.updateExamDate(params);

      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(exam_manages_update_exam_date);
      expect(mock.history.post[0].data).toBe(JSON.stringify(params));
      expect(result).toEqual(response);
    });
  });

  describe('updateExamResult', () => {
    it('should update exam result', async () => {
      const id = 1;
      const result_division = 2;
      const response = { success: true, message: 'updated' };

      mock.onPost(exam_manages_update_exam_result).reply(200, response);

      const result = await examManagesService.updateExamResult(
        id,
        result_division,
      );

      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(exam_manages_update_exam_result);
      expect(mock.history.post[0].data).toBe(
        JSON.stringify({ id, result_division }),
      );
      expect(result).toEqual(response);
    });
  });

  describe('updateStatus', () => {
    it('should update status', async () => {
      const id = 1;
      const params: ExamStatusSchema = { status: 'passed' };
      const response = { success: true, message: 'updated' };

      mock.onPost(exam_manages_update_status).reply(200, response);

      const result = await examManagesService.updateStatus(id, params);

      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(exam_manages_update_status);
      expect(mock.history.post[0].data).toBe(JSON.stringify({ id, ...params }));
      expect(result).toEqual(response);
    });
  });

  describe('delete', () => {
    it('should delete an exam', async () => {
      const id = 1;
      const response = { success: true, message: 'deleted' };

      mock.onPost(exam_manages_delete).reply(200, response);

      const result = await examManagesService.delete(id);

      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(exam_manages_delete);
      expect(mock.history.post[0].data).toBe(JSON.stringify({ id }));
      expect(result).toEqual(response);
    });
  });

  describe('getZoomUrlByTitle', () => {
    it('should get Zoom URL by title', async () => {
      const title = 'Math Exam';
      const response = { zoom_url: 'https://zoom.us/j/123456789' };

      mock
        .onGet(exam_manages_get_zoom_url_by_title, { params: { title } })
        .reply(200, response);

      const result = await examManagesService.getZoomUrlByTitle(title);

      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(exam_manages_get_zoom_url_by_title);
      expect(mock.history.get[0].params).toEqual({ title });
      expect(result).toEqual(response);
    });
  });

  describe('updateNoProspectStatus', () => {
    it('should update no prospect status', async () => {
      const id = 1;
      const response = { success: true, message: 'updated' };

      mock.onPost(exam_manages_update_no_prospect_status).reply(200, response);

      const result = await examManagesService.updateNoProspectStatus(id);

      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(
        exam_manages_update_no_prospect_status,
      );
      expect(mock.history.post[0].data).toBe(JSON.stringify({ id }));
      expect(result).toEqual(response);
    });
  });
});
