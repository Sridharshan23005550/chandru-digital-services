import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for stored tokens on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            const adminToken = localStorage.getItem('adminToken');
            const storedAdmin = localStorage.getItem('admin');

            if (token && storedUser) {
                setUser(JSON.parse(storedUser));
                // Optional: Verify token with backend here
            }

            if (adminToken && storedAdmin) {
                setAdmin(JSON.parse(storedAdmin));
            }

            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            toast.success(`Welcome back, ${user.name}!`);
            return true;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.msg || 'Login failed');
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const res = await api.post('/auth/register', userData);
            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            toast.success('Account created successfully!');
            return true;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.msg || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully');
    };

    const adminLogin = async (username, password) => {
        try {
            // Use specific endpoint for admin
            const res = await axios.post('https://chandru-digital-services.onrender.com/api/auth/admin-login', { username, password });
            const { token, admin } = res.data;

            localStorage.setItem('adminToken', token);
            localStorage.setItem('admin', JSON.stringify(admin));
            setAdmin(admin);
            toast.success('Admin access granted');
            return true;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.msg || 'Admin login failed');
            return false;
        }
    };

    const adminLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        setAdmin(null);
        toast.success('Admin logged out');
    };

    return (
        <AuthContext.Provider value={{
            user,
            admin,
            loading,
            login,
            register,
            logout,
            adminLogin,
            adminLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
import axios from 'axios';
