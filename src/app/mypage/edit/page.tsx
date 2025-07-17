'use client';

import { useRouter } from 'next/navigation';

import RegisterProfileSection from '@/features/registerProfile/RegisterProfileSection';

export default function EditMyPage() {
  const router = useRouter();

  const handleSave = () => {
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
