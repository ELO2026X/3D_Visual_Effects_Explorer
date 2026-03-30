import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import * as THREE from 'three';
import { applyAssetModelsShader } from './AssetModelsShader.ts';

describe('applyAssetModelsShader', () => {
  it('should update Mesh material to MeshStandardMaterial with correct properties', () => {
    const mesh = new THREE.Mesh();
    mesh.material = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff0000) });

    applyAssetModelsShader(mesh as THREE.Object3D);

    assert.ok(mesh.material instanceof THREE.MeshStandardMaterial);
    const material = mesh.material as THREE.MeshStandardMaterial;
    assert.strictEqual(material.flatShading, true);
    assert.strictEqual(material.roughness, 1.0);
  });

  it('should preserve color from existing MeshStandardMaterial', () => {
    const color = new THREE.Color(0x00ff00);
    const mesh = new THREE.Mesh();
    mesh.material = new THREE.MeshStandardMaterial({ color });

    applyAssetModelsShader(mesh as THREE.Object3D);

    const material = mesh.material as THREE.MeshStandardMaterial;
    assert.strictEqual(material.color.getHex(), color.getHex());
  });

  it('should use default white color for non-MeshStandardMaterial', () => {
    const mesh = new THREE.Mesh();
    mesh.material = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x0000ff) });

    applyAssetModelsShader(mesh as THREE.Object3D);

    const material = mesh.material as THREE.MeshStandardMaterial;
    assert.strictEqual(material.color.getHex(), 0xffffff);
  });

  it('should update all meshes in a hierarchy', () => {
    const group = new THREE.Group();
    const mesh1 = new THREE.Mesh();
    const mesh2 = new THREE.Mesh();
    group.add(mesh1 as any);
    group.add(mesh2 as any);

    applyAssetModelsShader(group as THREE.Object3D);

    assert.ok(mesh1.material instanceof THREE.MeshStandardMaterial);
    assert.ok(mesh2.material instanceof THREE.MeshStandardMaterial);
  });

  it('should not affect non-mesh objects', () => {
    const light = new THREE.PointLight();
    const group = new THREE.Group();
    group.add(light as any);

    applyAssetModelsShader(group as THREE.Object3D);

    assert.ok(group.children[0] instanceof THREE.PointLight);
  });
});
