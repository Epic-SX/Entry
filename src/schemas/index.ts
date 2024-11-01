import {
  address_regex,
  alpha_ex_regex,
  email_regex,
  message,
  tel_regex,
  year_regex,
  zenkaku_kana_regex,
  zipcode_regex,
} from '@/constants';
import { useTranslations } from 'next-intl';
import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().trim().min(1, message.login.email_required).email({
    message: message.login.email_invalid,
  }),
  password: z.string().trim().min(1, message.login.password_required),
});

export const useLoginSchema = () => {
  const tValidation = useTranslations('FormValidation');
  const tFormLabel = useTranslations('LoginForm');
  const schema = z.object({
    email: z
      .string()
      .trim()
      .min(1, tValidation('required', { field: tFormLabel('email') }))
      .email({
        message: tValidation('email_invalid'),
      }),
    password: z
      .string()
      .trim()
      .min(1, tValidation('required', { field: tFormLabel('password') })),
  });
  type LoginFormDataType = z.infer<typeof schema>;
  return { schema, loginType: {} as LoginFormDataType };
};

export type TLoginRequest = z.infer<typeof LoginSchema>;

export const SendMailSchema = z.object({
  mail: z.string().trim().min(1, message.email_required).email({
    message: message.email_invalid,
  }),
});
export type TSendMailRequest = z.infer<typeof SendMailSchema>;

export const TourRegistSchema = z
  .object({
    tour_id: z.string().trim().min(1, {
      message: 'required_select',
    }),
    last_guardian_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    first_guardian_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    last_guardian_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    first_guardian_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    last_child_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    first_child_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    last_child_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    first_child_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    child_sex: z.string().trim().min(1, {
      message: 'required_select',
    }),
    child_birthday: z.string().min(1, {
      message: 'required_general',
    }),
    zipcode: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zipcode_regex, {
        message: 'zipcode_regex',
      }),
    prefecture: z.string().trim().min(1, {
      message: 'required_select',
    }),
    address: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(address_regex, {
        message: 'address_regex',
      }),
    building: z.string(),
    tel: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(tel_regex, {
        message: 'phone_regex',
      }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(email_regex, {
        message: 'email_invalid',
      }),
    email_check: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(email_regex, {
        message: 'email_invalid',
      }),
    password: z.string().trim().min(1, {
      message: 'required_general',
    }),
    being_in: z.string().trim().min(1, {
      message: 'required_select',
    }),
    trigger: z.string().trim().min(1, {
      message: 'required_select',
    }),
    trigger_other: z.string(),
    entry_will: z.string().trim().min(1, {
      message: 'required_select',
    }),
    entry_year: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(year_regex, {
        message: 'year_regex',
      }),
    entry_month: z.string().trim().min(1, {
      message: 'required_general',
    }),
    other_kindy: z.string().optional(),
    choice_reason: z.string().optional(),
    tour_note: z.string().optional(),
  })
  .refine((data) => data.email === data.email_check, {
    message: 'email_confirm',
    path: ['email_check'],
  });

export type TTourRegistRequest = z.infer<typeof TourRegistSchema>;

export const EntryRegistSchema = z
  .object({
    last_guardian_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    first_guardian_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    last_guardian_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    first_guardian_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    last_child_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    first_child_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    last_child_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    first_child_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    first_child_name_alp: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(alpha_ex_regex, {
        message: 'name_alpha',
      }),
    last_child_name_alp: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(alpha_ex_regex, {
        message: 'name_alpha',
      }),
    child_sex: z.string().trim().min(1, {
      message: 'required_select',
    }),
    child_birthday: z.string().min(1, {
      message: 'required_general',
    }),
    zipcode: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zipcode_regex, {
        message: 'zipcode_regex',
      }),
    prefecture: z.string().trim().min(1, {
      message: 'required_select',
    }),
    address: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(address_regex, {
        message: 'address_regex',
      }),
    building: z.string(),
    tel: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(tel_regex, {
        message: 'phone_regex',
      }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(email_regex, {
        message: 'email_invalid',
      }),
    email_check: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(email_regex, {
        message: 'email_invalid',
      }),
    being_in: z.string().trim().min(1, {
      message: 'required_select',
    }),
    entry_class: z.string().trim().min(1, {
      message: 'required_select',
    }),
    english_exam: z.boolean().default(false),
    entry_year: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(year_regex, {
        message: 'year_regex',
      }),
    entry_month: z.string().trim().min(1, {
      message: 'required_select',
    }),
    total_pledge: z.string().array().min(1, { message: 'pledge' }),
    pledge3: z.string().array().min(1, { message: 'pledge' }),
    pledge4: z.string().array().min(1, { message: 'pledge' }),
    pledge6: z.string().array().min(1, { message: 'pledge' }),
    pledge7: z.string().array().min(1, { message: 'pledge' }),
    guardian_id: z.string().optional(),
    child_id: z.string().optional(),
  })
  .refine((data) => data.email === data.email_check, {
    message: 'email_confirm',
    path: ['email_check'],
  });

