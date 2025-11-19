import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Tighter spring for more precise feel
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 8); // Center the 16px cursor
      mouseY.set(e.clientY - 8);
      
      const target = e.target as HTMLElement;
      // Check for clickable elements
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.classList.contains('hover-trigger');
        
      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-accent"
      style={{ x: cursorX, y: cursorY }}
      animate={{
        scale: isHovering ? 2.5 : 1,
      }}
    />
  );
};

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background text-primary font-sans">
      <CustomCursor />
      <Navbar />
      
      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <Projects />
        <Skills />
      </main>

      <Footer />
    </div>
  );
};

export default App;