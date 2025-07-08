export const USER_INFO = {
  id: 2,
  name: '이상진',
  image: 'https://fastly.picsum.photos/id/616/200/200.jpg?hmac=QEzyEzU6nVn4d_vdALhsT9UAtTUEVhwrT-kM5ogBqKM',
  positions: ['프론트엔드 개발', '풀스택 개발'],
  skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next', 'Express'],
};

export const DEVELOPER_CATEGORY = [
  '문제 해결사',
  '꼼꼼한 디버거',
  '빠른 학습자',
  '팀 플레이어',
  '리더십 보유자',
  '창의적인 사고',
  '사용자 중심 사고',
  '기술 혁신 추구자',
  '커뮤니케이션 능력 우수',
  '문서화 철저자',
  '자동화 애호가',
  '오픈소스 참여자',
  '지속적 통합/배포 경험자',
  '테스트 주도 개발자',
  '보안 의식 강한 개발자',
  '자기 주도적 학습자',
  '새로운 기술 탐험가',
  '성능 최적화 전문가',
  '유지보수 용이성 중시',
  '코드 품질 중시',
];

export type UserProjectType = {
  id: number;
  projectName: string;
  projectDesc: string;
  startDate: string;
  endDate: string;
  role: string;
  generalSkills: string[];
  customSkills: string[];
};

export const USER_PROJECT_LIST = [
  {
    id: 0,
    projectName: '쪼잉 (사이드 프로젝트 모집 서비스)',
    projectDesc: '쪼잉은 사이드 프로젝트 모집 서비스입니다.',
    startDate: '2023-06-01',
    endDate: '2023-10-21',
    role: '유저 팔로워 팔로잉 기능과 프로젝트 모집 관련 기능을 구현하였습니다.',
    generalSkills: ['React', 'TypeScript'],
    customSkills: ['react-hook-form'],
  },
  {
    id: 1,
    projectName: 'BSM ROADMAP (학교 근처에 있는 IT 회사 채용 정보 제공 서비스)',
    projectDesc:
      'BSM ROADMAP은 재학생들을 위해 학교 근처 IT 기업들의 채용 정보를 한눈에 확인할 수 있도록 만든 서비스입니다.',
    startDate: '2023-11-01',
    endDate: '2024-01-15',
    role: '채용 공고 크롤링 및 목록 조회, 필터 기능을 구현하였습니다.',
    generalSkills: ['Next.js', 'TypeScript'],
    customSkills: ['React Query', 'Tailwind CSS'],
  },
  {
    id: 2,
    projectName: 'BSM.GG (교내 리그오브레전드 전적 검색 서비스)',
    projectDesc: 'BSM.GG는 교내 리그오브레전드 유저들의 전적을 검색하고 랭킹을 확인할 수 있는 서비스입니다.',
    startDate: '2024-03-01',
    endDate: '2024-05-10',
    role: '소환사 전적 검색 및 랭킹 시스템, Riot API 연동 기능을 구현하였습니다.',
    generalSkills: ['React', 'TypeScript'],
    customSkills: ['Riot API', 'Zustand'],
  },
];

export const THEME_OPTIONS = [
  { label: '밝은 화면의 이력서', value: 'light' },
  { label: '어두운 화면의 이력서', value: 'dark' },
];
