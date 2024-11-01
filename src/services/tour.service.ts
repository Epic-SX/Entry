import { TTourRegistRequest } from "@/schemas";
import HttpService from "./http.service";
import {
    tours,
    tours_store,
    tours_reentry,
    tours_set_reentry,
    v2_tours_get_guardian_info
} from ".";
import { IReentry, TMessageSuccess, TMessageWarning } from "@/types";

class TourService {
    async getEntryConfigForm(): Promise<any> {
        return HttpService.get(tours);
    }
    async regist(data: TTourRegistRequest): Promise<any> {
        return HttpService.post(tours_store, data);
    }
    async getGuardianInfo(data: any): Promise<{ data: TTourRegistRequest }> {
        return HttpService.post(v2_tours_get_guardian_info, data);
    }
    async reentry(id: number, token: string, locale: string): Promise<{ data: IReentry }> {
        return HttpService.get(`${tours_reentry}/${id}/${token}`, {
            params: {
                locale
            }
        });
    }
    async setReentry(data: { id: number }): Promise<TMessageSuccess & TMessageWarning> {
        return HttpService.post(tours_set_reentry, data);
    }
}
const tourService = new TourService();
export default tourService;