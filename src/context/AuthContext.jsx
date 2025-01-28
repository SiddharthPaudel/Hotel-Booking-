import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Invalid token format:", error);
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Update token
        return data.token;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
    return null;
  };

  const register = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('customerId', userData.customerId); // Store customerId
    setUser(userData);
  };

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token); // Store token
    localStorage.setItem('customerId', userData.customerId); // Store customerId
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (storedUser && token) {
          if (isTokenValid(token)) {
            setUser(storedUser);
          } else {
            const newToken = await refreshToken();
            if (newToken) {
              const refreshedUser = { ...storedUser, token: newToken };
              localStorage.setItem('user', JSON.stringify(refreshedUser));
              setUser(refreshedUser);
            } else {
              logout();
            }
          }
        }
      } catch (error) {
        console.error("Error initializing auth state:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const isLoggedIn = !!user;
  const customerId = user?.customerId || null; // Access customerId from user state

  return (
    <AuthContext.Provider value={{ user, setUser,customerId, isLoggedIn, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
