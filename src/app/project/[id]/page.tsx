import ProjectDetail from '@/features/project/detail';

interface ProjectDetailPageProps {
  params: { id: string };
}

const ProjectDetailPage = ({ params }: ProjectDetailPageProps) => {
  const { id } = params;

  return <ProjectDetail id={id} />;
};

export default ProjectDetailPage;
