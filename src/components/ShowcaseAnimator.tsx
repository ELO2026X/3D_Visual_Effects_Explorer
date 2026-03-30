import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShowcaseAnimatorProps {
  isEnabled: boolean;
  children: React.ReactNode;
}

export const ShowcaseAnimator: React.FC<ShowcaseAnimatorProps> = ({ isEnabled, children }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isEnabled) {
      // Gentle orbital rotation
      groupRef.current.rotation.y += delta * 0.2; // Adjust speed as needed

      // Breathing scale effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05; // Adjust frequency and amplitude
      groupRef.current.scale.set(scale, scale, scale);
    } else {
      // Reset rotation and scale when disabled, smoothly or instantly
      // Here we reset instantly
      groupRef.current.rotation.y = 0;
      groupRef.current.scale.set(1, 1, 1);
    }
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
};
