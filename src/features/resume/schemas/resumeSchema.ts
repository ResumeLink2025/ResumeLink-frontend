import { z } from 'zod';

export const resumeFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해야 합니다.'),
  summary: z.string().min(50, '자기 소개는 최소 50글자 이상이어야 합니다.'),
  experienceNote: z.string().min(50, '개발 관련 경험은 최소 50글자 이상이어야 합니다.'),
  categories: z
    .array(z.string())
    .min(1, '개발자 카테고리는 1개 이상 선택해야 합니다.')
    .max(5, '개발자 카테고리는 5개까지만 선택 가능합니다.'),
  skills: z.array(z.string()).optional(),
  positions: z.string().optional(),
  projects: z
    .array(
      z.object({
        id: z.string(),
        createdAt: z.string(),
        endDate: z.string(),
        isPublic: z.boolean(),
        projectDesc: z.string(),
        projectName: z.string(),
        projectNumber: z.number(),
        role: z.string(),
        skill: z.object({
          customSkills: z.array(z.string()),
          generalSkills: z.array(z.string()),
        }),
        startDate: z.string(),
        status: z.string(),
        tags: z.array(z.string()),
        updatedAt: z.string(),
      }),
    )
    .min(1, '프로젝트는 1개 이상 선택해야 합니다.'),
  activities: z
    .array(
      z.object({
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  certificates: z
    .array(
      z.object({
        name: z.string(),
        date: z.string(),
        grade: z.string(),
        issuer: z.string(),
      }),
    )
    .optional(),
  theme: z.string(),
  isPublic: z.boolean(),
});

export type ResumeFormDataType = z.infer<typeof resumeFormSchema>;
