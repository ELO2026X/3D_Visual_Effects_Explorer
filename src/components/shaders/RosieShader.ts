import * as THREE from 'three';

export const applyRosieShader = (model: THREE.Object3D) => {
  const sharedMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.8,
  });

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = sharedMaterial;
    }
  });

  return () => {
    sharedMaterial.dispose();
  };
};
