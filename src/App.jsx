import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { AuthProvider } from './features/auth/context/authProvider';
import ProtectedRoute from './features/auth/components/ProtectedRoute';

const Dashboard = () => (
  <div style={{ padding: 40, fontSize: 24 }}>
     Welcome! You are logged in.
  </div>
);
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
            <ProtectedRoute>    
              <Dashboard />
            </ProtectedRoute>
          } />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;