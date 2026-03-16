import * as THREE from 'three';

export const applyCelShader = (model: THREE.Object3D) => {
  const outlineMeshes: THREE.Mesh[] = [];
  const createdMaterials: THREE.Material[] = [];

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const toonMaterial = new THREE.MeshToonMaterial({
        color: (child.material as THREE.MeshStandardMaterial).color,
      });
      child.material = toonMaterial;
      createdMaterials.push(toonMaterial);

      const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
      const outlineMesh = new THREE.Mesh(child.geometry, outlineMaterial);
      outlineMesh.name = 'outline';
      outlineMesh.scale.copy(child.scale).multiplyScalar(1.05);
      outlineMesh.position.copy(child.position);
      outlineMesh.quaternion.copy(child.quaternion);
      outlineMeshes.push(outlineMesh);
      createdMaterials.push(outlineMaterial);
    }
  });

  outlineMeshes.forEach((mesh) => model.add(mesh));

  return () => {
    outlineMeshes.forEach((mesh) => {
      model.remove(mesh);
    });
    createdMaterials.forEach((material) => material.dispose());
  };
};
