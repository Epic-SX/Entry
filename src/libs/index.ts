import { Option } from '@/constants/options';
import moment from 'moment';

export const formatDateHourMinute = (date: string) => {
  if (!date) {
    return '';
  }
  return moment(date).format('YYYY-MM-DD HH:mm');
};
export const formatDate = (date: string) => {
  if (!date) {
    return '';
  }
  return moment(date).format('YYYY-MM-DD');
};
export const getActiveEnv = () => {
  const activeEnv = process.env.NEXT_PUBLIC_ACTIVE_ENV;
  return activeEnv;
};
export const isDevEnv = () => getActiveEnv() === 'local';

export const isTestEnv = () => getActiveEnv() === 'test';

export const isProdEnv = () => getActiveEnv() === 'prod';

export const isHidenNameAlp = (config: any, locale: string) => {
  return config.hiden && config.hiden === 'en' && locale === 'en';
};

export const isNumberValid = (value: any) => {
  if (value && typeof value === 'number' && !isNaN(value)) {
    return true;
  } else {
    return false;
  }
};

export const isDisplayStatus = (
  status: number | undefined,
  ...statusArray: number[]
) => {
  if (!status) {
    return false;
  }
  return statusArray.includes(status);
};
export const isDisplayEditExamDateAndResult = (status: number | undefined) => {
  return status && [1, 2].includes(status);
};
export const formTimeToHHMM = (time: string) => {
  if (!time) {
    return '';
  }
  const timeArray = time.split(':');
  return `${timeArray[0]}:${timeArray[1]}`;
};
export const isDisplayEditStatus = (status: number | undefined) => {
  return isDisplayStatus(status, 3, 4, 99);
};
export const isDisplayDelete = (status: number | undefined) => {
  return isDisplayStatus(status, 5);
};
export const isDisplayEditId = (status: number | undefined) => {
  return isDisplayStatus(status, 1, 2);
};
export const getLabelOption = (value: string, options: Option[]) => {
  if (!value || !options) {
    return '';
  }
  return options.find((option) => option.value == value)?.label || '';
};
