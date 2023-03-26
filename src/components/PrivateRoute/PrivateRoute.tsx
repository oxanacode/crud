import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOCAL_STORAGE_KEYS } from '../../constants/LOCAL_STORAGE_KEYS';

import { ROUTES } from '../../constants/ROUTES';

type PrivateRoutePropsType = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRoutePropsType) => {
  const auth = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate(ROUTES.SIGN_IN.path);
    }
  }, [auth, navigate]);

  return <>{children}</>;
};
