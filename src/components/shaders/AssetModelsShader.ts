import * as THREE from 'three';

export const applyAssetModelsShader = (model: THREE.Object3D) => {
  const materialCache = new Map<number, THREE.MeshStandardMaterial>();

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      let color = new THREE.Color(0xffffff);
      if (child.material && child.material instanceof THREE.MeshStandardMaterial && child.material.color) {
        color = child.material.color;
      }

      const colorHex = color.getHex();
      let cachedMaterial = materialCache.get(colorHex);

      if (!cachedMaterial) {
        cachedMaterial = new THREE.MeshStandardMaterial({
          color: color,
          flatShading: true,
          roughness: 1.0,
        });
        materialCache.set(colorHex, cachedMaterial);
      }

      child.material = cachedMaterial;
    }
  });

  return () => {
    materialCache.forEach((material) => {
      material.dispose();
    });
    materialCache.clear();
  };
};
