'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';
import ViewProfileSection from './MyPageViewSection';

export type ProfileData = UserProfileType & {
  contact?: string;
};

export default function MyPageSection() {
  const [activeTab, setActiveTab] = useState<'resume' | 'project'>('resume');
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found!');

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/profiles`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();
        console.log(data.profile);
        setProfile(data.profile);
      } catch {
        setProfile(null);
      } finally {
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="min-h-[calc(100vh-155px)] mt-16">
      {profile && (
        <ViewProfileSection
          profile={profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onEditClick={() => router.push('/mypage/edit')}
        />
      )}
    </div>
  );
}
