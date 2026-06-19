import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthUser {
  isLoggedIn: boolean;
  email: string;
  time: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
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
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setUser(authData);
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const dummyEmail = 'admin@gmail.com';
    const dummyPassword = 'admin';

    if (email === dummyEmail && password === dummyPassword) {
      const userData: AuthUser = {
        isLoggedIn: true,
        email: email,
        time: new Date().toISOString()
      };

      setUser(userData);
      localStorage.setItem('auth', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: user?.isLoggedIn || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
