import * as THREE from 'three';

export const applyAssetModelsShader = (model: THREE.Object3D) => {
  const materials: THREE.MeshStandardMaterial[] = [];

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
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
      materials.push(material);
    }
  });

  return () => {
    materials.forEach((material) => material.dispose());
  };
};
