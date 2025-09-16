import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogIn, UserPlus, GraduationCap } from 'lucide-react';

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(username, password);
    
    if (!success) {
      setError('Invalid username or password');
    }
    
    setLoading(false);
  };

  const demoLogins = [
    { role: 'Admin', username: 'admin', password: 'admin123' },
    { role: 'HR', username: 'hr', password: 'hr123' },
    { role: 'Lecturer', username: 'lecturer', password: 'lecturer123' },
    // { role: 'Student', username: 'student', password: 'student123' },
  ];

  const fillDemoLogin = (username: string, password: string) => {
    setUsername(username);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">University Portal</h2>
            <p className="mt-2 text-sm text-gray-600">Employee Management System</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <LogIn className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {demoLogins.map((demo) => (
                <button
                  key={demo.role}
                  type="button"
                  onClick={() => fillDemoLogin(demo.username, demo.password)}
                  className="text-xs px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {demo.role}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Don't have an account? Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;