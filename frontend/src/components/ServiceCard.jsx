import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, image, delay = 0, onClick, link }) => {
const Content = () => (
    <div className="relative h-[360px]">
        <div className="relative h-full overflow-hidden">
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 shadow-lg">
                <Icon className="text-white w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>

            <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {description}
            </p>

            {link && (
                <span className="text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 block mt-2">
                    Book Now →
                </span>
            )}
        </div>
    </div>
);

    const containerClasses = "group relative rounded-3xl overflow-hidden bg-dark-800 border border-white/5 hover:border-primary/30 transition-colors block h-full";

    if (link) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
                className="h-full"
            >
                <Link to={link || '#'} className={containerClasses} onClick={onClick}>
                    <Content />
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={containerClasses}
            onClick={onClick}
        >
            <Content />
        </motion.div>
    );
};

export default ServiceCard;
