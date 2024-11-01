import HttpService from "./http.service";
import { master_schedule_options } from ".";
import { Option } from "@/constants/options";

class MasterService {
    async getScheduleOptions(): Promise<{data:Option[]}> {
        return HttpService.get(master_schedule_options);
    }
}
const masterService = new MasterService();

export default masterService