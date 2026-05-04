<<<<<<< HEAD
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { AuthProvider } from './features/auth/context/authProvider';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
=======
import { AppRouter } from './routes/AppRouter'
import { useEffect } from "react";
import { uploadData } from "./uploadData.js";
>>>>>>> 8185ad40b9959ee1754e5a289584b3ec56e7b5a6

const Dashboard = () => (
  <div style={{ padding: 40, fontSize: 24 }}>
     Welcome! You are logged in.
  </div>
);
function App() {
<<<<<<< HEAD
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
=======
  // useEffect(() => {
  //   uploadData();
  // }, []);
  return <AppRouter />
>>>>>>> 8185ad40b9959ee1754e5a289584b3ec56e7b5a6
}

export default App;