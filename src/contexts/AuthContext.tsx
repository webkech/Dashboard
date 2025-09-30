import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('webkech_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('webkech_user');
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (email: string, password: string) => {
    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem('webkech_users') || '[]');
    
    // Check if email already exists
    if (existingUsers.find((u: User) => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString()
    };

    // Store user credentials (in real app, this would be hashed)
    const users = [...existingUsers, newUser];
    const credentials = JSON.parse(localStorage.getItem('webkech_credentials') || '[]');
    credentials.push({ email, password, userId: newUser.id });

    localStorage.setItem('webkech_users', JSON.stringify(users));
    localStorage.setItem('webkech_credentials', JSON.stringify(credentials));
    localStorage.setItem('webkech_user', JSON.stringify(newUser));

    setUser(newUser);
    return { success: true };
  };

  const login = async (email: string, password: string) => {
    const credentials = JSON.parse(localStorage.getItem('webkech_credentials') || '[]');
    const users = JSON.parse(localStorage.getItem('webkech_users') || '[]');
    
    const userCredential = credentials.find((c: any) => c.email === email);
    
    if (!userCredential) {
      return { success: false, message: 'Account not found. Please register first.' };
    }

    if (userCredential.password !== password) {
      return { success: false, message: 'Invalid credentials.' };
    }

    const user = users.find((u: User) => u.id === userCredential.userId);
    if (user) {
      localStorage.setItem('webkech_user', JSON.stringify(user));
      setUser(user);
      return { success: true };
    }

    return { success: false, message: 'Account not found.' };
  };

  const logout = () => {
    localStorage.removeItem('webkech_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};