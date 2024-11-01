import { HttpService } from '@/services';
import { useAlertStore, usePendingAlertStore } from '@/stores';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

jest.mock('js-cookie');
jest.mock('@/services/auth.service');
jest.mock('@/stores');
jest.mock('@/actions');

const API_URL = '';

describe('HttpService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    jest.clearAllMocks();
    (usePendingAlertStore.getState as jest.Mock).mockReturnValue({
      showAlert: jest.fn(),
      hideAlert: jest.fn(),
    });
    (useAlertStore.getState as jest.Mock).mockReturnValue({
      showAlert: jest.fn(),
    });
  });

  afterEach(() => {
    mock.restore();
  });

  describe('HTTP Methods', () => {
    it('shold make a GET request', async () => {
      const data = { some: 'data' };
      mock.onGet(`${API_URL}/test`).reply(200, data);

      const result = await HttpService.get('/test');

      expect(result).toEqual(data);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(`${API_URL}/test`);
    });

    it('shold make a POST request', async () => {
      const data = { some: 'data' };
      const response = { token: 'test_token' };
      mock.onPost(`${API_URL}/test`).reply(200, response);

      const result = await HttpService.post('/test', data);

      expect(result).toEqual(response);
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(`${API_URL}/test`);
      expect(mock.history.post[0].data).toBe(JSON.stringify(data));
    });

    it('should make a PUT request', async () => {
      const data = { some: 'data' };
      const response = { success: true };
      mock.onPut(`${API_URL}/test`).reply(200, response);

      const result = await HttpService.put('/test', data);

      expect(result).toEqual(response);
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.put[0].url).toBe(`${API_URL}/test`);
      expect(mock.history.put[0].data).toBe(JSON.stringify(data));
    });

    it('should make a DELETE request', async () => {
      const response = { success: true };
      mock.onDelete(`${API_URL}/test`).reply(200, response);

      const result = await HttpService.delete('/test');

      expect(result).toEqual(response);
      expect(mock.history.delete.length).toBe(1);
      expect(mock.history.delete[0].url).toBe(`${API_URL}/test`);
    });

    it('should make a PATCH request', async () => {
      const data = { some: 'data' };
      const response = { success: true };
      mock.onPatch(`${API_URL}/test`).reply(200, response);

      const result = await HttpService.patch('/test', data);

      expect(result).toEqual(response);
      expect(mock.history.patch.length).toBe(1);
      expect(mock.history.patch[0].url).toBe(`${API_URL}/test`);
      expect(mock.history.patch[0].data).toBe(JSON.stringify(data));
    });

    it('should upload a file', async () => {
      const formData = new FormData();
      formData.append('file', new Blob(['file content']), 'file.txt');
      const response = { success: true };
      mock.onPost(`${API_URL}/upload`).reply(200, response);

      const result = await HttpService.uploadFile('/upload', formData);

      expect(result).toEqual(response);
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(`${API_URL}/upload`);
      expect(mock.history.post[0].data).toBe(formData);
    });
  });
});
