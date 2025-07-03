import { PROFILE_LIST } from '@/fixtures/profiles';

import { ProfileCard } from '../components';

const ProfileList = () => {
  return (
    <div className="grid grid-cols-5 gap-4 py-15">
      {PROFILE_LIST.map((profile) => (
        <ProfileCard key={profile.id} {...profile} />
      ))}
    </div>
  );
};

export default ProfileList;
