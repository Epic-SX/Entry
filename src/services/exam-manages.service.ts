import {
  ExamDetail,
  TChild,
  TGuardian,
  TMessageError,
  TMessageSuccess,
  TTaskAnswer,
} from '@/types';
import {
  exam_manages_detail,
  exam_manages_update_exam_date,
  exam_manages_update_exam_result,
  exam_manages_update_status,
  exam_manages_delete,
  exam_manages_get_zoom_url_by_title,
  exam_manages_update_no_prospect_status,
} from '.';
import HttpService from './http.service';
import { ExamDateRequest, ExamStatusSchema } from '@/schemas';

class ExamManagesService {
  getExamById(id: number): Promise<{
    exam_entry: ExamDetail;
    guardian: TGuardian;
    child: TChild;
    answers: Array<TTaskAnswer>;
  }> {
    return HttpService.get(`${exam_manages_detail}/${id}`);
  }
  updateExamDate(
    params: { id: number } & ExamDateRequest,
  ): Promise<TMessageSuccess & TMessageError> {
    return HttpService.post(exam_manages_update_exam_date, params);
  }
  updateExamResult(
    id: number,
    result_division: number,
  ): Promise<TMessageSuccess & TMessageError> {
    return HttpService.post(exam_manages_update_exam_result, {
      id,
      result_division,
    });
  }
  updateStatus(
    id: number,
    params: ExamStatusSchema,
  ): Promise<TMessageSuccess & TMessageError> {
    return HttpService.post(exam_manages_update_status, {
      id,
      ...params,
    });
  }
  delete(id: number): Promise<TMessageSuccess & TMessageError> {
    return HttpService.post(exam_manages_delete, { id });
  }
  getZoomUrlByTitle(title: string): Promise<{ zoom_url: string }> {
    return HttpService.get(exam_manages_get_zoom_url_by_title, {
      params: { title },
    });
  }
  updateNoProspectStatus(id: number): Promise<TMessageSuccess & TMessageError> {
    return HttpService.post(exam_manages_update_no_prospect_status, {
      id,
    });
  }
}

const examManagesService = new ExamManagesService();
export default examManagesService;
