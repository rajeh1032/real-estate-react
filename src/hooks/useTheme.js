import { useDispatch, useSelector } from 'react-redux'
import {
  selectThemeMode,
  setThemeMode,
  toggleThemeMode,
} from '../redux/reducer/themeSlice'

export function useTheme() {
  const dispatch = useDispatch()
  const mode = useSelector(selectThemeMode)

  return {
    mode,
    setTheme: (nextMode) => dispatch(setThemeMode(nextMode)),
    toggleTheme: () => dispatch(toggleThemeMode()),
  }
}
