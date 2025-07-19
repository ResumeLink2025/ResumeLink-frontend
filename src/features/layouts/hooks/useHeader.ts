import { useEffect, useState } from 'react';

import { useAuthStore } from '@/app/store/useAuthStore';
import { ACCESS_TOKEN } from '@/constants/token';
import LocalStorage from '@/utils/localStorage';

const useHeader = () => {
  const { isLoggedIn, setLogout, setLogin } = useAuthStore();

  const [isMounted, setIsMounted] = useState(false);

  const handleLogout = () => {
    LocalStorage.removeItem(ACCESS_TOKEN);
    setLogout();
  };

  useEffect(() => {
    setIsMounted(true);

    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setLogin(storedAccessToken);
    } else {
      setLogout();
    }
  }, [setLogin, setLogout]);

  return { isLoggedIn, isMounted, handleLogout };
};

export default useHeader;
