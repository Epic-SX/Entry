import {
  LoginSchema,
  useLoginSchema,
  SendMailSchema,
  TourRegistSchema,
  EntryRegistSchema,
  Photo1Schema,
  Photo2Schema,
  ExamDateFormSchema,
} from '@/schemas';
import { renderHook } from '@testing-library/react';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn().mockReturnValue((key: any) => key),
}));

describe('Validation Schemas', () => {
  describe('LoginSchema', () => {
    it('should validate a correct login object', () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };
      expect(LoginSchema.parse(loginData)).toEqual(loginData);
    });

    it('should return error for invalid email', () => {
      const invalidLoginData = {
        email: 'invalidEmail',
        password: 'password123',
      };
      expect(() => LoginSchema.parse(invalidLoginData)).toThrow();
    });
  });

  describe('useLoginSchema', () => {
    it('should return the login schema and type', () => {
      const { result } = renderHook(() => useLoginSchema());
      const { schema, loginType } = result.current;
      expect(schema).toBeDefined();
      expect(loginType).toBeDefined();
    });

    it('should validate a correct login object', () => {
      const { result } = renderHook(() => useLoginSchema());
      const { schema } = result.current;
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };
      expect(schema.parse(loginData)).toEqual(loginData);
    });
  });

  describe('SendMailSchema', () => {
    it('should validate a correct send mail object', () => {
      const sendMailData = {
        mail: 'test@example.com',
      };
      expect(SendMailSchema.parse(sendMailData)).toEqual(sendMailData);
    });

    it('should return error for invalid email', () => {
      const invalidSendMailData = {
        mail: 'invalidEmail',
      };
      expect(() => SendMailSchema.parse(invalidSendMailData)).toThrow();
    });
  });

  describe('TourRegistSchema', () => {
    const tourRegistData = {
      tour_id: '1',
      last_guardian_name: 'Doe',
      first_guardian_name: 'John',
      last_guardian_name_kana: 'ドウ',
      first_guardian_name_kana: 'ジョン',
      last_child_name: 'Doe',
      first_child_name: 'Jane',
      last_child_name_kana: 'ドウ',
      first_child_name_kana: 'ジェーン',
      child_sex: 'female',
      child_birthday: '2020-01-01',
      zipcode: '123-4567',
      prefecture: 'Tokyo',
      address: '123',
      building: '',
      tel: '080-123-45678',
      email: 'test@example.com',
      email_check: 'test@example.com',
      password: 'password123',
      being_in: 'school',
      trigger: 'ad',
      trigger_other: '',
      entry_will: 'yes',
      entry_year: '2024',
      entry_month: '04',
      other_kindy: '',
      choice_reason: '',
      tour_note: '',
    };
    it('should validate a correct tour registration object', () => {
      expect(TourRegistSchema.parse(tourRegistData)).toEqual(tourRegistData);
    });

    it('should return error for non-matching email fields', () => {
      const invalidTourRegistData = {
        ...tourRegistData,
        email_check: 'mismatch@example.com',
      };
      expect(() => TourRegistSchema.parse(invalidTourRegistData)).toThrow();
    });
  });

  describe('EntryRegistSchema', () => {
    const entryRegistData = {
      last_guardian_name: 'Doe',
      first_guardian_name: 'John',
      last_guardian_name_kana: 'ドウ',
      first_guardian_name_kana: 'ジョン',
      last_child_name: 'Doe',
      first_child_name: 'Jane',
      last_child_name_kana: 'ドウ',
      first_child_name_kana: 'ジェーン',
      first_child_name_alp: 'Jane',
      last_child_name_alp: 'Doe',
      child_sex: 'female',
      child_birthday: '2020-01-01',
      zipcode: '123-4567',
      prefecture: 'Tokyo',
      address: '123',
      building: '',
      tel: '080-123-45678',
      email: 'test@example.com',
      email_check: 'test@example.com',
      being_in: 'school',
      entry_class: 'A',
      entry_year: '2024',
      entry_month: '04',
      total_pledge: ['pledge1'],
      pledge3: ['pledge3'],
      pledge4: ['pledge4'],
      pledge6: ['pledge6'],
      pledge7: ['pledge7'],
    };
    it('should validate a correct entry registration object', () => {
      expect(EntryRegistSchema.parse(entryRegistData)).toEqual(entryRegistData);
    });

    it('should return error for non-matching email fields', () => {
      const invalidEntryRegistData = {
        ...entryRegistData,
        email_check: 'mismatch@example.com',
      };
      expect(() => EntryRegistSchema.parse(invalidEntryRegistData)).toThrow();
    });
  });

  describe('Photo1Schema and Photo2Schema', () => {
    const createMockFile = (name: string, size: number, type: string) => {
      const file = new File([new ArrayBuffer(size)], name, { type });
      return file;
    };

    const validFile = createMockFile('test.jpg', 1024, 'image/jpeg');

    it('should validate a correct photo1 file object', () => {
      const photo1Data = {
        photo1: [validFile],
      };
      expect(Photo1Schema.parse(photo1Data)).toEqual({
        photo1: validFile,
      });
    });
    it('should return error for invalid photo1 file object', () => {
      const invalidFile = createMockFile('test.txt', 1024, 'text/plain');
      const photo1Data = {
        photo1: [invalidFile],
      };
      expect(() => Photo1Schema.parse(photo1Data)).toThrow();
    });

    it('should validate a correct photo2 file object', () => {
      const photo2Data = {
        photo2: [validFile],
      };
      expect(Photo2Schema.parse(photo2Data)).toEqual({
        photo2: validFile,
      });
    });
    it('should return error for invalid photo2 file object', () => {
      const invalidFile = createMockFile('test.txt', 1024, 'text/plain');
      const photo2Data = {
        photo2: [invalidFile],
      };
      expect(() => Photo2Schema.parse(photo2Data)).toThrow();
    });
  });

  describe('ExamDateFormSchema', () => {
    it('should validate a correct exam date form object', () => {
      const examDateData = {
        exam_date: '2024-06-17',
        exam_time: '12:34',
        memo: 'Note',
        title: 'Test title',
        zoom_url: 'http://example.com',
      };
      expect(ExamDateFormSchema.parse(examDateData)).toEqual(examDateData);
    });

    it('should return error for missing required fields', () => {
      const invalidExamDateData = {
        exam_date: '',
        exam_time: '',
        title: '',
      };
      expect(() => ExamDateFormSchema.parse(invalidExamDateData)).toThrow();
    });
  });
});
