import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
            {/* Background with animated orbs */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[100px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 opacity-90" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        CHANDRU <span className="gradient-text">PHOTOGRAPHY</span> 
                        
                    </h1>
                </motion.div>

                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="mt-6 flex flex-col gap-3"
>
  <p className="text-gray-300 text-lg md:text-xl font-semibold tracking-wider leading-relaxed">
    TO FRAME THE WORLD, EXPLORE BEYOND US
  </p>

  <p className="text-gray-400 text-base md:text-lg tracking-wider leading-relaxed">
    PHOTOGRAPHY - TRAVEL - ONLINE SOLUTIONS
  </p>
</motion.div>


                

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex justify-center gap-8 mt-8"
                >
                    <a
                        href="#services"
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
                        style={{ background: 'var(--gradient-primary)' }}
                    >
                        Explore Services
                    </a>
                    <Link
                        to="/contact"
                        className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                    >
                        Get in Touch
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest">Scroll Down</span>
                <ArrowDown className="animate-bounce" />
            </motion.div>
        </section>
    );
};

export default Hero;
