import { NavLink, Outlet } from 'react-router-dom'
import { ThemeToggle } from '../components/common/ThemeToggle'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
          <NavLink to="/properties" className="text-xl font-semibold tracking-tight text-text">
            DreamHome
          </NavLink>

          <nav className="hidden items-center gap-8 text-sm font-medium text-text-muted md:flex">
            <NavLink
              to="/properties"
              className={({ isActive }) =>
                isActive ? 'border-b-2 border-primary pb-1 text-primary' : 'pb-1 transition hover:text-text'
              }
            >
              Listings
            </NavLink>
            <span className="transition hover:text-text">Concierge</span>
            <span className="transition hover:text-text">About</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              className="hidden items-center gap-2 text-sm font-medium text-text-muted transition hover:text-text sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m12 20-1.4-1.2C5.7 14.5 2.5 11.6 2.5 8A4.5 4.5 0 0 1 7 3.5c1.8 0 3.3.8 4.3 2.1A5.3 5.3 0 0 1 15.6 3.5 4.5 4.5 0 0 1 20.1 8c0 3.6-3.2 6.5-8.1 10.8L12 20Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Favorites (3)
            </button>
            <button
              type="button"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Sign In
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-81px)]">
        <Outlet />
      </main>

      <footer className="mt-20 bg-accent text-white dark:bg-[#1a2742]">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-sm space-y-4">
              <p className="text-lg font-semibold tracking-[0.24em] uppercase">DreamHome</p>
              <p className="text-sm leading-6 text-white/65">
                Defining the global standard in high-end architectural editorial and residential procurement.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em] text-white/60">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookie Settings</span>
              <span>Sustainability</span>
              <span>Press</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 DreamHome Architectural Editorial. All rights reserved.</p>
            <div className="flex items-center gap-3 text-white/60">
              <span>Global</span>
              <span>Share</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
