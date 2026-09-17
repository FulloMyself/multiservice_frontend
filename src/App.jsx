import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './modules/auth/LoginPage';
import RegisterPage from './modules/auth/RegisterPage';
import AdminDashboardPage from './modules/admin/AdminDashboardPage';
import CustomerDashboardPage from './modules/customer/CustomerDashboardPage';
import ProviderDashboardPage from './modules/provider/ProviderDashboardPage';

const API_BASE = import.meta.env.VITE_API_URL || 'https://multiservice-backend-xkck.onrender.com/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('multiservice_token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        const json = await res.json();
        setUser(json.data);
      })
      .catch(() => {
        localStorage.removeItem('multiservice_token');
        setToken('');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleLogin = (newToken) => {
    localStorage.setItem('multiservice_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('multiservice_token');
    setToken('');
    setUser(null);
  };

  const handleProfileUpdated = (updatedUser) => {
    setUser((currentUser) => ({ ...currentUser, ...updatedUser }));
  };

  if (loading) {
    return <div className="loading-state">Loading account...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          token ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/register"
        element={
          token ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage onRegister={handleLogin} />
          )
        }
      />

      <Route
        path="/"
        element={
          token && user ? (
            <DashboardRouter user={user} onLogout={handleLogout} token={token} onProfileUpdated={handleProfileUpdated} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function DashboardRouter({ user, onLogout, token, onProfileUpdated }) {
  if (!user) return <div className="loading-state">Loading dashboard...</div>;

  if (user.role === 'admin') {
    return <AdminDashboardPage user={user} token={token} onLogout={onLogout} onProfileUpdated={onProfileUpdated} />;
  }

  if (user.role === 'provider') {
    return <ProviderDashboardPage user={user} token={token} onLogout={onLogout} onProfileUpdated={onProfileUpdated} />;
  }

  return <CustomerDashboardPage user={user} token={token} onLogout={onLogout} onProfileUpdated={onProfileUpdated} />;
}

export default App;
