export const RESUME_RESPONSE = {
  id: 1,
  imageUrl:
    'https://fastly.picsum.photos/id/1079/200/200.jpg?hmac=1ufYwVqTHDtGZw0aD-rsTU5gv74qWxm5-k7xQYkSeig',
  title: '이상진',
  email: 'dltkdwls60202@gmail.com',
  summary:
    '웹 서비스 개발을 다수 경험하며 복잡한 문제를 명확한 구조로 정리하는 데 집중해왔습니다. 특히 사용자 인증, 데이터 흐름, 실시간 통신처럼 서비스의 핵심 기능을 안정적으로 설계하고 유지하는 과정에 깊은 흥미를 느껴왔습니다. 플랫폼 전체 구조에 대한 경험은 아직 부족하지만, 다양한 서비스 구현 경험을 바탕으로 점차 복잡도를 감당할 수 있는 설계와 아키텍처적 감각을 키워가고 있습니다.',
  experienceNote: '플랫폼 서비스, 사용자 인증/권한 시스템, 데이터 기반 피드 시스템을 개발한 경험이 있습니다.',
  isPublic: true,
  theme: 'white',
  createdAt: '2025-07-05',
  updatedAt: '2025-07-05',
  categories: [{ name: '문제해결 능력 우수' }, { name: '커뮤니케이션 우수' }, { name: '꼼꼼함' }],
  skills: [
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'express' },
    { name: 'ReactJs' },
    { name: 'NextJs' },
    { name: 'tailwindCSS' },
    { name: 'tanstack-query' },
  ],
  positions: [{ name: '백엔드 개발자' }, { name: 'DevOps 개발자' }],
  projects: [
    {
      title: 'TechBook – 기술 공유 커뮤니티 플랫폼',
      startDate: '2025-01-21',
      endDate: '2025-03-21',
      description: `사용자들이 개발 관련 게시글을 작성하고 북마크할 수 있는 커뮤니티 서비스 구축하였습니다.
                    OAuth2 기반 소셜 로그인 및 JWT 토큰 인증 시스템 구현하였습니다.
                    게시글 필터링, 태그 분류, 인기글 추천 알고리즘 설계하였습니다.
                    조회수가 많은 게시글에 대해 Redis 캐싱을 적용하여, 자주 호출되는 데이터에 대한 DB 접근 빈도를 낮추고 응답 속도를 개선하였습니다.
                    게시글 검색 쿼리 성능 튜닝을 위해 GIN 인덱스를 활용하였습니다.`,
    },
    {
      title: 'RecruitMe – 채용 공고 통합 서비스',
      startDate: '2025-04-21',
      endDate: '2025-07-21',
      description: `다양한 기업의 채용 데이터를 크롤링 및 통합하여 사용자에게 제공하는 웹 서비스 개발하였습니다.
                    기업별 채용 정보 포맷이 상이하여 파싱 로직을 통합적으로 관리할 수 있는 모듈을 설계하였습니다.
                    일정 주기 배치 작업을 통해 최신 데이터를 수집 및 정렬하였습니다.
                    프로젝트 초기에 사용하던 MySQL의 JOIN 구조가 복잡해지는 문제를 겪고, PostgreSQL로 마이그레이션을 진행하여 관계 구조를 단순화하고 정합성을 강화하였습니다.`,
    },
  ],
  activities: [
    {
      title: '주식회사 주식회사',
      startDate: '2024-10-18',
      endDate: '2025-01-08',
      description: `사내 웹사이트가 어떻게 운영되는지 공부했습니다.
                    아토믹 디자인 패턴을 바탕으로 디자인 시스템을 개발하고 배포하였습니다.
                    디자인 시스템을 적용하였습니다.
                    스마트폼이라는 서비스의 사업목적 부분을 리뉴얼 하였습니다.`,
    },
    {
      title: '프로그래머스 웹 풀스택 데브코스 [6기]',
      startDate: '2025-01-21',
      endDate: '2025-07-21',
      description: `웹 기초에 대해 배웠습니다.
                      express, mysql, react를 활용하여 도서관리 웹 서비스를 개발하였습니다.
                      docker 사용법에 대해 배웠습니다.
                      팀 프로젝트를 통해 협업하는 방법을 배웠습니다.`,
    },
  ],
  certificates: [
    {
      title: 'AZURE 900',
      date: '2023-07-02',
      issuer: 'Microsoft',
      grade: 850,
    },
    {
      title: '정보처리 산업기사',
      date: '2023-06-13',
      issuer: '한국산업인력공단',
      grade: 84.9,
    },
  ],
};
