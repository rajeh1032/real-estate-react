import { Navigate } from 'react-router-dom'
import { AccountPage } from '../features/account'
import { LoginPage, RegisterPage, PublicRoute, ProtectedRoute } from '../features/auth'
import { HomePage } from '../features/home'
import { PropertiesPage } from '../features/properties'
import { PropertyDetailsPage } from '../features/property-details'
import { MainLayout } from '../layouts/MainLayout'

export const appRoutes = [
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
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
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
