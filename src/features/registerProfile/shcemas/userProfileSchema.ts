import { z } from 'zod';

export const UserProfileSchema = z.object({
  id: z.string().optional(), // DB PK
  nickname: z.string(),
  birthday: z.string().nullable(),
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
  userSkills: z.array(z.string()),
  desirePositions: z.array(z.string()),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;
