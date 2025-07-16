import { z } from 'zod';

export const projectFormSchema = z.object({
  projectImage: z
    .union([
      z.instanceof(File).refine((file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), {
        message: 'JPEG, JPG, PNG 형식만 허용됩니다.',
      }),
      z.string().url(),
      z.null(),
    ])
    .optional(),
  projectName: z.string().nonempty('프로젝트 이름 작성은 필수입니다.'),
  startDate: z.string().nonempty('프로젝트 시작 날짜를 입력해주세요.'),
  endDate: z.string(),
  status: z.string().nonempty('프로젝트 진행 상태를 선택해주세요.'),
  projectDesc: z.string().min(30, '프로젝트 소개는 최소 30글자 이상이어야 합니다.'),
  role: z.string().min(30, '프로젝트에서 맡은 역할 소개는 최소 30글자 이상이어야 합니다.'),
  skill: z.object({
    generalSkills: z.array(z.string()).min(1, '기술스택은 1개 이상 선택해야 합니다.'),
    customSkills: z.array(z.string()),
  }),
  tags: z.array(z.string()),
  isPublic: z.boolean(),
});

export type ProjectFormDataType = z.infer<typeof projectFormSchema>;
