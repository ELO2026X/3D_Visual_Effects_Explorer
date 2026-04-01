import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as THREE from 'three';
import { applyRosieShader } from './RosieShader.ts';

describe('applyRosieShader', () => {
  it('should apply MeshBasicMaterial with correct properties to child meshes', () => {
    const model = new THREE.Object3D();

    const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial());
    const mesh2 = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshStandardMaterial());
    const group = new THREE.Group();
    const light = new THREE.PointLight();

    group.add(mesh2);
    model.add(mesh1);
    model.add(group);
    model.add(light);

    applyRosieShader(model);

    // Verify mesh1
    assert.ok(mesh1.material instanceof THREE.MeshBasicMaterial);
    const mat1 = mesh1.material as THREE.MeshBasicMaterial;
    assert.strictEqual(mat1.color.getHex(), 0x00ff00);
    assert.strictEqual(mat1.wireframe, true);
    assert.strictEqual(mat1.transparent, true);
    assert.strictEqual(mat1.opacity, 0.8);

    // Verify mesh2
    assert.ok(mesh2.material instanceof THREE.MeshBasicMaterial);
    const mat2 = mesh2.material as THREE.MeshBasicMaterial;
    assert.strictEqual(mat2.color.getHex(), 0x00ff00);
    assert.strictEqual(mat2.wireframe, true);
    assert.strictEqual(mat2.transparent, true);
    assert.strictEqual(mat2.opacity, 0.8);

    // Verify non-meshes are not affected (light has no material)
    assert.strictEqual((light as unknown as THREE.Mesh).material, undefined);
  });
});
