import { ProjectProfileCard, ResumeProfileCard } from '../components';
import useMyPortfolioList from './hooks/useMyPagehooks';

interface MyPortfolioProps {
  activeTab: 'resume' | 'project';
}

export default function MyPortfolio({ activeTab }: MyPortfolioProps) {
  const { resumeList, projectList, loading } = useMyPortfolioList();

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-15 w-full">
      {activeTab === 'resume'
        ? resumeList?.map((resume) => <ResumeProfileCard key={resume.id} {...resume} />)
        : projectList?.map((project) => <ProjectProfileCard key={project.id} {...project} />)}
    </div>
  );
}
