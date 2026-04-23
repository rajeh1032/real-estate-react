import { Outlet } from 'react-router-dom'
import { ThemeToggle } from '../components/common/ThemeToggle'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-text">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-4 sm:px-6 lg:px-8">
          <ThemeToggle />
        </div>
      </header>

      <main className="min-h-[calc(100vh-73px)]">
        <Outlet />
      </main>
    </div>
  )
}
