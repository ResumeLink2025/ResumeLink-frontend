import ProjectDetail from '@/features/project/detail';

const ProjectDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ProjectDetail id={id} />;
};

export default ProjectDetailPage;
