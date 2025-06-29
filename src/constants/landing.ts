import { FileText, UserRoundPen, UserRoundSearch } from 'lucide-react';

export const HOW_IT_WORKS_EXPLAIN = [
  {
    id: 1,
    title: '로그인/회원가입 을 통해 ResumeLink에 가입하세요!',
    description:
      'Google이나 Kakao계정으로 간편하게 가입할 수 있어요! ResumeLink에서 제공하는 소셜 로그인을 이용한 가입도 가능해요!',
    image: '/images/login.png',
  },
  {
    id: 2,
    title: '진행했던 프로젝트나, 진행 중인 프로젝트를 소개하는 글 작성하기',
    description:
      '프로젝트를 등록하면 더욱 구체적인 이력서를 작성할 수 있어요. 또한 커피챗 요청이 성공할 확률도 늘어나요! 커피챗에 관한 내용은 잠시 후 자세히 설명해 드릴게요.',
    image: '/images/write-project.png',
  },
  {
    id: 3,
    title: '이력서 작성하기',
    description:
      '프로젝트, 나와 맞는 개발 카테고리, 개발 경험을 작성하면 이력서가 생성돼요! 이력서는 언제든지 수정할 수 있어요.',
    image: '/images/write-resume.png',
  },
  {
    id: 4,
    title: '커피챗 신청하기',
    description:
      '마음에 드는 이력서나 프로젝트가 있다면 커피챗을 신청할 수 있어요. 커피챗이란 부담 없이 정보를 묻고 답하는 문화를 말해요. 커피챗 신청이 수락되면 채팅창으로 이동돼요!',
    image: '/images/coffee-chat.png',
  },
];

export const FEATURES_EXPLAIN = [
  {
    id: 1,
    title: '커피챗 신청하기',
    icon: UserRoundPen,
    description:
      '마음에 드는 이력서를 발견했다면, 이력서를 작성한 개발자분에게 커피챗을 신청해 보세요. 신청이 수락되면 커피챗 채팅창으로 연결되고 자유롭게 이야기를 나눌 수 있어요.',
  },
  {
    id: 2,
    title: '개발자 프로필 열람하기',
    icon: UserRoundSearch,
    description:
      '다른 개발자분의 프로필 페이지를 방문해 보세요. 개발자분이 작성한 모든 이력서와 프로젝트를 한눈에 확인할 수 있어요.',
  },
  {
    id: 3,
    title: '나만의 이력서 스크랩',
    icon: FileText,
    description:
      '마음에 드는 이력서나 프로젝트가 있다면 ‘좋아요’를 눌러보세요. 좋아요를 누른 프로젝트나 이력서는 마이페이지의 스크랩 탭에서 언제든지 다시 확인할 수 있어요.',
  },
];
