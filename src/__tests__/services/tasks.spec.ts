import {
  tasks,
  tasksService,
  tasks_photo1_upload,
  tasks_save_tmp,
  tasks_store,
} from '@/services';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('TasksService', () => {
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

  it('should get task by token', async () => {
    const params = { token: 'test_token' };
    const response = { task: 'task data' };
    mock.onGet(tasks, { params }).reply(200, response);

    const result = await tasksService.getTaskByToken(params);

    expect(result).toEqual(response);
  });

  it('should upload photo 1', async () => {
    const formData = new FormData();
    formData.append('file', new Blob(), 'photo1.jpg');
    const response = { imageUrl: 'http://example.com/photo1.jpg' };
    mock.onPost(tasks_photo1_upload).reply(200, response);

    const result = await tasksService.uploadPhoto1(formData);

    expect(result).toEqual(response);
  });

  it('should upload photo 2', async () => {
    const formData = new FormData();
    formData.append('file', new Blob(), 'photo2.jpg');
    const response = { imageUrl: 'http://example.com/photo2.jpg' };
    mock.onPost(tasks_photo1_upload).reply(200, response);

    const result = await tasksService.uploadPhoto1(formData);

    expect(result).toEqual(response);
  });

  it('should save temp data', async () => {
    const data = { some: 'data' };
    const response = { success: true };
    mock.onPost(tasks_save_tmp, data).reply(200, response);

    const result = await tasksService.saveTemp(data);

    expect(result).toEqual(response);
  });

  it('should save task', async () => {
    const data = { some: 'data' };
    const response = { success: true };
    mock.onPost(tasks_store, data).reply(200, response);

    const result = await tasksService.saveTask(data);

    expect(result).toEqual(response);
  });
});
