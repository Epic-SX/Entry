import { masterService, master_schedule_options } from '@/services';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('MasterService', () => {
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

  it('should call HttpService.get with the correct URL and return data', async () => {
    const mockResponse = { data: { option1: 'value1', option2: 'value2' } };
    mock.onGet(master_schedule_options).reply(200, mockResponse);
    const result = await masterService.getScheduleOptions();
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors correctly', async () => {
    mock.onGet(master_schedule_options).networkError();
    await expect(masterService.getScheduleOptions()).rejects.toThrow(
      'Network Error',
    );
  });
});
