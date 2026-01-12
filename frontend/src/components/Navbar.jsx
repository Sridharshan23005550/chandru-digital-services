import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Camera, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, admin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => setIsOpen(false), [location]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Gallery', path: '/#gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
            }`}
            style={{ backgroundColor: scrolled ? 'rgba(15, 15, 26, 0.95)' : 'transparent' }}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img src={logo} alt="Chandru Photography" className="w-16 h-16 object-contain rounded-lg bg-white/10" />
                    <div>
                        <h1 className="text-xl font-bold text-white leading-tight">CHANDRU PHOTOGRAPHY & ONLINE E SERVICES</h1>
                        <p className="text-xs text-white/60">One Place Total Satisfaction</p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-white/80 hover:text-white font-medium transition-colors text-sm relative group"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                                style={{ background: 'var(--gradient-primary)' }} />
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="flex items-center gap-2 text-white/90 hover:text-primary transition-colors text-sm font-medium">
                                <User size={18} /> Hi, {user.name}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all text-sm font-semibold"
                                style={{ color: 'var(--primary)', borderColor: 'rgba(233, 69, 96, 0.3)' }}
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    ) : admin ? (
                        <div className="flex items-center gap-4">
                            <Link to="/admin" className="text-primary text-sm font-semibold flex items-center gap-2">
                                <LayoutDashboard size={16} /> Dashboard
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link
                                to="/login"
                                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform"
                                style={{ background: 'var(--gradient-primary)' }}
                            >
                                Login
                            </Link>
                            <Link
                                to="/admin-login"
                                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white/70 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                Admin
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark-800/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
                        style={{ backgroundColor: 'rgba(26, 26, 46, 0.98)' }}
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-white/80 py-2 border-b border-white/5"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="mt-4 flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <Link to="/profile" className="text-white/60 text-sm flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                            <User size={16} /> Signed in as {user.name}
                                        </Link>
                                        <button onClick={handleLogout} className="text-primary font-semibold text-left">Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="text-center py-3 rounded-lg font-semibold text-white bg-primary shadow-lg shadow-primary/20"
                                            style={{ background: 'var(--gradient-primary)' }}>
                                            Login
                                        </Link>
                                        <Link to="/admin-login" className="text-center py-3 rounded-lg font-semibold text-white/70 bg-white/5">
                                            Admin Access
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
