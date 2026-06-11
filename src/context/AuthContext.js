import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('bl_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('bl_users') || '[]');
    if (users.find(u => u.email === email)) return { error: 'Email already registered' };
    const newUser = {
      id: Date.now(),
      name,
      email,
      xp: 0,
      level: 1,
      completedLevels: [],
      badges: [],
      streak: 0,
      lastActive: new Date().toDateString()
    };
    users.push({ ...newUser, password });
    localStorage.setItem('bl_users', JSON.stringify(users));
    localStorage.setItem('bl_user', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('bl_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { error: 'Invalid email or password' };
    const { password: _, ...userData } = found;
    localStorage.setItem('bl_user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('bl_user', JSON.stringify(updated));
    const users = JSON.parse(localStorage.getItem('bl_users') || '[]');
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx > -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('bl_users', JSON.stringify(users));
    }
  };

  const logout = () => {
    localStorage.removeItem('bl_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
