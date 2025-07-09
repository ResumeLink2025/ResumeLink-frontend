export interface ImageUploadProps {
  imageUrl: string | null;
  handleUploadFile: (files?: FileList | null) => void;
}

export const genderList = [
  {
    id: 0,
    value: '남성',
    label: '남성',
  },
  {
    id: 1,
    value: '여성',
    label: '여성',
  },
];

export const developerList = [
  { id: 0, value: 'frontend', label: '프론트엔드 개발자' },
  { id: 1, value: 'backend', label: '백엔드 개발자' },
  { id: 2, value: 'fullstack', label: '풀스택 개발자' },
  { id: 3, value: 'mobile', label: '모바일 앱 개발자' },
  { id: 4, value: 'devops', label: 'DevOps 엔지니어' },
  { id: 5, value: 'data', label: '데이터 엔지니어' },
  { id: 6, value: 'ml', label: '머신러닝 엔지니어' },
  { id: 7, value: 'ai', label: 'AI 엔지니어' },
  { id: 8, value: 'game', label: '게임 개발자' },
  { id: 9, value: 'embedded', label: '임베디드 개발자' },
  { id: 10, value: 'security', label: '보안 엔지니어' },
  { id: 11, value: 'qa', label: 'QA 엔지니어' },
  { id: 12, value: 'pm', label: '프로덕트 매니저 (PM)' },
  { id: 13, value: 'designer', label: 'UI/UX 디자이너' },
  { id: 14, value: 'planner', label: '서비스 기획자' },
  { id: 15, value: 'data_scientist', label: '데이터 사이언티스트' },
  { id: 16, value: 'analyst', label: '데이터 애널리스트' },
  { id: 17, value: 'researcher', label: '리서처' },
  { id: 18, value: 'infra', label: '인프라 엔지니어' },
  { id: 19, value: 'cloud', label: '클라우드 엔지니어' },
  { id: 20, value: 'blockchain', label: '블록체인 개발자' },
  { id: 21, value: 'solution_architect', label: '솔루션 아키텍트' },
];

export const yearList = [
  { id: 0, value: '0', label: '취업준비생' },
  { id: 1, value: '1', label: '1년차' },
  { id: 2, value: '2', label: '2년차' },
  { id: 3, value: '3', label: '3년차' },
  { id: 4, value: '4', label: '4년차' },
  { id: 5, value: '5', label: '5년차' },
  { id: 6, value: '6', label: '6년차' },
  { id: 7, value: '7', label: '7년차' },
  { id: 8, value: '8', label: '8년차' },
  { id: 9, value: '9', label: '9년차' },
  { id: 10, value: '10', label: '10년차' },
  { id: 11, value: '11', label: '11년차' },
  { id: 12, value: '12', label: '12년차' },
  { id: 13, value: '13', label: '13년차' },
  { id: 14, value: '14', label: '14년차' },
  { id: 15, value: '15', label: '15년차' },
  { id: 16, value: '16', label: '16년차' },
  { id: 17, value: '17', label: '17년차' },
  { id: 18, value: '18', label: '18년차' },
  { id: 19, value: '19', label: '19년차' },
  { id: 20, value: '20', label: '20년차' },
];