export type TEntryRegistRequest = z.infer<typeof EntryRegistSchema>;

export const getEntrySchema = (locale: string) => {
  const baseSchema = {
    last_guardian_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    first_guardian_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    last_guardian_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    first_guardian_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    last_child_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    first_child_name: z.string().trim().min(1, {
      message: 'required_general',
    }),
    last_child_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    first_child_name_kana: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zenkaku_kana_regex, {
        message: 'zenkaku_kana',
      }),
    child_sex: z.string().trim().min(1, {
      message: 'required_select',
    }),
    child_birthday: z.string().min(1, {
      message: 'required_general',
    }),
    zipcode: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(zipcode_regex, {
        message: 'zipcode_regex',
      }),
    prefecture: z.string().trim().min(1, {
      message: 'required_select',
    }),
    address: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(address_regex, {
        message: 'address_regex',
      }),
    building: z.string(),
    tel: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(tel_regex, {
        message: 'phone_regex',
      }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(email_regex, {
        message: 'email_invalid',
      }),
    email_check: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(email_regex, {
        message: 'email_invalid',
      }),
    being_in: z.string().trim().min(1, {
      message: 'required_select',
    }),
    entry_class: z.string().trim().min(1, {
      message: 'required_select',
    }),
    entry_class_sub: z.string(),
    entry_date: z.optional(z.string()),
    english_exam: z.boolean().default(false),
    entry_year: z
      .string()
      .trim()
      .min(1, {
        message: 'required_general',
      })
      .regex(year_regex, {
        message: 'year_regex',
      }),
    entry_month: z.string().trim().min(1, {
      message: 'required_select',
    }),
    total_pledge: z.string().array().min(1, { message: 'pledge' }),
    pledge3: z.string().array().min(1, { message: 'pledge' }),
    pledge4: z.string().array().min(1, { message: 'pledge' }),
    pledge6: z.string().array().min(1, { message: 'pledge' }),
    pledge7: z.string().array().min(1, { message: 'pledge' }),
    guardian_id: z.string().optional(),
    child_id: z.string().optional(),
  };
  const schema =
    locale === 'en'
      ? 
      baseSchema
      : {
          ...baseSchema,
          first_child_name_alp: z
            .string()
            .trim()
            .min(1, {
              message: 'required_general',
            })
            .regex(alpha_ex_regex, {
              message: 'name_alpha',
            }),
          last_child_name_alp: z
            .string()
            .trim()
            .min(1, {
              message: 'required_general',
            })
            .regex(alpha_ex_regex, {
              message: 'name_alpha',
            }),
        };
  return z
    .object(schema)
    .refine((data) => data.email === data.email_check, {
      message: 'email_confirm',
      path: ['email_check'],
    })
    .refine(
      (data) => {
        if (data.entry_class === '3') {
          return !!data.entry_class_sub;
        }
        return true;
      },
      {
        message: 'required_select',
        path: ['entry_class_sub'],
      },
    );
};

const MAX_FILE_SIZE = 4000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
];

export const Photo1Schema = z.object({
  photo1: z
    .custom<FileList>()
    .refine((file) => file && file.length !== 0, { message: 'file_required' })
    .transform((file) => file[0])
    .refine((file) => file && file.size < MAX_FILE_SIZE, {
      message: 'file_over_size',
    })
    .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'file_invalid',
    }),
});
export const Photo2Schema = z.object({
  photo2: z
    .custom<FileList>()
    .refine((file) => file && file.length !== 0, { message: 'file_required' })
    .transform((file) => file[0])
    .refine((file) => file && file.size < MAX_FILE_SIZE, {
      message: 'file_over_size',
    })
    .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'file_invalid',
    }),
});
export type Photo1Request = z.infer<typeof Photo1Schema>;

export type Photo2Request = z.infer<typeof Photo2Schema>;

export const ExamDateFormSchema = z.object({
  exam_date: z.string().min(1, { message: '日付けを入力してください' }),
  exam_time: z.string().min(1, { message: '時刻を入力してください' }),
  memo: z.string().optional(),
  title: z
    .string()
    .min(1, { message: '考査レーンを選択してください' })
    .transform((value) => (value === null ? '' : value)),
  zoom_url: z.string().optional(),
});

export type ExamDateRequest = z.infer<typeof ExamDateFormSchema>;

export type ExamStatusSchema = {
  status: string;
  receipt_date?: string;
};
