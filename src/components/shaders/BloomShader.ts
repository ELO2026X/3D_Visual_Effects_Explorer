import * as THREE from 'three';

export const applyBloomShader = (model: THREE.Object3D) => {
  const bloomMaterials: THREE.Material[] = [];
  const originalMaterials = new Map<string, THREE.Material>();

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      originalMaterials.set(child.uuid, child.material);
      const bloomMaterial = new THREE.MeshStandardMaterial({
        color: (child.material as THREE.MeshStandardMaterial).color,
        emissive: (child.material as THREE.MeshStandardMaterial).color,
        emissiveIntensity: 1.5,
        roughness: 0.1,
        metalness: 0.5,
      });
      child.material = bloomMaterial;
      bloomMaterials.push(bloomMaterial);
    }
  });

  return () => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && originalMaterials.has(child.uuid)) {
        child.material = originalMaterials.get(child.uuid)!;
      }
    });
    bloomMaterials.forEach((material) => material.dispose());
  };
};
