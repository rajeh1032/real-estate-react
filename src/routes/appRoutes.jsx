import { Navigate } from 'react-router-dom'
import { HomePage } from '../features/home'
import { PropertiesPage } from '../features/properties'
import { PropertyDetailsPage } from '../features/property-details'
import { MainLayout } from '../layouts/MainLayout'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'

export const appRoutes = [
  {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
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
     
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
