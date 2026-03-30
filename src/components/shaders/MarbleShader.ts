import * as THREE from 'three';

export const applyMarbleShader = (model: THREE.Object3D) => {
  const pointsObjects: THREE.Points[] = [];
  const material = new THREE.PointsMaterial({
    color: 0x88ccff,
    size: 0.05,
    sizeAttenuation: true,
  });

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Hide the original mesh
      child.visible = false;

      // Create points based on the mesh geometry
      const geometry = child.geometry;

      const points = new THREE.Points(geometry, material);
      points.position.copy(child.position);
      points.rotation.copy(child.rotation);
      points.scale.copy(child.scale);

      // We attach a property so we can identify and clean it up later if needed
      points.name = 'marble-points';

      // Add the point cloud to the same parent as the original mesh to inherit transforms
      if (child.parent) {
        child.parent.add(points);
      } else {
        pointsObjects.push(points);
      }
    }
  });

  // Add the new point clouds to the model root only if they didn't have a parent
  pointsObjects.forEach(points => model.add(points));
};
