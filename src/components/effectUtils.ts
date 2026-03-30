import * as THREE from 'three';
import { applyCelShader } from './shaders/CelShader.ts';
import { applyJellyShader } from './shaders/JellyShader.ts';
import { applyRosieShader } from './shaders/RosieShader.ts';
import { applyMarbleShader } from './shaders/MarbleShader.ts';
import { applyAssetModelsShader } from './shaders/AssetModelsShader.ts';

export const applyModelEffect = (
  model: THREE.Group,
  effectName: string | null,
  originalMaterials: Map<string, THREE.Material>,
  cleanupPreviousEffect: (() => void) | null
): (() => void) | null => {
  // Cleanup previous effect
  if (cleanupPreviousEffect) {
    cleanupPreviousEffect();
  }

  // Reset materials to original before applying new effects
  model.traverse((child) => {
    if (child instanceof THREE.Mesh && originalMaterials.has(child.uuid)) {
      child.material = originalMaterials.get(child.uuid)!;
      child.visible = true; // Make sure the mesh is visible again
    }
  });

  // Remove previous outlines and points
  const toRemove: THREE.Object3D[] = [];
  model.traverse((child) => {
    if (child.name === 'outline' || child.name === 'marble-points') {
      toRemove.push(child);
    }
  });
  toRemove.forEach((obj) => obj.parent?.remove(obj));

  let newCleanup: (() => void) | null = null;

  switch (effectName) {
    case 'Cel Shading':
      newCleanup = applyCelShader(model);
      break;
    case 'Jelly Effect':
      newCleanup = applyJellyShader(model);
      break;
    case 'Rosie (Vibe Coding)':
      newCleanup = applyRosieShader(model) as unknown as (() => void) | null;
      break;
    case 'Marble (Spatial Intelligence)':
      newCleanup = applyMarbleShader(model) as unknown as (() => void) | null;
      break;
    case 'Asset Models (PixelVibe)':
      newCleanup = applyAssetModelsShader(model) as unknown as (() => void) | null;
      break;
    // Add more cases for other effects
    default:
      // No specific effect, use default materials
      break;
  }

  return newCleanup;
};
