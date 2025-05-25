import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Space from './components/3d/Space';
import Navbar from './components/ui/Navbar';
import Sections from './components/ui/Sections';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef<HTMLDivElement>(null);

  // Handle scroll to set active section
  useEffect(() => {
    const handleScroll = () => {
      if (sectionsRef.current) {
        const sections = sectionsRef.current.querySelectorAll('section');
        
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          const scrollY = window.scrollY;
          
          if (scrollY >= sectionTop - 200 && scrollY < sectionTop + sectionHeight - 200) {
            setActiveSection(section.id);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ScrollControls pages={4} damping={0.25}>
            <Space />
          </ScrollControls>
        </Canvas>
      </div>
      
      {/* 2D UI */}
      <div className="relative z-10 h-full">
        <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
        <div ref={sectionsRef}>
          <Sections />
        </div>
      </div>
    </div>
  );
}

export default App;