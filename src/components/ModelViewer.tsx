import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useGLTF, Splat } from '@react-three/drei';
import * as THREE from 'three';
import { applyCelShader } from '../components/shaders/CelShader';
import { applyJellyShader } from '../components/shaders/JellyShader';
import { applyRosieShader } from '../components/shaders/RosieShader';
import { applyMarbleShader } from '../components/shaders/MarbleShader';
import { applyAssetModelsShader } from '../components/shaders/AssetModelsShader';
import { applyOutlineShader } from '../components/shaders/OutlineShader';
import { applyBloomShader } from '../components/shaders/BloomShader';
import { applyChromaticAberrationShader } from '../components/shaders/ChromaticAberrationShader';
import { applyEnhancedDetailShader } from '../components/shaders/EnhancedDetailShader';

interface ModelViewerProps {
  modelPath: string;
  effectName: string | null;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, effectName }) => {
  const isSplat = modelPath.toLowerCase().endsWith('.splat') || modelPath.toLowerCase().endsWith('.ksplat');
  
  useEffect(() => {
    console.log(`[ModelViewer] Path changed: ${modelPath} (isSplat: ${isSplat})`);
  }, [modelPath, isSplat]);

  // Conditionally load GLTF only if not a splat
  const gltf = useGLTF(isSplat ? '' : modelPath, true);
  const scene = gltf ? gltf.scene : null;
  
  const modelRef = useRef<THREE.Group>(null);
  const [originalMaterials, setOriginalMaterials] = useState<Map<string, THREE.Material>>(new Map());
  const cleanupRef = useRef<(() => void) | null>(null);

  const memoizedScene = useMemo(() => {
    if (scene) {
      console.log("[ModelViewer] Cloning GLTF scene for memoization");
      return scene.clone();
    }
    return null;
  }, [scene]);

  useEffect(() => {
    if (!memoizedScene) return;
    console.log("[ModelViewer] Extracting original materials from scene");
    const materials = new Map<string, THREE.Material>();
    let meshCount = 0;
    memoizedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        materials.set(child.uuid, child.material);
        meshCount++;
      }
    });
    console.log(`[ModelViewer] Successfully cached ${meshCount} materials`);
    setOriginalMaterials(materials);
  }, [memoizedScene]);

  useEffect(() => {
    if (modelRef.current && memoizedScene) {
      console.log(`[ModelViewer] Applying effect: ${effectName || 'Default'}`);
      
      // Cleanup previous effect
      if (cleanupRef.current) {
        console.log(`[ModelViewer] Cleaning up previous effect`);
        cleanupRef.current();
        cleanupRef.current = null;
      }

      // Reset materials to original and identify objects to remove before applying new effects
      const toRemove: THREE.Object3D[] = [];
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && originalMaterials.has(child.uuid)) {
          child.material = originalMaterials.get(child.uuid)!;
          child.visible = true; // Make sure the mesh is visible again
        }
        if (child.name === 'outline' || child.name === 'marble-points') {
          toRemove.push(child);
        }
      });
      
      if (toRemove.length > 0) {
        console.log(`[ModelViewer] Removing ${toRemove.length} legacy effect artifacts`);
        toRemove.forEach((obj) => obj.parent?.remove(obj));
      }

      switch (effectName) {
        case 'Cel Shading':
          cleanupRef.current = applyCelShader(modelRef.current);
          break;
        case 'Jelly Effect':
          cleanupRef.current = applyJellyShader(modelRef.current);
          break;
        case 'Rosie (Vibe Coding)':
          cleanupRef.current = applyRosieShader(modelRef.current);
          break;
        case 'Marble (Spatial Intelligence)':
          cleanupRef.current = applyMarbleShader(modelRef.current);
          break;
        case 'Asset Models (PixelVibe)':
          cleanupRef.current = applyAssetModelsShader(modelRef.current);
          break;
        case 'Outline':
          cleanupRef.current = applyOutlineShader(modelRef.current);
          break;
        case 'Bloom':
          cleanupRef.current = applyBloomShader(modelRef.current);
          break;
        case 'Chromatic Aberration':
          cleanupRef.current = applyChromaticAberrationShader(modelRef.current);
          break;
        case 'Enhanced Detail':
          cleanupRef.current = applyEnhancedDetailShader(modelRef.current);
          break;
        default:
          console.log("[ModelViewer] No effect selected, using default materials");
          break;
      }
    }

    // Cleanup on component unmount
    return () => {
      if (cleanupRef.current) {
        console.log("[ModelViewer] Component unmounting, cleaning up current effect");
        cleanupRef.current();
      }
    };
  }, [effectName, memoizedScene, originalMaterials]);

  if (isSplat) {
    console.log("[ModelViewer] Rendering Gaussian Splat component");
    return <Splat src={modelPath} />;
  }

  return memoizedScene ? <primitive object={memoizedScene} ref={modelRef} /> : null;
};