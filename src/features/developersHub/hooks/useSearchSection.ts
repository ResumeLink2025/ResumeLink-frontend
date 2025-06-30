import { useState } from 'react';

const useSearchSection = () => {
  const [inputSearch, setInputSearch] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const onClickSearchKeyword = () => {
    console.log(inputSearch);
  };

  return {
    inputSearch,
    onChangeSearch,
    onClickSearchKeyword,
  };
};

export default useSearchSection;
