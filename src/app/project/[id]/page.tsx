import ProjectDetail from '@/features/project/detail';

interface ProjectDetailPageProps {
  params: { id: string };
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { id } = await params;

  return <ProjectDetail id={id} />;
};

export default ProjectDetailPage;
