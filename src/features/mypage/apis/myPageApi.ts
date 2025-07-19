import { get } from '@/apis/httpClient';
import type { ProjectDetailType } from '@/constants/project';
import type { ResumeDetailType } from '@/constants/resume';

export async function fetchMyResumes() {
  return await get<ResumeDetailType[]>('/api/resumes');
}

export async function fetchMyProjects() {
  return await get<ProjectDetailType[]>('/api/projects');
}
