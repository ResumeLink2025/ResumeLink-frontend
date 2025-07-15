import Project from '@/features/project';

interface UpdateProjectPageProps {
  params: { id: string };
}

const UpdateProjectPage = async ({ params }: UpdateProjectPageProps) => {
  const { id } = await params;

  return <Project id={id} />;
};

export default UpdateProjectPage;
