import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as THREE from 'three';
import { applyCelShader } from './CelShader.ts';

describe('applyCelShader', () => {
  it('should apply MeshToonMaterial to meshes and add an outline mesh to parent', () => {
    const parent = new THREE.Object3D();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    parent.add(mesh);

    const cleanup = applyCelShader(parent);

    // Verify toon material replacement
    assert.strictEqual(mesh.material instanceof THREE.MeshToonMaterial, true);
    assert.strictEqual((mesh.material as THREE.MeshToonMaterial).color.getHex(), 0xff0000);

    // Verify outline mesh is added to parent
    const outlineMeshes = parent.children.filter((child) => child.name === 'outline');
    assert.strictEqual(outlineMeshes.length, 1);

    const outlineMesh = outlineMeshes[0] as THREE.Mesh;
    assert.strictEqual(outlineMesh.material instanceof THREE.MeshBasicMaterial, true);
    const outlineMat = outlineMesh.material as THREE.MeshBasicMaterial;
    assert.strictEqual(outlineMat.color.getHex(), 0x000000);
    assert.strictEqual(outlineMat.side, THREE.BackSide);

    // Verify scale is multiplied by 1.05
    assert.strictEqual(outlineMesh.scale.x, mesh.scale.x * 1.05);

    cleanup();
  });

  it('should ignore non-mesh objects', () => {
    const parent = new THREE.Object3D();
    const group = new THREE.Group();
    parent.add(group);

    const cleanup = applyCelShader(parent);

    // Group should not be modified, outline should not be added
    assert.strictEqual(parent.children.length, 1);
    assert.strictEqual(parent.children[0], group);

    cleanup();
  });

  it('cleanup function should remove outline meshes and dispose created materials', () => {
    const parent = new THREE.Object3D();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    parent.add(mesh);

    const cleanup = applyCelShader(parent);

    const initialChildrenCount = parent.children.length;
    assert.strictEqual(initialChildrenCount, 2); // mesh + outline

    const toonMaterial = mesh.material as THREE.MeshToonMaterial;
    const outlineMesh = parent.children.find(c => c.name === 'outline') as THREE.Mesh;
    const outlineMaterial = outlineMesh.material as THREE.MeshBasicMaterial;

    // Spy on dispose methods
    let toonDisposed = false;
    let outlineDisposed = false;
    toonMaterial.dispose = () => { toonDisposed = true; };
    outlineMaterial.dispose = () => { outlineDisposed = true; };

    cleanup();

    // Verify outline is removed
    assert.strictEqual(parent.children.length, 1);
    assert.strictEqual(parent.children.find(c => c.name === 'outline'), undefined);

    // Verify materials are disposed
    assert.strictEqual(toonDisposed, true);
    assert.strictEqual(outlineDisposed, true);
  });
});
