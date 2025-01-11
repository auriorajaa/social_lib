import { createContext, useContext, useEffect, useState } from "react";
import { get_auth, login } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem('userData') !== null;
  });
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  const check_auth = async () => {
    try {
      if (!localStorage.getItem('userData')) {
        throw new Error('No user data');
      }
      await get_auth();
      setAuth(true);
    } catch {
      setAuth(false);
      localStorage.removeItem('userData');
    } finally {
      setAuthLoading(false);
    }
  }

  const auth_login = async (username, password) => {
    try {
      const data = await login(username, password);
      if (data.success) {
        const userData = {
          'username': data.user.username,
          'bio': data.user.bio,
          'email': data.user.email,
          'first_name': data.user.first_name,
          'last_name': data.user.last_name
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        setAuth(true);
        navigate(`/${username}`);
      } else {
        alert('Username not found or password invalid');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  }

  const auth_logout = () => {
    setAuth(false);
    localStorage.removeItem('userData');
    sessionStorage.clear();

    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });

    navigate('/login', { replace: true });
  };

  useEffect(() => {
    check_auth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, authLoading, auth_login, auth_logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);