import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
    LayoutDashboard, MessageSquare, Users, LogOut,
    Trash2, Mail, ExternalLink, RefreshCw
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('messages');
    // Add dashboard stats if backend supports it
    const { adminLogout } = useAuth();
    const navigate = useNavigate();

    const fetchMessages = async () => {
        setLoading(true);
        try {
            // Need admin token
            const token = localStorage.getItem('adminToken');
            const res = await api.get('/contact', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(res.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await api.delete(`/contact/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(messages.filter(msg => msg._id !== id));
            toast.success('Message deleted');
        } catch (error) {
            toast.error('Failed to delete message');
        }
    };

    const handleLogout = () => {
        adminLogout();
        navigate('/admin-login');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-dark-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-800 border-r border-white/5 flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-xl">
                            CD
                        </div>
                        <div>
                            <h2 className="text-white font-bold">Admin Panel</h2>
                            <p className="text-white/40 text-xs">Chandru Digital</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'messages'
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <MessageSquare size={20} /> Messages
                        <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                            {messages.length}
                        </span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all cursor-not-allowed opacity-50">
                        <Users size={20} /> Users
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all cursor-not-allowed opacity-50">
                        <LayoutDashboard size={20} /> Analytics
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-semibold"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-dark-800 border-b border-white/5 p-6 flex justify-between items-center sticky top-0 z-20">
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={fetchMessages}
                            className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                            title="Refresh Data"
                        >
                            <RefreshCw size={20} />
                        </button>
                        <a
                            href="/"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-semibold"
                        >
                            <ExternalLink size={16} /> View Site
                        </a>
                    </div>
                </header>

                <div className="p-6 md:p-8 max-w-6xl mx-auto">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                    <MessageSquare size={24} />
                                </div>
                                <span className="text-white/40 text-sm">Total</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">{messages.length}</h3>
                            <p className="text-white/40 text-sm">Customer Inquiries</p>
                        </div>

                        <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                                    <Users size={24} />
                                </div>
                                <span className="text-white/40 text-sm">Active</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">-</h3>
                            <p className="text-white/40 text-sm">Registered Users</p>
                        </div>

                        <div className="bg-dark-800 border border-white/5 rounded-2xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                    <LayoutDashboard size={24} />
                                </div>
                                <span className="text-white/40 text-sm">Today</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">0</h3>
                            <p className="text-white/40 text-sm">New Requests</p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-6">Recent Messages</h2>

                    {loading ? (
                        <div className="text-center py-20 text-white/40">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-20 bg-dark-800 rounded-2xl border border-white/5">
                            <MessageSquare size={48} className="mx-auto text-white/20 mb-4" />
                            <h3 className="text-white font-semibold">No Messages Yet</h3>
                            <p className="text-white/40 text-sm">Customer inquiries will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg._id}
                                    className="bg-dark-800 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-colors group"
                                >
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                                {msg.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg">{msg.name}</h4>
                                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-sm text-white/50">
                                                    <span>{msg.email}</span>
                                                    {msg.phone && (
                                                        <>
                                                            <span className="hidden sm:inline">•</span>
                                                            <span>{msg.phone}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-white/30 text-xs bg-white/5 px-2 py-1 rounded-md">
                                            {formatDate(msg.createdAt)}
                                        </span>
                                    </div>

                                    <div className="bg-dark-900/50 p-4 rounded-xl border border-white/5 mb-4">
                                        <p className="text-white/80 leading-relaxed text-sm">{msg.message}</p>
                                    </div>

                                    <div className="flex gap-3 justify-end">
                                        <a
                                            href={`mailto:${msg.email}`}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/80 hover:bg-green-500 hover:text-white transition-all text-sm font-semibold"
                                        >
                                            <Mail size={16} /> Reply
                                        </a>
                                        <button
                                            onClick={() => handleDelete(msg._id)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/80 hover:bg-red-500 hover:text-white transition-all text-sm font-semibold"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
