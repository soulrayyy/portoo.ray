
import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 md:py-8 pointer-events-none text-primary mix-blend-difference"
    >
      {/* Logo / Name */}
      <a href="#" className="text-sm font-mono font-bold pointer-events-auto uppercase tracking-wider text-white">
        Rayhan Alviandi
      </a>

      {/* Links */}
      <div className="flex items-center gap-6 md:gap-10 pointer-events-auto">
        <a href="#work" className="text-xs md:text-sm font-mono font-medium hover:text-accent hover:underline underline-offset-4 text-white transition-colors">WORK</a>
        <a href="#skills" className="text-xs md:text-sm font-mono font-medium hover:text-accent hover:underline underline-offset-4 text-white transition-colors">ABOUT</a>
        <a href="mailto:hello@rayhan.dev" className="hidden md:block text-xs md:text-sm font-mono font-medium hover:text-accent hover:underline underline-offset-4 text-white transition-colors">CONTACT</a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
