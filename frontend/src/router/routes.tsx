import { Navigate } from 'react-router-dom';

import { Edit } from '../ui/pages/edit';
import { Home } from '../ui/pages/home';
import { Login } from '../ui/pages/login';
import { New } from '../ui/pages/new';

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
      path: '/new',
      element: <New />
    },
    {
      path: '/edit/:id',
      element: <Edit />
    },
    {
      path: '*',
      element: <Navigate to="/home" replace />
    }
  ]
};
