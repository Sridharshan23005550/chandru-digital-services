import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Camera, Map, Printer, Ticket, Globe, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    const services = [
        {
            icon: Camera,
            title: "Portraits & Events",
            description: "Professional photography for weddings, events, and studio portraits with premium editing.",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            icon: Map,
            title: "Landscape & Travel",
            description: "Stunning outdoor photography capturing the beauty of nature and travel destinations.",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            icon: Printer,
            title: "Digital Services",
            description: "High-quality printing, scanning, xerox, and document lamination services.",
            image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
    ];

    const onlineServices = [
        { icon: "🪪", title: "Aadhaar / PAN", desc: "New application & updates" },
        { icon: "🎫", title: "Ticket Booking", desc: "Train, bus & flight tickets" },
        { icon: "🌐", title: "Web Services", desc: "Online applications & forms" },
        { icon: "💻", title: "Digital Support", desc: "Technical assistance" }
    ];

    const galleryImages = [
        "https://images.unsplash.com/photo-1554048612-387768052bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ];

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />
            <Hero />

            {/* Services Section */}
            <section id="services" className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">What We Offer</span>
                        <h2 className="text-4xl font-bold text-white mb-4">Our Premium Services</h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            We provide top-notch photography and digital solutions tailored to your specific needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                {...service}
                                delay={index * 0.1}
                                link={`/contact?service=${encodeURIComponent(service.title)}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Online Services */}
            <section className="py-24 px-6 bg-dark-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Digital Solutions</span>
                        <h2 className="text-4xl font-bold text-white mb-4">Online E-Services</h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Fast and reliable online service assistance for all your government and travel needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {onlineServices.map((item, index) => (
                            <Link
                                to={`/contact?service=${encodeURIComponent(item.title)}`}
                                key={index}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/5 border border-white/5 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-primary/30 transition-all group h-full"
                                >
                                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-white/50 text-sm">{item.desc}</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Our Portfolio</span>
                        <h2 className="text-4xl font-bold text-white mb-4">Featured Gallery</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                            >
                                <img
                                    src={img}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="text-white w-8 h-8" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="px-8 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all">
                            View All Works
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
