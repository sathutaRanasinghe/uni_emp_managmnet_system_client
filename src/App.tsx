import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    if (showRegister) {
      return <Register onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return <Login onSwitchToRegister={() => setShowRegister(true)} />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;