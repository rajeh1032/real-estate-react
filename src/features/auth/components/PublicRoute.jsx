import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export function PublicRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    )
  }

  // If user is already logged in, redirect to home
  if (user && user.emailVerified) {
    return <Navigate to="/" replace />
  }

  return children
}
