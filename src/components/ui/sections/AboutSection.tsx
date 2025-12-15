import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-black/30 backdrop-blur-md rounded-xl p-8 md:p-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-white/90 mb-4">Who I Am</h3>
            <p className="text-white/70 leading-relaxed mb-4">
              I’m a passionate web developer and designer with a strong interest in building immersive and scalable digital experiences. With hands-on experience in both frontend and backend development, along with Salesforce CRM integration, I bring a well-rounded and practical perspective to every project.
            </p>
            <p className="text-white/70 leading-relaxed">
              As a fresher, I have completed 7 projects that allowed me to apply my skills and learn new technologies. These projects helped me gain hands-on experience in building real-world web applications and collaborating effectively in team environments.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-white/90 mb-4">My Approach</h3>
            <ul className="space-y-3">
              {[
                "User-centered design principles",
                "Clean, maintainable code",
                "Performance optimization",
                "Accessible web experiences",
                "Cutting-edge technologies"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>

            <motion.a
              href="/resume.pdf"
              download="My_Resume.pdf"
              className="inline-block mt-6 px-5 py-2 border border-white/20 rounded-full text-sm text-white/80 transition hover:bg-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;