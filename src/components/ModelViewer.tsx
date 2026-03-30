import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { applyModelEffect } from './effectUtils';

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
      cleanupRef.current = applyModelEffect(
        modelRef.current,
        effectName,
        originalMaterials,
        cleanupRef.current
      );
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