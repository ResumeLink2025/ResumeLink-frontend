import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

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

  const onClickResume = () => {
    router.push(`${pathname}?${createQueryString('type', 'resume')}`);
  };

  const onClickProject = () => {
    router.push(`${pathname}?${createQueryString('type', 'project')}`);
  };

  const onChangeSortProfile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value;

    setSortProfile(newSortValue);
    router.push(`${pathname}?${createQueryString('sort', newSortValue)}`);
  };

  return { currentType, sortProfile, onClickResume, onClickProject, onChangeSortProfile };
};

export default useSortProfileSection;
