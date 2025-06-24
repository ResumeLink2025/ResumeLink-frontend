'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [contents, setContents] = useState('기본 내용');

  useEffect(() => {
    setContents('내용 추가함');
  }, []);

  console.log('contents', contents);

  return <></>;
}
