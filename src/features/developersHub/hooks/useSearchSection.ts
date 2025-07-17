import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const useSearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputSearch, setInputSearch] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const onClickSearchKeyword = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('searchTerm', inputSearch);
    router.push(`?${params.toString()}`);

    setInputSearch('');
  };

  return {
    inputSearch,
    onChangeSearch,
    onClickSearchKeyword,
  };
};

export default useSearchSection;
