import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('token'); // Read token from cookie
        if (token) {
          const response = await axios.get('http://localhost:5000/api/check-auth');
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        Cookies.remove('token'); // Remove invalid token from cookie
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token, userData) => {
    Cookies.set('token', token, { httpOnly: false, secure: false }); // Set token as cookie (httpOnly should ideally be true, but might cause issues with client-side access)
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout'); // Backend handles cookie clearing
    } catch (error) {
      console.error('Logout error:', error);
    }
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);