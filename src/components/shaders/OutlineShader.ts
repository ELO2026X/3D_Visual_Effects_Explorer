import * as THREE from 'three';

export const applyOutlineShader = (model: THREE.Object3D) => {
  const outlineMeshes: { mesh: THREE.Mesh; parent: THREE.Object3D }[] = [];
  const outlineMaterials: THREE.Material[] = [];

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
      const outlineMesh = new THREE.Mesh(child.geometry, outlineMaterial);
      outlineMesh.name = 'outline';
      // Use the same local transform as the original mesh
      outlineMesh.scale.copy(child.scale).multiplyScalar(1.05);
      outlineMesh.position.copy(child.position);
      outlineMesh.quaternion.copy(child.quaternion);

      // Add to the same parent as the original mesh to correctly handle nested hierarchies
      if (child.parent) {
        child.parent.add(outlineMesh);
        outlineMeshes.push({ mesh: outlineMesh, parent: child.parent });
      }
      outlineMaterials.push(outlineMaterial);
    }
  });

  return () => {
    outlineMeshes.forEach(({ mesh, parent }) => {
      parent.remove(mesh);
    });
    outlineMaterials.forEach((material) => material.dispose());
  };
};
