import React from 'react';
import { motion } from 'framer-motion';

const HomeSection: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-black/30 backdrop-blur-md rounded-xl p-8 md:p-12"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Mummaneni Jaya Krishna Pavan
          </span>
        </motion.h1>
        
        <motion.h2 
          className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Web Developer & Designer
        </motion.h2>
        
        <motion.p 
          className="text-lg text-white/70 max-w-2xl mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Creating beautiful, interactive digital experiences that blend 
          creativity with cutting-edge technology.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.a 
            href="#projects"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          
          <motion.a 
            href="#contact"
            className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium transition-all hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeSection;