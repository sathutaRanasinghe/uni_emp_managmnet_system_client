import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserCheck, ArrowLeft } from 'lucide-react';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    role: 'student' as 'admin' | 'hr' | 'lecturer' | 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const success = await register({
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email,
      role: formData.role,
    });

    if (success) {
      alert('Registration successful! You can now login.');
      onSwitchToLogin();
    } else {
      setError('Username already exists');
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">Join the University Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
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
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;