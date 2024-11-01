import {
  formTimeToHHMM,
  formatDate,
  formatDateHourMinute,
  getActiveEnv,
  isDevEnv,
  isDisplayDelete,
  isDisplayEditExamDateAndResult,
  isDisplayEditId,
  isDisplayEditStatus,
  isDisplayStatus,
  isHidenNameAlp,
  isNumberValid,
  isProdEnv,
  isTestEnv,
} from '@/libs';

beforeEach(() => {
  jest.resetModules();
  process.env = { ...process.env };
});

describe('Utility functions', () => {
  test('formatDateHourMinute should format date correctly', () => {
    const date = '2024-06-17 12:34';
    expect(formatDateHourMinute(date)).toBe('2024-06-17 12:34');
  });

  test('formatDate should format date correctly', () => {
    const date = '2024-06-17T12:34:56Z';
    expect(formatDate(date)).toBe('2024-06-17');
  });

  test('getActiveEnv should return the correct environment', () => {
    process.env.NEXT_PUBLIC_ACTIVE_ENV = 'test';
    expect(getActiveEnv()).toBe('test');
  });

  test('isDevEnv should return true if the environment is local', () => {
    process.env.NEXT_PUBLIC_ACTIVE_ENV = 'local';
    expect(isDevEnv()).toBe(true);
  });

  test('isTestEnv should return true if the environment is test', () => {
    process.env.NEXT_PUBLIC_ACTIVE_ENV = 'test';
    expect(isTestEnv()).toBe(true);
  });

  test('isProdEnv should return true if the environment is prod', () => {
    process.env.NEXT_PUBLIC_ACTIVE_ENV = 'prod';
    expect(isProdEnv()).toBe(true);
  });

  test('isHidenNameAlp should return true if config hiden is en and locale is en', () => {
    const config = { hiden: 'en' };
    expect(isHidenNameAlp(config, 'en')).toBe(true);
  });

  test('isNumberValid should return true for valid numbers', () => {
    expect(isNumberValid(123)).toBe(true);
    expect(isNumberValid('123')).toBe(false);
    expect(isNumberValid(NaN)).toBe(false);
  });

  test('isDisplayStatus should return true if status is in the statusArray', () => {
    expect(isDisplayStatus(3, 1, 2, 3)).toBe(true);
    expect(isDisplayStatus(4, 1, 2, 3)).toBe(false);
  });

  test('isDisplayEditExamDateAndResult should return true if status is 1 or 2', () => {
    expect(isDisplayEditExamDateAndResult(1)).toBe(true);
    expect(isDisplayEditExamDateAndResult(2)).toBe(true);
    expect(isDisplayEditExamDateAndResult(3)).toBe(false);
  });

  test('formTimeToHHMM should format time correctly', () => {
    expect(formTimeToHHMM('12:34:56')).toBe('12:34');
  });

  test('isDisplayEditStatus should return true if status is 3, 4, or 99', () => {
    expect(isDisplayEditStatus(3)).toBe(true);
    expect(isDisplayEditStatus(4)).toBe(true);
    expect(isDisplayEditStatus(99)).toBe(true);
    expect(isDisplayEditStatus(5)).toBe(false);
  });

  test('isDisplayDelete should return true if status is 5', () => {
    expect(isDisplayDelete(5)).toBe(true);
    expect(isDisplayDelete(1)).toBe(false);
  });

  test('isDisplayEditId should return true if status is 1 or 2', () => {
    expect(isDisplayEditId(1)).toBe(true);
    expect(isDisplayEditId(2)).toBe(true);
    expect(isDisplayEditId(3)).toBe(false);
  });
});
