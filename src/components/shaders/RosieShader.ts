import * as THREE from 'three';

export const applyRosieShader = (model: THREE.Object3D) => {
  const originalMaterials = new Map<string, THREE.Material>();
  const rosieMaterials: THREE.Material[] = [];

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      originalMaterials.set(child.uuid, child.material);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      child.material = material;
      rosieMaterials.push(material);
    }
  });

  return () => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && originalMaterials.has(child.uuid)) {
        child.material = originalMaterials.get(child.uuid)!;
      }
    });
    rosieMaterials.forEach((material) => material.dispose());
  };
};
