import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import Comet from './Comet';

const Space: React.FC = () => {
  const { viewport, camera } = useThree();

  // Move camera smoothly based on mouse position
  useFrame(({ mouse }) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * viewport.width * 0.2,
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * viewport.height * 0.2,
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  const groupRef = useRef<THREE.Group>(null);

  // Generate random comets with staggered timing
  const comets = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      position: [
        THREE.MathUtils.randFloatSpread(30),
        THREE.MathUtils.randFloatSpread(30),
        THREE.MathUtils.randFloatSpread(10) - 15,
      ],
      rotation: [
        THREE.MathUtils.randFloatSpread(Math.PI),
        THREE.MathUtils.randFloatSpread(Math.PI),
        THREE.MathUtils.randFloatSpread(Math.PI),
      ],
      speed: 0.03 + Math.random() * 0.02,
      delay: i * 5, // Each comet appears 5 seconds after the previous
      direction: [
        THREE.MathUtils.randFloatSpread(2),
        THREE.MathUtils.randFloatSpread(2),
        THREE.MathUtils.randFloat(3, 6),
      ],
    }));
  }, []);

  // Rotate and move the entire space slowly based on mouse
  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();

      // Move group position smoothly based on mouse
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        mouse.x * 2,  // Adjust multiplier for desired movement range
        0.1          // Smoothness factor
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        mouse.y * 2,
        0.1
      );

      // Rotate group smoothly based on mouse position
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.05,
        0.02
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.05,
        0.02
      );

      // Ambient slow rotation on Z axis
      groupRef.current.rotation.z = Math.sin(time * 0.05) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.6}
        fade
        speed={0.5}
      />

      {/* Comets */}
      {comets.map((comet, index) => (
        <Comet
          key={index}
          position={comet.position as [number, number, number]}
          rotation={comet.rotation as [number, number, number]}
          speed={comet.speed}
          delay={comet.delay}
          direction={comet.direction as [number, number, number]}
        />
      ))}

      {/* Ambient light */}
      <ambientLight intensity={0.1} />
    </group>
  );
};

export default Space;
