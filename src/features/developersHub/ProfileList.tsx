import useGetResumeList from '@/hooks/apis/resume/useGetResumeList';

import { ProfileCard } from '../components';

interface ProfileListProps {
  listType: string;
}

const ProfileList = ({ listType }: ProfileListProps) => {
  const { data: resumeList } = useGetResumeList(listType);

  return (
    <div className="grid grid-cols-5 gap-4 py-15">
      {resumeList?.map((resume) => (
        <ProfileCard key={resume.id} {...resume} />
      ))}
    </div>
  );
};

export default ProfileList;
