import { TEntryRegistRequest } from "@/schemas";
import {
    HttpService,
    entries_checkout_complete,
    entries_store,
    entries_tour_entry
} from ".";


class EntryService {
    async createEntry(data: any): Promise<{ token: string }> {
        return HttpService.post(entries_store, data);
    }
    async checkoutComplete(data: any): Promise<{ token: string }> {
        return HttpService.post(entries_checkout_complete, data);
    }
    async tourEntry(params: { id: number, token: string }): Promise<{ data: Partial<TEntryRegistRequest> }> {
        return HttpService.get(entries_tour_entry, { params });
    }
}
const entryService = new EntryService();
export default entryService;