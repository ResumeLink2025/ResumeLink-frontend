import { useEffect, useState } from 'react';

import type { ProjectDetailType } from '@/constants/project';
import type { ResumeDetailType } from '@/constants/resume';

import { fetchMyProjects, fetchMyResumes } from '../apis/myPageApi';

export default function useMyPortfolioList() {
  const [resumeList, setResumeList] = useState<ResumeDetailType[]>([]);
  const [projectList, setProjectList] = useState<ProjectDetailType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [resumes, projects] = await Promise.all([fetchMyResumes(), fetchMyProjects()]);
        setResumeList(resumes ?? []);
        setProjectList(projects ?? []);
      } catch {
        setResumeList([]);
        setProjectList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return { resumeList, projectList, loading };
}
