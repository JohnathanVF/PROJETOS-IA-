import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateBio: (bio: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_AUTH = 'gameguide_current_user';
const STORAGE_KEY_USERS = 'gameguide_users_db';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved) return JSON.parse(saved);
      // Auto-login with default user for seamless experience
      return INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.error('Erro ao salvar auth no localStorage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Erro ao salvar usuários no localStorage', e);
    }
  }, [registeredUsers]);

  const login = async (email: string): Promise<boolean> => {
    // Simulação com validação local.
    // NOTA: Em produção, conectar a endpoint seguro (ex: Supabase Auth, Firebase Auth, JWT backend).
    const found = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      return true;
    } else {
      // Se não cadastrado, cria automaticamente para facilitar o teste
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0] || 'Novo Jogador',
        email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
        bio: 'Membro entusiasta do GameGuide.',
        role: 'Membro',
        joinedDate: 'Hoje',
      };
      setRegisteredUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      return true;
    }
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      bio: 'Novo criador de estratégias no GameGuide.',
      role: 'Membro',
      joinedDate: 'Hoje',
    };
    setRegisteredUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateBio = (bio: string) => {
    if (!user) return;
    const updated = { ...user, bio };
    setUser(updated);
    setRegisteredUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateBio,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};
