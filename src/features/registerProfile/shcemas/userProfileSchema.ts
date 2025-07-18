import { z } from 'zod';

// z.record(z.any())는 {}나 null 모두 가능 (OK)
export const UserProfileSchema = z.object({
  id: z.string().optional(), // DB PK
  nickname: z.string(),
  birthday: z.string().nullable(), // string or null (프론트는 Date를 string으로 변환 필요)
  gender: z.string().nullable(),
  customSkill: z.record(z.any()).nullable(),
  customInterest: z.record(z.any()).nullable(),
  customPosition: z.record(z.any()).nullable(),
  experienceYears: z.number().int().nonnegative(),
  employmentStatus: z.string().nullable(),
  imageUrl: z.string().nullable(),
  summary: z.string().nullable(),
  profileImage: z.any().optional(),
  updatedAt: z.string().optional(),
  userSkills: z.array(z.string()), // ★백엔드가 원하는 string[] 그대로
  desirePositions: z.array(z.string()), // ★백엔드가 원하는 string[] 그대로
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;
