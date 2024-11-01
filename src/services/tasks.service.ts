import { TMessageSuccess, TTaskResponse, TUploadImage } from "@/types";
import {
    HttpService,
    tasks,
    tasks_photo1_upload,
    tasks_photo2_upload,
    tasks_save_tmp,
    tasks_store,

} from ".";

class TasksService {
    async getTaskByToken(params: { token: string }): Promise<TTaskResponse> {
        return HttpService.get(tasks, {
            params: params
        });
    }
    async uploadPhoto1(data: FormData): Promise<TUploadImage> {
        return HttpService.uploadFile(tasks_photo1_upload, data);
    }
    async uploadPhoto2(data: FormData): Promise<TUploadImage> {
        return HttpService.uploadFile(tasks_photo2_upload, data);
    }
    async saveTemp(data: any): Promise<TMessageSuccess> {
        return HttpService.post(tasks_save_tmp, data);
    }
    async saveTask(data: any): Promise<TMessageSuccess> {
        return HttpService.post(tasks_store, data);
    }
}
const tasksService = new TasksService();
export default tasksService;