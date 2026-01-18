import { motion } from 'framer-motion';
import { Camera, Map, Printer, Ticket, Globe, Monitor, CreditCard, FileText, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';

const Services = () => {
    const photographyServices = [
        {
            icon: Camera,
            title: "Portraits & Events",
            description: "Professional photography for weddings, events, birthdays, and studio portraits with premium editing.",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            icon: Map,
            title: "Landscape & Travel",
            description: "Stunning outdoor photography capturing the beauty of nature and travel destinations.",
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
        },
        {
            icon: Printer,
            title: "Digital Support",
            description: "All Digital services are available",
            image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            icon: Briefcase,
            title: "Corporate Shoots",
            description: "Professional headshots and branding photography for businesses and profiles.",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
    ];

    const onlineServices = [
        { icon: "🏥", title: "Insurance", desc: "Vehicle and health insurance policy renewal" },
        { icon: "🎫", title: "Ticket Booking", desc: "Train (IRCTC), Bus, and Flight ticket reservations" },
        { icon: "📝", title: "Online Applications", desc: "Job applications, college admissions, and exam forms" },
        { icon: "💰", title: "Bill Payments", desc: "Electricity, Recharge, and Utility bill payments" },
        { icon: "📄", title: "Resume Building", desc: "Professional CV and resume design services" },
        { icon: "📜", title: "Patta / Chitta", desc: "Land record printouts and viewing services" },
        { icon: "🚙", title: "Fastag", desc: "New Fastag application & recharge services" },
        { icon: "🛂", title: "Passport Service", desc: "New Passport application & renewal assistance" }
    ];

    return (
        <div className="min-h-screen bg-dark-900">
            <Navbar />

            <div className="pt-32 pb-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
                <p className="text-white/60 max-w-2xl mx-auto text-lg">
                    Explore our wide range of professional photography and digital online services.
                </p>
            </div>

            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-primary pl-4">Photography & Studio</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {photographyServices.map((service, index) => (
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

            <section className="py-12 px-6 bg-dark-800">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-primary pl-4">Online E-Services</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {onlineServices.map((item, index) => (
                            <Link
                                key={index}
                                to={`/contact?service=${encodeURIComponent(item.title)}`}
                                className="block h-full"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-primary/30 transition-all group h-full flex flex-col items-center justify-center"
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

            <Footer />
        </div>
    );
};

export default Services;
