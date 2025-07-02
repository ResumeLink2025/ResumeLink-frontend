import { z } from 'zod';

export const resumeFormSchema = z.object({
  introduction: z
    .string()
    .min(50, '자기 소개는 최소 50글자 이상이어야 합니다.')
    .nonempty('자기 소개는 필수입니다.'),
  selectedCategories: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
      }),
    )
    .min(1, '개발자 카테고리는 1개 이상 선택해야 합니다.')
    .max(5, '개발자 카테고리는 5개까지만 선택 가능합니다.'),
  selectedProjects: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
      }),
    )
    .min(1, '프로젝트는 1개 이상 선택해야 합니다.'),
  experience: z
    .string()
    .min(50, '개발 관련 경험은 최소 50글자 이상이어야 합니다.')
    .nonempty('개발 관련 경험 작성은 필수이니다.'),
});

export type ResumeFormDataType = z.infer<typeof resumeFormSchema>;
