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

export type DevelopExperienceType = {
  id: number;
  year: string;
};

export type DevelopOccupationType = {
  id: number;
  occupation: string;
};

export const DEVELOP_EXPERIENCE = Array.from({ length: 12 }).map((_, idx) => ({
  id: idx,
  year: `${idx === 0 ? '신입' : idx > 10 ? '10년차 이상' : `${idx}년차`}`,
}));

export const DEVELOP_OCCUPATION = [
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
