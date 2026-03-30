import * as THREE from 'three';

export const applyAssetModelsShader = (model: THREE.Object3D) => {
  const originalMaterials = new Map<string, THREE.Material>();
  const assetMaterials: THREE.Material[] = [];

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      originalMaterials.set(child.uuid, child.material);
      let color = new THREE.Color(0xffffff);
      if (child.material && child.material instanceof THREE.MeshStandardMaterial && child.material.color) {
        color = child.material.color;
      }

      const material = new THREE.MeshStandardMaterial({
        color: color,
        flatShading: true,
        roughness: 1.0,
      });
      child.material = material;
      assetMaterials.push(material);
    }
  });

  return () => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && originalMaterials.has(child.uuid)) {
        child.material = originalMaterials.get(child.uuid)!;
      }
    });
    assetMaterials.forEach((material) => material.dispose());
  };
};
