import { z } from 'zod';

export const GenderEnum = z.enum(['male', 'female']);
export type Gender = z.infer<typeof GenderEnum>;

export const UserProfileSchema = z.object({
  nickname: z.string().min(1, '닉네임은 필수입니다.'),
  birthday: z
    .union([z.coerce.date(), z.literal('')]) // 빈 문자열도 허용
    .nullable()
    .optional(),
  gender: GenderEnum.nullish(),
  skill: z.object({
    generalSkills: z.array(z.string()).min(1, '기술스택은 1개 이상 선택해야 합니다.'),
    customSkills: z.array(z.string()),
  }),
  desirePositions: z
    .array(z.string())
    .max(1, '희망 직무는 하나만 선택할 수 있습니다.')
    .min(1, '희망 직무를 선택해주세요.'),
  experienceYears: z.number().int().nonnegative(),
  customInterest: z.unknown().nullish(),
  customPosition: z.unknown().nullish(),
  profileImage: z
    .instanceof(File)
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), {
      message: 'JPEG, JPG, PNG 형식만 허용됩니다.',
    })
    .optional()
    .nullable(),
  summary: z.string().max(1000).nullish(),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;
