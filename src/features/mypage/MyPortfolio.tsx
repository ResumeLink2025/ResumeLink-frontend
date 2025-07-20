import { ProjectProfileCard, ResumeProfileCard } from '../components';
import useMyPortfolioList from './hooks/useMyPagehooks';

interface MyPortfolioProps {
  activeTab: 'resume' | 'project';
}

export default function MyPortfolio({ activeTab }: MyPortfolioProps) {
  const { resumeList, projectList, loading } = useMyPortfolioList();

  if (loading) return <div>로딩중...</div>;

  return (
    <div
      className="
        w-full
        max-w-7xl 
        mx-auto
        px-4        
        py-10      
      "
    >
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-x-8      
          gap-y-12    
          justify-items-center
        "
      >
        {activeTab === 'resume'
          ? resumeList?.map((resume) => <ResumeProfileCard key={resume.id} {...resume} />)
          : projectList?.map((project) => <ProjectProfileCard key={project.id} {...project} />)}
      </div>
    </div>
  );
}
