import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useDevelopersHub = () => {
  const params = useSearchParams();
  const [listType, setListType] = useState<string | null>(null);

  useEffect(() => {
    const type = params.get('type');
    setListType(type);
  }, [params]);

  return listType;
};

export default useDevelopersHub;
