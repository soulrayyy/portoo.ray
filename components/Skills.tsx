import React from 'react';

const Skills: React.FC = () => {
  const skills = [
    "React", "TypeScript", "Next.js", "Node.js", "WebGL", "Tailwind", "Figma", "GenAI", "Three.js"
  ];

  return (
    <section id="skills" className="py-20 bg-primary text-background overflow-hidden">
      <div className="mb-12 px-6 md:px-12">
         <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
            Expertise
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 md:gap-24 items-center pr-12 md:pr-24">
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <span key={i} className="text-6xl md:text-9xl font-display font-bold uppercase text-transparent stroke-text hover:text-accent transition-colors duration-300 cursor-default select-none" 
            style={{ WebkitTextStroke: '1px #F2F2F2' }}>
              {skill}
            </span>
          ))}
        </div>
        
        {/* Duplicate for seamless loop */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 md:gap-24 items-center pr-12 md:pr-24">
           {/* CSS animation handles the loop, React just renders content */}
        </div>
      </div>
    </section>
  );
};

export default Skills;