import * as THREE from 'three';

export const applyCelShader = (model: THREE.Object3D) => {
  const outlineMeshes: { mesh: THREE.Mesh; parent: THREE.Object3D }[] = [];
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

      if (child.parent) {
        outlineMeshes.push({ mesh: outlineMesh, parent: child.parent });
      }
      createdMaterials.push(outlineMaterial);
    }
  });

  outlineMeshes.forEach(({ mesh, parent }) => parent.add(mesh));

  return () => {
    outlineMeshes.forEach(({ mesh, parent }) => {
      parent.remove(mesh);
    });
    createdMaterials.forEach((material) => material.dispose());
  };
};
