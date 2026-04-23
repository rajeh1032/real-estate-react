import { createSlice } from '@reduxjs/toolkit'
import { THEME_STORAGE_KEY } from '../../utils/themeStorage'

function getInitialThemeMode() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (storedMode === 'light' || storedMode === 'dark') {
    return storedMode
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialThemeMode(),
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload
    },
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { setThemeMode, toggleThemeMode } = themeSlice.actions
export const themeReducer = themeSlice.reducer
export const selectThemeMode = (state) => state.theme.mode
