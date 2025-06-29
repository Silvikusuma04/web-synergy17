"use client";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-deep-sea-blue/60 z-10"></div>
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="/komodo.mp4" type="video/mp4" />
      </video>

      <motion.div 
        className="text-center z-20 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4 font-serif"
          variants={itemVariants}
        >
          Mangrove Climate Resilience Powerhouse
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl max-w-4xl mx-auto text-sand-beige/90"
          variants={itemVariants}
        >
          Conserving Mangroves, Empowering Communities And Promoting Bioeconomy
        </motion.p>
      </motion.div>
    </section>
  );
}