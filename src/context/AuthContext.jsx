import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check if JWT token is valid
  const isTokenValid = (token) => {
    try {
      if (!token) return false;
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Invalid token format:", error);
      return false;
    }
  };

  // ✅ Refresh JWT token if expired
  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data.token;
      } else {
        console.error('Failed to refresh token, logging out');
        logout();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
    return null;
  };

  // ✅ Register user
  const register = (userData) => {
    const newUser = {
      email: userData.email,
      username: userData.username || userData.name || "User",
      customerId: userData.customerId,
      token: userData.token,
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  // ✅ Login user and store details
  const login = (userData) => {
    console.log("User data received at login:", userData); // Debugging log
  
    const updatedUser = {
      email: userData.email,  // ✅ Added email
      username: userData.username || userData.name || "User",
      customerId: userData.customerId,
      token: userData.token,
    };
  
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    console.log("User state after login:", updatedUser); // Debugging log
  };

  // ✅ Logout and clear all authentication data
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // ✅ Load authentication state on app start
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
  const customerId = user?.customerId || null;
  const email = user?.email || null; // ✅ Added email

  return (
    <AuthContext.Provider value={{ user, setUser, email, customerId, isLoggedIn, register, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for authentication
export const useAuth = () => {
  return useContext(AuthContext);
};
