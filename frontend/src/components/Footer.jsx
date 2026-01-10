import { Camera, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="pt-20 pb-10 border-t border-white/5" style={{ backgroundColor: 'var(--dark-900)' }}>
            <div className="max-w-7xl mx-auto px-6 text-center">

                <div className="mb-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg shadow-primary/20"
                        style={{ background: 'var(--gradient-primary)' }}>
                        <Camera className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Chandru Digital</h2>
                    <p className="text-white/50 max-w-sm">Professional photography, videography, and digital services for all your needs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-b border-white/5 pb-16">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary"
                            style={{ color: 'var(--primary)' }}>
                            <MapPin size={20} />
                        </div>
                        <h4 className="text-white font-semibold">Visit Us</h4>
                        <p className="text-white/50 text-sm">Main Road, Example City, Tamil Nadu</p>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary"
                            style={{ color: 'var(--primary)' }}>
                            <Phone size={20} />
                        </div>
                        <h4 className="text-white font-semibold">Call Us</h4>
                        <p className="text-white/50 text-sm">+91 63838 14837</p>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary"
                            style={{ color: 'var(--primary)' }}>
                            <Mail size={20} />
                        </div>
                        <h4 className="text-white font-semibold">Email Us</h4>
                        <p className="text-white/50 text-sm">contact@chandrudigital.com</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/40 text-sm">
                        © {new Date().getFullYear()} Chandru Photography & Net Center. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all"
                            style={{ transition: '0.3s' }}>
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all">
                            <Facebook size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
