import { useEffect, useState } from 'react';

import { routeLoginPage, routeMainPage } from '@/constants/routes';
import { ACCESS_TOKEN } from '@/constants/token';
import LocalStorage from '@/utils/localStorage';

const useRedirectPath = () => {
  const [routePath, setRoutePath] = useState('');

  useEffect(() => {
    const token = LocalStorage.getItem(ACCESS_TOKEN);
    setRoutePath(token ? routeMainPage : routeLoginPage);
  }, []);

  return routePath;
};

export default useRedirectPath;
