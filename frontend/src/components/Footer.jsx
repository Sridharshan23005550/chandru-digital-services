import { Camera, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="pt-20 pb-10 border-t border-white/5" style={{ backgroundColor: 'var(--dark-900)' }}>
            <div className="max-w-7xl mx-auto px-6 text-center">

                <div className="mb-10 flex flex-col items-center">
                    <img src={logo} alt="Chandru Photography" className="w-20 h-20 object-contain mb-4 rounded-xl bg-white/5" />
                    <h2 className="text-2xl font-bold text-white mb-2 uppercase">CHANDRU PHOTOGRAPHY </h2>
                    <p className="text-white/50 max-w-sm">FROM MEMORIES TO DOCUMENTS 
                    <br/>- ONE PLACE TOTAL SATISFACTION - EVERYTHING WE MADE SIMPLE</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-b border-white/5 pb-16">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary"
                            style={{ color: 'var(--primary)' }}>
                            <MapPin size={20} />
                        </div>
                        <h4 className="text-white font-semibold">Visit Us</h4>
                        <p className="text-white/50 text-sm">Main Road, Kuruvikulam, Tenkasi - 627754</p>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary"
                            style={{ color: 'var(--primary)' }}>
                            <Phone size={20} />
                        </div>
                        <h4 className="text-white font-semibold">Call Us</h4>
                        <p className="text-white/50 text-sm">7200559119</p>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary"
                            style={{ color: 'var(--primary)' }}>
                            <Mail size={20} />
                        </div>
                        <h4 className="text-white font-semibold">Email Us</h4>
                        <p className="text-white/50 text-sm">CHANDRUPHOTOGRAPHY2020@GMAIL.COM</p>
                        <a
                            href="https://whatsapp.com/channel/0029VbBo6HXAu3aHcR9ryK39"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
                        >
                            <span>Join WhatsApp Channel</span>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-white/40 text-sm">
                        © {new Date().getFullYear()} Chandru Photography & Net Center. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/chandruonlineservices/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all"
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
