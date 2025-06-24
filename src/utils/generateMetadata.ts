import type { Metadata } from 'next';

interface generateMetadataProps {
  title?: string;
  description?: string;
  currentPath?: string;
  image?: string;
}

export const generateMetadata = (metadata?: generateMetadataProps): Metadata => {
  const { title, description, currentPath, image } = metadata || {};

  const TITLE = title || 'ResumeLink';
  const DESCRIPTION =
    description || '작성한 자기소개와 프로젝트를 바탕으로 경쟁력있는 이력서를 만들어 보세요!';
  const URL = `http://localhost:3000${currentPath || ''}`;

  const IMAGE = image ? image : '/images/favicon.svg';

  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['이력서', '커피챗', '프로젝트', '개발자', '커리어'],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      images: {
        url: IMAGE,
      },
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: IMAGE,
      },
    },
  };
};
