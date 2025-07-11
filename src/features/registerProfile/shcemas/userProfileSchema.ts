import { z } from 'zod';

/** ────────────────
 *  공통 Enum 정의
 *  Prisma enum과 값·대소문자 반드시 맞추기
 *  ─────────────────*/
export const GenderEnum = z.enum(['MALE', 'FEMALE']);
export type Gender = z.infer<typeof GenderEnum>;

export const EmploymentStatusEnum = z.enum(['EMPLOYED', 'UNEMPLOYED', 'STUDENT', 'FREELANCER', 'OTHER']);
export type EmploymentStatus = z.infer<typeof EmploymentStatusEnum>;

/** ────────────────
 *  UserProfile 스키마
 *  ─────────────────*/
export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  nickname: z.string().min(1, '닉네임은 필수입니다.'),
  birthday: z.coerce.date(), // 문자열·Date 모두 허용 후 Date 변환
  gender: GenderEnum.nullish(),
  customSkill: z.unknown().nullish(), // Json? → 자유 형식
  customInterest: z.unknown().nullish(),
  customPosition: z.unknown().nullish(),
  experienceYears: z.number().int().nonnegative().default(0),
  employmentStatus: EmploymentStatusEnum.nullish(),
  imageUrl: z.string().url().nullish(),
  summary: z.string().max(1000).nullish(),
  updatedAt: z.coerce.date(), // 서버가 채우므로 클라이언트 입력 불필요
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
