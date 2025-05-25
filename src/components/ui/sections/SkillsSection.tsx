import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  category: string;
  items: string[];
}

const SkillsSection: React.FC = () => {
  const skills: Skill[] = [
    {
      category: "Frontend",
      items: ["React", "HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "MongoDB", "Firebase", "REST APIs"]
    },
    {
      category: "Design",
      items: ["Figma", "UI/UX"]
    },
    {
      category: "Other",
      items: ["Git", "Agile Methodologies", "Responsive Design", "Salesforce Development"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-black/30 backdrop-blur-md rounded-xl p-8 md:p-12"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Skills</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div 
              key={groupIndex}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-white/90 mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(255,255,255,0.2)" 
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold text-white/90 mb-4">Always Learning</h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Technology evolves rapidly, and I'm committed to continuous learning. 
            Currently exploring: 3D web development, advanced React patterns, and AIML.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;