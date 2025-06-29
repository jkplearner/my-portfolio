import React from 'react';
import Particles from "../../blocks/Backgrounds/Particles/Particles"; 
const Space: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={300}            // increase for a richer starfield
        particleSpread={10}
        speed={0.3}                    // faster for main page vs. loading
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
};

export default Space;
