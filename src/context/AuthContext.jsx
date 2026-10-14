import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi } from '../services/productApi';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'shopease_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      return savedAuth ? JSON.parse(savedAuth) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Synchronize auth state with localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Failed to update auth in localStorage:', err);
    }
  }, [user]);

  /**
   * Log in user using Fake Store API
   */
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginApi(username, password);
      // Construct a client-side user object with the returned token
      const loggedInUser = {
        username,
        token: data.token,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        loginAt: new Date().toISOString(),
      };
      setUser(loggedInUser);
      setIsLoading(false);
      return loggedInUser;
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Login failed. Please verify credentials.');
      throw err;
    }
  };

  /**
   * Log out user
   */
  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
