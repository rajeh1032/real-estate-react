import { Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'

export const appRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: null,
      },
      {
        path: '/properties',
        element: null,
      },
      {
        path: '/properties/:propertyId',
        element: null,
      },
      {
        path: '/account',
        element: null,
      },
      {
        path: '/login',
        element: null,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
