import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-primary pt-20 pb-10 px-6 md:px-12 border-t border-black/5">
      <div className="flex flex-col gap-8 mb-20">
        <motion.h2 
          className="text-[10vw] font-display font-black leading-none uppercase tracking-tighter cursor-pointer w-fit origin-left"
          whileHover={{ 
            scale: 1.02, 
            x: 20,
            textShadow: "0px 15px 30px rgba(0,0,0,0.1)" 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Let's Talk
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-12 md:gap-32">
            <div>
                <h3 className="font-mono text-sm font-bold uppercase mb-4 text-secondary">Socials</h3>
                <ul className="flex flex-col gap-2 text-lg font-medium">
                    <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Twitter / X</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-mono text-sm font-bold uppercase mb-4 text-secondary">Contact</h3>
                <a href="mailto:hello@rayhan.dev" className="text-lg font-medium hover:text-accent transition-colors">
                    hello@rayhan.dev
                </a>
            </div>
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-black/5 pt-8">
        <p className="text-xs font-mono text-secondary">
            © 2024 Rayhan Alviandi.
        </p>
        <p className="text-xs font-mono text-secondary text-right">
            Jakarta, Indonesia
        </p>
      </div>
    </footer>
  );
};

export default Footer;