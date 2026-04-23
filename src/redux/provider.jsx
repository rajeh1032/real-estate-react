import { Provider } from 'react-redux'
import { ThemeSync } from './ThemeSync'
import { store } from './store'

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <ThemeSync />
      {children}
    </Provider>
  )
}
