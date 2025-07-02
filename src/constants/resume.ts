export const USER_INFO = {
  id: 2,
  name: '이상진',
  image: 'https://fastly.picsum.photos/id/616/200/200.jpg?hmac=QEzyEzU6nVn4d_vdALhsT9UAtTUEVhwrT-kM5ogBqKM',
  interested: ['프론트엔드 개발', '풀스택 개발'],
  skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next', 'Express'],
};

type CategoryType = { id: number; title: string };

export type DeveloperCategoryType = CategoryType;

export const DEVELOPER_CATEGORY = [
  { id: 0, title: '문제 해결사' },
  { id: 1, title: '꼼꼼한 디버거' },
  { id: 2, title: '빠른 학습자' },
  { id: 3, title: '팀 플레이어' },
  { id: 4, title: '리더십 보유자' },
  { id: 5, title: '창의적인 사고' },
  { id: 6, title: '사용자 중심 사고' },
  { id: 7, title: '기술 혁신 추구자' },
  { id: 8, title: '커뮤니케이션 능력 우수' },
  { id: 9, title: '문서화 철저자' },
  { id: 10, title: '자동화 애호가' },
  { id: 11, title: '오픈소스 참여자' },
  { id: 12, title: '지속적 통합/배포 경험자' },
  { id: 13, title: '테스트 주도 개발자' },
  { id: 14, title: '보안 의식 강한 개발자' },
  { id: 15, title: '자기 주도적 학습자' },
  { id: 16, title: '새로운 기술 탐험가' },
  { id: 17, title: '성능 최적화 전문가' },
  { id: 18, title: '유지보수 용이성 중시' },
  { id: 19, title: '코드 품질 중시' },
];

export type UserProjectType = CategoryType;

export const USER_PROJECT_LIST = [
  { id: 0, title: '쪼잉 (사이드 프로젝트 모집 서비스)' },
  { id: 1, title: 'BSM ROADMAP (학교 근처에있는 IT 회사 채용 정보 제공 서비스)' },
  { id: 2, title: 'BSM.GG (교내 리그오브레전드 전적 검색 서비스)' },
];
