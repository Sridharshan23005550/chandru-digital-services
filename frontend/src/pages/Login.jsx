import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            const success = await login(formData.email, formData.password);
            if (success) navigate('/');
        } else {
            const success = await register(formData);
            if (success) navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-6 relative overflow-hidden py-24">
                {/* Animated Background */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10"
                >
                    {/* Toggle Tabs */}
                    <div className="flex p-1 bg-black/20 rounded-xl mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${isLogin ? 'bg-primary text-white shadow-lg' : 'text-white/60 hover:text-white'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${!isLogin ? 'bg-primary text-white shadow-lg' : 'text-white/60 hover:text-white'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </h2>
                        <p className="text-white/50 text-sm">
                            {isLogin ? 'Enter your details to access your account' : 'Join us for premium digital services'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode='wait'>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-4 overflow-hidden"
                                >
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:bg-white/10 transition-colors"
                                            required={!isLogin}
                                        />
                                    </div>

                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:bg-white/10 transition-colors"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:bg-white/10 transition-colors"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:bg-white/10 transition-colors"
                                required
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all mt-6"
                            style={{ background: 'var(--gradient-primary)' }}
                        >
                            {isLogin ? 'Login' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link to="/" className="text-white/40 text-sm hover:text-primary transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
