import { Navigate } from 'react-router-dom';

import { Home } from '../ui/pages/home';
import { Login } from '../ui/pages/login';

interface Route {
  path: string;
  element: JSX.Element;
}

interface AppRoutes {
  public: Route[];
  private: Route[];
}

export const routes: AppRoutes = {
  public: [
    {
      path: '/login',
      element: <Login />
    }
  ],
  private: [
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '*',
      element: <Navigate to="/home" replace />
    }
  ]
};
