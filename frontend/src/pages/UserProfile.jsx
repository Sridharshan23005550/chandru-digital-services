import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, LogOut, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.get('/user/history');
                setHistory(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error("Failed to fetch history:", error);
                // toast.error("Could not load history");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchHistory();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-dark-900 flex items-center justify-center">
                <div className="text-white">Please login to view profile.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-900 flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-primary/20">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">Welcome, {user.name}!</h1>
                                <p className="text-white/60">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all font-semibold"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-white/60 text-sm mb-2">Total Services</h3>
                            <p className="text-3xl font-bold text-white">{history.length}</p>
                        </div>
                        <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-white/60 text-sm mb-2">Member Since</h3>
                            <p className="text-xl font-bold text-white">
                                {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-white/60 text-sm mb-2">Account Status</h3>
                            <div className="flex items-center gap-2 text-green-400 font-bold">
                                <CheckCircle size={20} /> Active
                            </div>
                        </div>
                    </div>

                    {/* Service History */}
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Clock className="text-primary" /> Service History
                    </h2>

                    {loading ? (
                        <div className="text-center py-12 text-white/40">Loading history...</div>
                    ) : history.length === 0 ? (
                        <div className="bg-dark-800 border border-white/5 rounded-2xl p-12 text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-white/20">
                                <Calendar size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No History Yet</h3>
                            <p className="text-white/50">You haven't used any services yet. Book one now!</p>
                            <button
                                onClick={() => navigate('/services')}
                                className="mt-6 px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
                            >
                                Browse Services
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {Array.isArray(history) && history.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-dark-800 border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-colors flex flex-col md:flex-row justify-between md:items-center gap-4"
                                >
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">{item.serviceName}</h4>
                                        <p className="text-white/50 text-sm">
                                            {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold bg-green-500/10 text-green-400 border border-green-500/20`}>
                                        Completed
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UserProfile;
