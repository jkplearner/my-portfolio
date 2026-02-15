import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from './components/ui/Navbar';
import Sections from './components/ui/Sections';
import Space from './components/3d/Space'; // your updated Space component rendering Particles

const ChatAgent = lazy(() => import('./components/ui/chat/ChatAgent'));

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef<HTMLDivElement>(null);

  // Update active section on scroll
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
      window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Fullscreen Particles background */}
      <div className="fixed inset-0 z-0">
        <Space /> {/* uses your updated Space.tsx with HTML-based Particles */}
      </div>

      {/* 2D UI overlay */}
      <div className="relative z-10 h-full">
        <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
        <div ref={sectionsRef}>
          <Sections />
        </div>
      </div>

      {/* AI Chat Agent — lazy loaded */}
      <Suspense fallback={null}>
        <ChatAgent />
      </Suspense>
    </div>
  );
}

export default App;

