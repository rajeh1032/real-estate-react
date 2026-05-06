import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReduxProvider } from './redux/provider'
import { AuthProvider } from './features/auth/context/authProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ReduxProvider>
  </StrictMode>,
)
