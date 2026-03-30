import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import * as THREE from 'three';
import { applyMarbleShader } from './MarbleShader.ts';

describe('applyMarbleShader', () => {
  it('should hide original meshes and add marble points', () => {
    const model = new THREE.Object3D();
    const meshGeometry = new THREE.BoxGeometry(1, 1, 1);
    const meshMaterial = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(meshGeometry, meshMaterial);

    mesh.position.set(1, 2, 3);
    mesh.rotation.set(0.1, 0.2, 0.3);
    mesh.scale.set(2, 2, 2);

    model.add(mesh);

    applyMarbleShader(model);

    assert.strictEqual(mesh.visible, false, 'Original mesh should be hidden');

    const points = model.children.find(child => child instanceof THREE.Points) as THREE.Points;
    assert.ok(points, 'Points object should be added to the model');
    assert.strictEqual(points.name, 'marble-points', 'Points object should have correct name');

    assert.strictEqual(points.position.x, 1);
    assert.strictEqual(points.position.y, 2);
    assert.strictEqual(points.position.z, 3);

    assert.strictEqual(points.rotation.x, 0.1);
    assert.strictEqual(points.rotation.y, 0.2);
    assert.strictEqual(points.rotation.z, 0.3);

    assert.strictEqual(points.scale.x, 2);
    assert.strictEqual(points.scale.y, 2);
    assert.strictEqual(points.scale.z, 2);

    const material = points.material as THREE.PointsMaterial;
    assert.ok(material instanceof THREE.PointsMaterial, 'Material should be PointsMaterial');
    assert.strictEqual(material.color.getHex(), 0x88ccff, 'Color should be 0x88ccff');
    assert.strictEqual(material.size, 0.05, 'Size should be 0.05');
    assert.strictEqual(material.sizeAttenuation, true, 'Size attenuation should be true');
  });

  it('should add points to the mesh parent if it exists', () => {
    const model = new THREE.Object3D();
    const parent = new THREE.Object3D();
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());

    parent.add(mesh);
    model.add(parent);

    applyMarbleShader(model);

    const points = parent.children.find(child => child instanceof THREE.Points);
    assert.ok(points, 'Points should be added to the mesh parent');
  });

  it('should ignore non-mesh objects', () => {
    const model = new THREE.Object3D();
    const light = new THREE.PointLight();
    const group = new THREE.Group();

    model.add(light);
    model.add(group);

    applyMarbleShader(model);

    assert.strictEqual(model.children.length, 2, 'No new objects should be added');
    assert.strictEqual(light.visible, true, 'Light should remain visible');
    assert.strictEqual(group.visible, true, 'Group should remain visible');
  });
});
