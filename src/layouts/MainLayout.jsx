import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { ThemeToggle } from '../components/common/ThemeToggle'
import { useAuth } from '../features/auth/context/useAuth'

function getInitials(user) {
  const source = user?.displayName || user?.email || 'Account'
  return source
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

export function MainLayout() {
  const location = useLocation()
  const { user } = useAuth()
  const isListingsRoute = location.pathname === '/' || location.pathname.startsWith('/properties')

  const navLinkClassName = ({ isActive }) =>
    isActive
      ? 'border-b-2 border-primary pb-1.5 text-primary'
      : 'pb-1.5 text-text-muted transition hover:text-text'

  const listingsLinkClassName = ({ isActive }) =>
    isActive || (isListingsRoute && location.pathname !== '/account')
      ? 'border-b-2 border-primary pb-1.5 text-primary'
      : 'pb-1.5 text-text-muted transition hover:text-text'

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="font-display text-[1.7rem] font-bold tracking-[-0.06em] text-text">
            DreamHome
          </NavLink>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <NavLink to="/" className={listingsLinkClassName}>
              Listings
            </NavLink>
            <NavLink to="/account" className={navLinkClassName}>
              Profile
            </NavLink>
            <span className="pb-1.5 text-text-muted transition hover:text-text">Concierge</span>
            <span className="pb-1.5 text-text-muted transition hover:text-text">About</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <NavLink
              to="/account"
              className="hidden items-center gap-2 text-sm font-semibold text-text-muted transition hover:text-text sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m12 20-1.4-1.2C5.7 14.5 2.5 11.6 2.5 8A4.5 4.5 0 0 1 7 3.5c1.8 0 3.3.8 4.3 2.1A5.3 5.3 0 0 1 15.6 3.5 4.5 4.5 0 0 1 20.1 8c0 3.6-3.2 6.5-8.1 10.8L12 20Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Favorites
            </NavLink>
            <NavLink
              to={user ? '/account' : '/login'}
              className={
                user
                  ? 'inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-1 ring-border transition hover:opacity-90'
                  : 'rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90'
              }
              aria-label={user ? 'Open profile' : 'Sign in'}
            >
              {user ? (
                user.photoURL ? (
                  <img src={user.photoURL} alt="" className="h-full w-full object-cover" />
                ) : (
                  getInitials(user)
                )
              ) : (
                'Sign In'
              )}
            </NavLink>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-81px)]">
        <Outlet />
      </main>

      <footer className="mt-20 bg-[#0f172a] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="font-display text-2xl font-bold tracking-[-0.04em]">DreamHome</p>
              <div className="space-y-1 text-[11px] uppercase tracking-[0.18em] text-white/50">
                <p>&copy; 2026 DreamHome Architectural Editorial.</p>
                <p>All rights reserved.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookie Settings</span>
              <span>Sustainability</span>
              <span>Press</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 border-t border-white/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14.5 6.5H9.7a3.2 3.2 0 0 0-3.2 3.2v4.6a3.2 3.2 0 0 0 3.2 3.2h4.6a3.2 3.2 0 0 0 3.2-3.2V9.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m10 12 8-8M12.5 4H18v5.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 6.5h16M7 17.5h10M8 6.5v11M16 6.5v11" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              Designed for the discerning eye
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
