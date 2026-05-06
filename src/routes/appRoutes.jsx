import { Navigate } from 'react-router-dom'
import { AccountPage } from '../features/account'
import { LoginPage, RegisterPage } from '../features/auth'
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
        element: <AccountPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
