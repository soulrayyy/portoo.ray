import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "Neon Finance",
    description: "Fintech Dashboard",
    tags: ["React", "Data Viz"],
    link: "#",
    image: "https://picsum.photos/id/20/600/400"
  },
  {
    id: 2,
    title: "Genesis Labs",
    description: "AI Research Platform",
    tags: ["Next.js", "Gemini"],
    link: "#",
    image: "https://picsum.photos/id/36/600/400"
  },
  {
    id: 3,
    title: "Echo Spatial",
    description: "3D Audio Experience",
    tags: ["Three.js", "WebGL"],
    link: "#",
    image: "https://picsum.photos/id/48/600/400"
  },
  {
    id: 4,
    title: "Velvet UI",
    description: "Design System",
    tags: ["TypeScript", "Storybook"],
    link: "#",
    image: "https://picsum.photos/id/119/600/400"
  },
  {
    id: 5,
    title: "Orbital",
    description: "Satellite Tracking",
    tags: ["D3.js", "API"],
    link: "#",
    image: "https://picsum.photos/id/180/600/400"
  }
];

const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Cursor Follower State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Optimized spring physics for smooth non-laggy movement
  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Small offset so it doesn't cover the cursor directly
    mouseX.set(e.clientX + 20); 
    mouseY.set(e.clientY + 20);
  };

  return (
    <section 
      id="work" 
      className="relative py-20 md:py-32 bg-background z-20"
      onMouseMove={handleMouseMove}
    >
      {/* Section Header */}
      <div className="px-6 md:px-12 mb-12 flex items-end justify-between border-b border-black/5 pb-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-secondary">
            Selected Work (05)
        </h2>
      </div>

      {/* Project List */}
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <div key={project.id} className="group border-b border-black/5 last:border-none">
            <a
              href={project.link}
              className="relative block py-12 px-6 md:px-12 transition-colors duration-300 hover:bg-white"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 z-10 relative">
                
                {/* Title */}
                <h3 className="text-4xl md:text-6xl font-display font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Metadata - Desktop */}
                <div className="hidden md:flex items-center gap-12">
                    <span className="font-mono text-sm text-secondary uppercase tracking-wide">
                        {project.description}
                    </span>
                    <div className="flex gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs font-mono border border-black/10 px-2 py-1 rounded-full text-secondary">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>

              {/* Mobile: Inline Image & Details */}
              <div className="md:hidden mt-6 space-y-4">
                <div className="w-full h-48 overflow-hidden rounded-md">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-start">
                    <span className="text-sm font-mono text-primary font-medium">{project.description}</span>
                    <div className="flex flex-wrap gap-2 justify-end">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono bg-black/5 px-2 py-1 rounded text-secondary">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Floating Preview - Desktop Only */}
      {/* Optimized size (w-64) for cleaner look */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-72 h-48 z-50 hidden md:block overflow-hidden rounded-lg shadow-xl bg-white"
        style={{ x, y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: hoveredIndex !== null ? 1 : 0, 
            scale: hoveredIndex !== null ? 1 : 0.8 
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <AnimatePresence mode='wait'>
          {hoveredIndex !== null && (
            <motion.img
               key={hoveredIndex}
               src={projects[hoveredIndex].image}
               alt="Preview"
               className="w-full h-full object-cover"
               initial={{ opacity: 0, filter: 'blur(4px)' }}
               animate={{ opacity: 1, filter: 'blur(0px)' }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;