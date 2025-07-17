import { z } from 'zod';

export const UserProfileSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  birthday: z.string().nullable(),
  gender: z.string().nullable(),
  customSkill: z.string().nullable(),
  customInterest: z.string().nullable(),
  customPosition: z.string().nullable(),
  experienceYears: z.number().int().nonnegative(),
  employmentStatus: z.string().nullable(),
  imageUrl: z.string().nullable(),
  summary: z.string().nullable(),
  updatedAt: z.string(),
  skill: z.object({
    generalSkills: z.array(z.string()).default([]),
    customSkills: z.array(z.string()).default([]),
  }),
  user: z.object({
    userSkills: z
      .array(
        z.object({
          skill: z.object({
            id: z.string(),
            name: z.string(),
          }),
        }),
      )
      .default([]),
    desirePositions: z
      .array(
        z.object({
          position: z.object({
            id: z.string(),
            name: z.string(),
          }),
        }),
      )
      .default([]),
  }),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;
