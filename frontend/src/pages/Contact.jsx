import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

const Contact = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const serviceParam = searchParams.get('service');
        if (serviceParam) {
            setFormData(prev => ({ ...prev, service: serviceParam }));
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/contact', formData);
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', phone: '', message: '', service: '' });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.msg || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        { icon: MapPin, title: "Location", desc: "Main Road, Kuruvikulam, Tenkasi - 627754" },
        { icon: Phone, title: "Phone", desc: "7200559119" },
        { icon: Mail, title: "Email", desc: "CHANDRUPHOTOGRAPHY2020@GMAIL.COM" },
        { icon: Clock, title: "Working Hours", desc: "Mon - Sat: 9:00 AM - 8:00 PM" },
    ];

    return (
        <div className="min-h-screen bg-dark-900 flex flex-col">
            <Navbar />

            <div className="flex-1 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Get in Touch</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
                        <p className="text-white/60 max-w-2xl mx-auto text-lg mb-12">
                            Have questions or need to book a session? We'd love to hear from you.
                        </p>

                        {/* Quick Service Buttons - Static Version */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                            {["INSURANCE", "TICKET BOOKING", "FASTAG", "PASSPORT SERVICE"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setFormData(prev => ({ ...prev, service: item }))}
                                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-primary hover:border-primary hover:text-white transition-all text-sm shadow-lg shadow-black/20"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-dark-800 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-white/50 text-sm font-semibold mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-dark-900 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:border-primary focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white/50 text-sm font-semibold mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-dark-900 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:border-primary focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/50 text-sm font-semibold mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-dark-900 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:border-primary focus:outline-none transition-colors"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/50 text-sm font-semibold mb-2">Service of Interest</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            className="w-full bg-dark-900 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-primary focus:outline-none transition-colors"
                                            placeholder="General Inquiry, Portraits, Aadhaar, etc."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/50 text-sm font-semibold mb-2">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-dark-900 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:border-primary focus:outline-none transition-colors h-40 resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    style={{ background: 'var(--gradient-primary)' }}
                                >
                                    {loading ? 'Sending...' : (
                                        <>
                                            Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 gap-6">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="flex items-start gap-5 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors group">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                                            <item.icon className="text-white w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                            <p className="text-white/60 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="h-64 rounded-3xl overflow-hidden border border-white/10 relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Map Location"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all">
                                        View on Google Maps
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
