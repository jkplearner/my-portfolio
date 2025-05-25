import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CometProps {
  position: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  delay: number;
  direction: [number, number, number];
}

const Comet: React.FC<CometProps> = ({ position, rotation, speed, delay, direction }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const startPosition = useRef(new THREE.Vector3(...position));
  const trailRef = useRef<THREE.Mesh>(null);
  
  // Comet appearance based on delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Comet animation cycle
  useFrame(({ clock }) => {
    if (!meshRef.current || !visible) return;
    
    const time = clock.getElapsedTime();
    const cycleTime = 20; // Time for complete cycle
    const cycleMod = (time % cycleTime) / cycleTime;
    
    // Only make comet active for a portion of the cycle
    if (cycleMod < 0.1 && !active) {
      setActive(true);
      // Reset position at start of animation
      meshRef.current.position.copy(startPosition.current);
    } else if (cycleMod > 0.3 && active) {
      setActive(false);
    }
    
    // Move the comet when active
    if (active) {
      meshRef.current.position.x += direction[0] * speed;
      meshRef.current.position.y += direction[1] * speed;
      meshRef.current.position.z += direction[2] * speed;
      
      // Update trail
      if (trailRef.current) {
        trailRef.current.position.copy(meshRef.current.position);
        trailRef.current.scale.x = 1 + Math.sin(time * 10) * 0.1; // Slight pulse
      }
    }
  });
  
  if (!visible) return null;
  
  return (
    <group>
      {/* Comet body */}
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#88ccff"
          emissiveIntensity={2} 
        />
      </mesh>
      
      {/* Comet trail */}
      <mesh 
        ref={trailRef}
        position={position}
        rotation={rotation}
      >
        <coneGeometry args={[0.05, 2, 8]} />
        <meshBasicMaterial 
          color="#88ccff" 
          transparent={true} 
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

export default Comet;