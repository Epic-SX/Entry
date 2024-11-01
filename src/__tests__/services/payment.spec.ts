import { paymentService, payment_session } from '@/services';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('PaymentService', () => {
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

  it('should call HttpService.post with the correct URL and return session ID', async () => {
    const requestData = {
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      email: 'test@example.com',
    };
    const mockResponse = { id: 'test_session_id' };

    mock.onPost(payment_session).reply(200, mockResponse);

    const result = await paymentService.createPaymentSession(requestData);

    expect(result).toEqual(mockResponse);
  });

  it('should handle errors correctly', async () => {
    const requestData = {
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      email: 'test@example.com',
    };
    mock.onPost(payment_session).networkError();

    await expect(
      paymentService.createPaymentSession(requestData),
    ).rejects.toThrow('Network Error');
  });
});
