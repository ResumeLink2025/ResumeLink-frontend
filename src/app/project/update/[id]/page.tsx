import Project from '@/features/project';

const UpdateProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <Project id={id} />;
};

export default UpdateProjectPage;
