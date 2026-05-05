import { Navigate } from 'react-router-dom'
import { HomePage } from '../features/home'
import { PropertiesPage } from '../features/properties'
import { PropertyDetailsPage } from '../features/property-details'
import { MainLayout } from '../layouts/MainLayout'

export const appRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/properties',
        element: <PropertiesPage />,
      },
      {
        path: '/properties/:propertyId',
        element: <PropertyDetailsPage />,
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
];
