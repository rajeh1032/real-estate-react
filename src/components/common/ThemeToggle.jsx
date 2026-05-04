import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-text transition hover:border-primary hover:text-primary"
    >
      {mode === 'dark' ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.2M12 19.8V22M22 12h-2.2M4.2 12H2M19.1 4.9l-1.5 1.5M6.4 17.6l-1.5 1.5M19.1 19.1l-1.5-1.5M6.4 6.4 4.9 4.9" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}
