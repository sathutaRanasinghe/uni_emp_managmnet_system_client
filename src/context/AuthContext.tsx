import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { HARDCODED_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Check hardcoded users first
    const hardcodedUser = HARDCODED_USERS.find(
      u => u.username === username && u.password === password
    );
    
    if (hardcodedUser) {
      setUser(hardcodedUser);
      localStorage.setItem('currentUser', JSON.stringify(hardcodedUser));
      return true;
    }

    // Check registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const registeredUser = registeredUsers.find(
      (u: User) => u.username === username && u.password === password
    );

    if (registeredUser) {
      setUser(registeredUser);
      localStorage.setItem('currentUser', JSON.stringify(registeredUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if username already exists
    const existingUser = [...HARDCODED_USERS, ...registeredUsers].find(
      u => u.username === userData.username
    );
    
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };

    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    return true;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};