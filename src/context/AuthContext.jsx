import { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data

  // Function to register a user
  const register = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user info
    setUser(userData); // Update user state
  };

  // Function to login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Store token
    localStorage.setItem('user', JSON.stringify(userData)); // Store user info
  };

  // Function to logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Check for token and user data in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state from localStorage
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
