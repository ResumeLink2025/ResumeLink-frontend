'use client';

import { useRouter } from 'next/navigation';

import RegisterProfileSection from '@/features/registerProfile/RegisterProfileSection';

export default function EditMyPage() {
  const router = useRouter();

  // 여기에 API로 받아오는 초기 프로필 값이 들어가야 함. 지금은 예시값!
  //   const [profile, setProfile] = useState<UserProfileType>({
  //     nickname: '홍길동',
  //     birthday: new Date('1990-01-01'),
  //     gender: 'male',
  //     skill: {
  //       generalSkills: ['JavaScript', 'React'],
  //       customSkills: [],
  //     },
  //     desirePositions: ['프론트엔드 개발자'],
  //     experienceYears: 3,
  //     customInterest: null,
  //     customPosition: null,
  //     profileImage: null,
  //     summary: null,
  //   });

  // 저장 버튼 클릭 시
  const handleSave = () => {
    // 1. API로 서버에 저장 로직 추가 필요 (지금은 setState만)

    // 2. 저장 후 마이페이지로 이동
    router.push('/mypage');
  };

  // 취소 버튼 클릭 시
  const handleCancel = () => {
    router.push('/mypage');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <RegisterProfileSection mode="edit" onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
