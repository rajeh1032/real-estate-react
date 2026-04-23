import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-text transition hover:border-primary hover:text-primary"
    >
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
      {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}
