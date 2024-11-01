import {
  entries_checkout_complete,
  entries_store,
  entries_tour_entry,
  entryService,
} from '@/services';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('EntryService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('createEntry', () => {
    it('should call HttpService.post with correct arguments and return token', async () => {
      const data = { some: 'data' };
      const response = { token: 'test_token' };

      mock.onPost(entries_store).reply(200, response);

      const result = await entryService.createEntry(data);

      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(entries_store);
      expect(mock.history.post[0].data).toBe(JSON.stringify(data));
      expect(result).toEqual(response);
    });
  });

  describe('checkoutComplete', () => {
    it('should call HttpService.post with correct arguments and return token', async () => {
      const data = { some: 'data' };
      const response = { token: 'test_token' };

      mock.onPost(entries_checkout_complete).reply(200, response);

      const result = await entryService.checkoutComplete(data);

      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(entries_checkout_complete);
      expect(mock.history.post[0].data).toBe(JSON.stringify(data));
      expect(result).toEqual(response);
    });
  });

  describe('tourEntry', () => {
    it('should call HttpService.get with correct arguments and return data', async () => {
      const params = { id: 1, token: 'test_token' };
      const response = { data: { some: 'data' } };

      mock.onGet(entries_tour_entry, { params }).reply(200, response);

      const result = await entryService.tourEntry(params);

      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(entries_tour_entry);
      expect(result).toEqual(response);
    });
  });
});
