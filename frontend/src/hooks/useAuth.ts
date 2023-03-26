import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMeQuery } from '../api/generated';
import { routes } from '../router/routes';

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (
      !data?.me?.id &&
      !loading &&
      routes.public.find((route) => route.path === location.pathname)
    ) {
      return navigate('/login');
    }
  }, [loading, data]);

  return { user: data?.me || null, loading };
};
