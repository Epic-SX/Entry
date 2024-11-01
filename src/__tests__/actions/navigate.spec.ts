import navigate from '@/actions/navigate';
import { redirect } from 'next/navigation';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('navigate function', () => {
  it('should call redirect with the correct path', async () => {
    const path = '/test-path';
    await navigate(path);
    expect(redirect).toHaveBeenCalledWith(path);
  });
});
