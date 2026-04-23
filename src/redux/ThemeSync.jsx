import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { THEME_STORAGE_KEY } from '../utils/themeStorage'
import { selectThemeMode } from './reducer/themeSlice'

export function ThemeSync() {
  const mode = useSelector(selectThemeMode)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  }, [mode])

  return null
}
