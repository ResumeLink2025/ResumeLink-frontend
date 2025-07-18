import Resume from '@/features/resume';

const UpdateResumePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <Resume id={id} />;
};

export default UpdateResumePage;
