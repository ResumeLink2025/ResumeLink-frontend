import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const useSortProfileSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentType = searchParams.get('type');
  const [sortProfile, setSortProfile] = useState(searchParams.get('sort') || 'popular');

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  }, []);

  const onClickChangeType = (type: string) => {
    router.push(`${pathname}?${createQueryString('type', type)}`);
  };

  const onChangeSortProfile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value;

    setSortProfile(newSortValue);
    router.push(`${pathname}?${createQueryString('sort', newSortValue)}`);
  };

  useEffect(() => {
    setSortProfile(searchParams.get('sort') || 'popular');
  }, [searchParams]);

  return { currentType, sortProfile, onClickChangeType, onChangeSortProfile };
};

export default useSortProfileSection;
