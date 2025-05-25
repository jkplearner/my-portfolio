import React from 'react';
import { motion } from 'framer-motion';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

const Sections: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Home/Hero Section */}
      <section id="home" className="h-screen flex items-center">
        <HomeSection />
      </section>
      
      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center">
        <AboutSection />
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center">
        <SkillsSection />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center">
        <ProjectsSection />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center">
        <ContactSection />
      </section>
    </div>
  );
};

export default Sections;