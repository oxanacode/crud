import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/ROUTES';

type PrivateRoutePropsType = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRoutePropsType) => {
  const auth = localStorage.getItem('pryaniky_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate(ROUTES.SIGN_IN.path);
    }
  }, [auth, navigate]);

  return <>{children}</>;
};
