import { HttpService, payment_session } from ".";

class PaymentService {
    async createPaymentSession(data: { success_url: string; cancel_url: string; email: string }): Promise<{id:string}> {
        return HttpService.post<{id:string}>(payment_session, data);
    }
}
const paymentService = new PaymentService();
export default paymentService;