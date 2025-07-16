export const FILTER_OPTIONS = [
  {
    label: '최신순',
    value: 'latest',
  },
  {
    label: '인기순',
    value: 'popular',
  },
];

export type DevelopOccupationType = {
  id: number;
  occupation: string;
};

export type DevelopSkillType = {
  id: number;
  skill: string;
};

export const DEVELOP_OCCUPATIONS = [
  { id: 0, occupation: '프론트엔드 개발자' },
  { id: 1, occupation: '백엔드 개발자' },
  { id: 2, occupation: '풀스택 개발자' },
  { id: 3, occupation: '웹 개발자' },
  { id: 4, occupation: '모바일 앱 개발자' },
  { id: 5, occupation: 'iOS 개발자' },
  { id: 6, occupation: '안드로이드 개발자' },
  { id: 7, occupation: '임베디드 개발자' },
  { id: 8, occupation: '게임 개발자' },
  { id: 9, occupation: 'AI 엔지니어' },
  { id: 10, occupation: '데이터 엔지니어' },
  { id: 11, occupation: '데이터 사이언티스트' },
  { id: 12, occupation: '머신러닝 엔지니어' },
  { id: 13, occupation: '딥러닝 엔지니어' },
  { id: 14, occupation: 'DevOps 엔지니어' },
  { id: 15, occupation: '클라우드 엔지니어' },
  { id: 16, occupation: '보안 엔지니어' },
  { id: 17, occupation: 'QA 엔지니어' },
  { id: 18, occupation: '테스트 자동화 엔지니어' },
  { id: 19, occupation: '소프트웨어 엔지니어' },
  { id: 20, occupation: '시스템 엔지니어' },
  { id: 21, occupation: '네트워크 엔지니어' },
  { id: 22, occupation: 'DBA (데이터베이스 관리자)' },
  { id: 23, occupation: '크로스플랫폼 앱 개발자' },
  { id: 24, occupation: 'VR/AR 개발자' },
  { id: 25, occupation: '로보틱스 엔지니어' },
  { id: 26, occupation: '블록체인 개발자' },
  { id: 27, occupation: '스크럼 마스터' },
  { id: 28, occupation: '기술 리드' },
];

export const DEVELOP_SKILLS = [
  { id: 0, skill: 'JavaScript' },
  { id: 1, skill: 'TypeScript' },
  { id: 2, skill: 'React' },
  { id: 3, skill: 'Next.js' },
  { id: 4, skill: 'Vue.js' },
  { id: 5, skill: 'Node.js' },
  { id: 6, skill: 'Express' },
  { id: 7, skill: 'HTML' },
  { id: 8, skill: 'CSS' },
  { id: 9, skill: 'Sass' },
  { id: 10, skill: 'Tailwind CSS' },
  { id: 11, skill: 'Redux' },
  { id: 12, skill: 'Zustand' },
  { id: 13, skill: 'React Query' },
  { id: 14, skill: 'GraphQL' },
  { id: 15, skill: 'Apollo' },
  { id: 16, skill: 'Firebase' },
  { id: 17, skill: 'MongoDB' },
  { id: 18, skill: 'MySQL' },
  { id: 19, skill: 'PostgreSQL' },
  { id: 20, skill: 'Docker' },
  { id: 21, skill: 'AWS' },
  { id: 22, skill: 'Git' },
  { id: 23, skill: 'Jest' },
  { id: 24, skill: 'Cypress' },
  { id: 25, skill: 'Python' },
  { id: 26, skill: 'Java' },
  { id: 27, skill: 'C#' },
  { id: 28, skill: 'Kotlin' },
  { id: 29, skill: 'Swift' },
];
