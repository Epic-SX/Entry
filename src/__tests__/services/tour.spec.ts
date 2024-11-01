import {
  tourService,
  tours,
  tours_reentry,
  tours_set_reentry,
  tours_store,
  v2_tours_get_guardian_info,
} from '@/services';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('TourService', () => {
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

  it('should get entry config form', async () => {
    const response = { config: 'form config' };
    mock.onGet(tours).reply(200, response);

    const result = await tourService.getEntryConfigForm();

    expect(result).toEqual(response);
  });

  it('should register a tour', async () => {
    const data = {
      guardianId: 1,
      locale: 'en',
    };
    const response = { success: true };
    mock.onPost(tours_store).reply(200, response);

    const result = await tourService.regist(data as any);

    expect(result).toEqual(response);
  });

  it('should get guardian info', async () => {
    const requestData = { guardianId: 1 };
    const response = { data: { guardianId: 1 } };
    mock.onPost(v2_tours_get_guardian_info).reply(200, response);

    const result = await tourService.getGuardianInfo(requestData);

    expect(result).toEqual(response);
  });

  it('should reentry a tour', async () => {
    const id = 1;
    const token = 'test_token';
    const locale = 'en';
    const response = { data: {} as any };
    mock
      .onGet(`${tours_reentry}/${id}/${token}`, { params: { locale } })
      .reply(200, response);

    const result = await tourService.reentry(id, token, locale);

    expect(result).toEqual(response);
  });

  it('should set reentry', async () => {
    const data = { id: 1 };
    const response = { success: true, warning: 'some warning' } as any;
    mock.onPost(tours_set_reentry).reply(200, response);

    const result = await tourService.setReentry(data);

    expect(result).toEqual(response);
  });
});
