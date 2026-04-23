import { BrowserRouter, useRoutes } from 'react-router-dom'
import { appRoutes } from './appRoutes'

function RouterContent() {
  return useRoutes(appRoutes)
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  )
}
