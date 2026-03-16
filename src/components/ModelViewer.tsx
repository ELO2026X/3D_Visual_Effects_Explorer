import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { applyCelShader } from '../components/shaders/CelShader';
import { applyJellyShader } from '../components/shaders/JellyShader';

interface ModelViewerProps {
  modelPath: string;
  effectName: string | null;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, effectName }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<THREE.Group>(null);
  const [originalMaterials, setOriginalMaterials] = useState<Map<string, THREE.Material>>(new Map());
  const cleanupRef = useRef<(() => void) | null>(null);

  const memoizedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    const materials = new Map<string, THREE.Material>();
    memoizedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        materials.set(child.uuid, child.material);
      }
    });
    setOriginalMaterials(materials);
  }, [memoizedScene]);

  useEffect(() => {
    if (modelRef.current) {
      // Cleanup previous effect
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      // Reset materials to original before applying new effects
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && originalMaterials.has(child.uuid)) {
          child.material = originalMaterials.get(child.uuid)!;
        }
      });

      // Remove previous outlines
      const outlines: THREE.Object3D[] = [];
      modelRef.current.traverse((child) => {
        if (child.name === 'outline') {
          outlines.push(child);
        }
      });
      outlines.forEach((outline) => outline.parent?.remove(outline));

      switch (effectName) {
        case 'Cel Shading':
          cleanupRef.current = applyCelShader(modelRef.current);
          break;
        case 'Jelly Effect':
          cleanupRef.current = applyJellyShader(modelRef.current);
          break;
        // Add more cases for other effects
        default:
          // No specific effect, use default materials
          break;
      }
    }

    // Cleanup on component unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [effectName, memoizedScene, originalMaterials]);

  return <primitive object={memoizedScene} ref={modelRef} />;
};