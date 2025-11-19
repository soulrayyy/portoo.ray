
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yGraphic = useTransform(scrollY, [0, 500], [0, -50]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 45]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-background">
      
      {/* --- Background Visual Layer (Z-0) --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
         
         {/* Animated Geometric Rings */}
         <motion.div 
            style={{ rotate }}
            className="absolute w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] border-[1px] border-primary/5 rounded-full"
         />
         <motion.div 
            style={{ rotate: useTransform(scrollY, [0, 1000], [0, -90]) }}
            className="absolute w-[50vw] h-[50vw] md:w-[28vw] md:h-[28vw] border-[1px] border-accent/10 rounded-full"
         />

         {/* Central Visual Element */}
         <motion.div 
            style={{ y: yGraphic, scale }}
            className="relative w-[280px] h-[380px] md:w-[340px] md:h-[460px] bg-white shadow-2xl overflow-hidden"
         >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
            {/* Abstract Image with low opacity to not compete with text */}
            <img 
                src="https://picsum.photos/id/26/600/800" 
                alt="Abstract" 
                className="w-full h-full object-cover opacity-40 grayscale contrast-125"
            />
            
            {/* Colorful Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent mix-blend-overlay" />
            
            {/* Decorative Lines */}
            <div className="absolute top-10 left-0 w-full h-[1px] bg-primary/10" />
            <div className="absolute bottom-10 left-0 w-full h-[1px] bg-primary/10" />
         </motion.div>
      </div>

      {/* --- Content Layer (Z-10) --- */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full mix-blend-normal">
        
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] md:text-[13vw] leading-[0.85] font-display font-black text-primary tracking-tighter text-center drop-shadow-lg"
          >
            RAYHAN
          </motion.h1>
        </div>
        
        <div className="overflow-hidden -mt-1 md:-mt-4">
          <motion.h1 
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-[14vw] md:text-[13vw] leading-[0.85] font-display font-black text-primary tracking-tighter text-center drop-shadow-lg"
          >
            ALVIANDI
          </motion.h1>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex flex-col md:flex-row items-center gap-4 md:gap-6"
        >
            <span className="h-[1px] w-12 bg-primary/30 hidden md:block"></span>
            <p className="text-xs md:text-sm font-mono font-medium text-secondary uppercase tracking-widest text-center">
                Creative Developer <span className="text-accent mx-2">•</span> Jakarta
            </p>
            <span className="h-[1px] w-12 bg-primary/30 hidden md:block"></span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
