import test, { describe, it } from 'node:test';
import assert from 'node:assert';
import * as THREE from 'three';
import { applyModelEffect } from './effectUtils.ts';

describe('applyModelEffect', () => {
  it('should call cleanup Previous Effect if provided', () => {
    const model = new THREE.Group();
    const originalMaterials = new Map<string, THREE.Material>();
    let cleanupCalled = false;
    const cleanup = () => {
      cleanupCalled = true;
    };

    applyModelEffect(model, null, originalMaterials, cleanup);

    assert.strictEqual(cleanupCalled, true);
  });

  it('should reset materials to their original state', () => {
    const model = new THREE.Group();
    const mesh = new THREE.Mesh();
    mesh.uuid = 'test-mesh';

    const originalMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const currentMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    mesh.material = currentMaterial;
    mesh.visible = false;

    model.add(mesh);

    const originalMaterials = new Map<string, THREE.Material>();
    originalMaterials.set(mesh.uuid, originalMaterial);

    applyModelEffect(model, null, originalMaterials, null);

    assert.strictEqual(mesh.material, originalMaterial);
    assert.strictEqual(mesh.visible, true);
  });

  it('should remove outline and marble-points children', () => {
    const model = new THREE.Group();

    const outline = new THREE.Mesh();
    outline.name = 'outline';
    model.add(outline);

    const points = new THREE.Points();
    points.name = 'marble-points';
    model.add(points);

    const otherMesh = new THREE.Mesh();
    otherMesh.name = 'regular-mesh';
    model.add(otherMesh);

    assert.strictEqual(model.children.length, 3);

    const originalMaterials = new Map<string, THREE.Material>();
    applyModelEffect(model, null, originalMaterials, null);

    assert.strictEqual(model.children.length, 1);
    assert.strictEqual(model.children[0].name, 'regular-mesh');
  });

  it('should apply Cel Shading effect and return a cleanup function', () => {
    const model = new THREE.Group();
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    model.add(mesh);

    const originalMaterials = new Map<string, THREE.Material>();

    const cleanup = applyModelEffect(model, 'Cel Shading', originalMaterials, null);

    assert.ok(cleanup !== null, 'Should return a cleanup function');

    // Check if Cel Shader modified the material
    assert.ok(mesh.material instanceof THREE.MeshToonMaterial);
  });

  it('should apply Jelly Effect and return a cleanup function', () => {
    const model = new THREE.Group();
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());
    model.add(mesh);

    const originalMaterials = new Map<string, THREE.Material>();

    // Mock requestAnimationFrame for Jelly shader
    const originalRAF = global.requestAnimationFrame;
    let animationFrameCalled = false;
    global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
      animationFrameCalled = true;
      return 1; // Fake ID
    };

    // Mock cancelAnimationFrame as well to prevent errors during cleanup
    const originalCAF = global.cancelAnimationFrame;
    let cancelAnimationFrameCalled = false;
    global.cancelAnimationFrame = (id: number) => {
      cancelAnimationFrameCalled = true;
    };

    try {
      const cleanup = applyModelEffect(model, 'Jelly Effect', originalMaterials, null);

      assert.ok(cleanup !== null, 'Should return a cleanup function');
      // The JellyMaterial created by @react-three/drei's shaderMaterial might not be a direct instance of THREE.ShaderMaterial in this context,
      // but it should be a custom material with a 'time' uniform.
      assert.ok((mesh.material as any).uniforms !== undefined, 'Material should have uniforms');
      assert.ok((mesh.material as any).uniforms.time !== undefined, 'Material should have time uniform');
      assert.ok(animationFrameCalled, 'Should call requestAnimationFrame');

      cleanup!();
      assert.ok(cancelAnimationFrameCalled, 'Should call cancelAnimationFrame on cleanup');
    } finally {
      global.requestAnimationFrame = originalRAF;
      global.cancelAnimationFrame = originalCAF;
    }
  });

  it('should handle cases with no effect correctly', () => {
    const model = new THREE.Group();
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial());
    model.add(mesh);

    const originalMaterials = new Map<string, THREE.Material>();

    const cleanup = applyModelEffect(model, null, originalMaterials, null);
    assert.strictEqual(cleanup, null);

    const cleanup2 = applyModelEffect(model, 'Non Existent Effect', originalMaterials, null);
    assert.strictEqual(cleanup2, null);
  });
});
