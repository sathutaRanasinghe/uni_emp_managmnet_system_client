import React, { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Bell, Settings } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'from-red-600 to-pink-600';
      case 'hr':
        return 'from-blue-600 to-cyan-600';
      case 'lecturer':
        return 'from-green-600 to-emerald-600';
      case 'student':
        return 'from-purple-600 to-indigo-600';
      default:
        return 'from-gray-600 to-slate-600';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'hr':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lecturer':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'student':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`bg-gradient-to-r ${getRoleColor(user?.role || '')} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-white">
                  University Portal
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-white opacity-75 hover:opacity-100 cursor-pointer transition-opacity" />
                <Settings className="h-5 w-5 text-white opacity-75 hover:opacity-100 cursor-pointer transition-opacity" />
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-white">{user?.name}</div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(user?.role || '')}`}>
                      {user?.role?.toUpperCase()}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={logout}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-all duration-200 flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;