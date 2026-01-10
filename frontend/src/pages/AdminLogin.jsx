import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { adminLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await adminLogin(username, password);
        if (success) navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6 relative overflow-hidden">
            {/* Dark Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[100px] animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-dark-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl shadow-black/50"
            >
                <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                        <Shield className="text-white w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Admin Portal</h2>
                    <p className="text-white/50 text-sm">Secure access for administrators only</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Admin Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-dark-900/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-dark-900/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all mt-4"
                        style={{ background: 'var(--gradient-primary)' }}
                    >
                        Authenticate
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <Link to="/" className="text-white/40 text-sm hover:text-primary transition-colors">
                        ← Return to Main Site
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
