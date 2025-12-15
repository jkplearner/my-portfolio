import React from 'react';
import { motion } from 'framer-motion';
import { RocketIcon, UserIcon, WrenchIcon, FolderIcon, MailIcon, AwardIcon } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <RocketIcon size={16} /> },
    { id: 'about', label: 'About', icon: <UserIcon size={16} /> },
    { id: 'skills', label: 'Skills', icon: <WrenchIcon size={16} /> },
    { id: 'projects', label: 'Projects', icon: <FolderIcon size={16} /> },
    { id: 'certifications', label: 'Certifications', icon: <AwardIcon size={16} /> },
    { id: 'contact', label: 'Contact', icon: <MailIcon size={16} /> },
  ];

  return (
    <motion.nav
      className="fixed top-[-10px] left-0 right-0 z-50 px-4 py-4 md:py-6"

      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo/Name */}
          <motion.div
            className="text-white font-bold text-xl mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
          </motion.div>

          {/* Navigation Items */}
          <ul className="flex items-center space-x-1 md:space-x-2 bg-black/30 backdrop-blur-md rounded-full px-2 py-1">
            {navItems.map((item) => (
              <motion.li key={item.id} whileHover={{ scale: 1.1 }}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center px-3 py-2 rounded-full text-sm transition-all duration-300 ${activeSection === item.id
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/70 hover:text-white'
                    }`}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  <span className="hidden md:block">{item.label}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;