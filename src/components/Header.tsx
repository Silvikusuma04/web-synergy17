"use client";
import { motion } from 'framer-motion';

const gmailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=example@example.com";

export default function Header() {
  const navItems = ['About', 'Impact', 'Map'];
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-sand-beige/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-deep-sea-blue/10">
        <div className="text-2xl font-bold font-serif text-forest-green">
          Mangrove Booster 
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-deep-sea-blue/80 relative"
              whileHover="hover"
            >
              {item}
              <motion.div
                className="absolute bottom-[-4px] left-0 h-[2px] bg-forest-green"
                variants={{
                  initial: { width: 0 },
                  hover: { width: '100%' }
                }}
                initial="initial"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>
        <motion.a
          href={gmailComposeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-warm-coral text-white px-5 py-2 rounded-full font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.a>
      </div>
    </motion.header>
  );
}