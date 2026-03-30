import test, { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import * as THREE from 'three';
import { applyJellyShader } from './JellyShader.ts';

describe('applyJellyShader', () => {
  let originalRequestAnimationFrame: typeof global.requestAnimationFrame;
  let originalCancelAnimationFrame: typeof global.cancelAnimationFrame;
  let rafCallbacks: FrameRequestCallback[] = [];
  let rafIdCounter = 0;

  beforeEach(() => {
    originalRequestAnimationFrame = global.requestAnimationFrame;
    originalCancelAnimationFrame = global.cancelAnimationFrame;

    global.requestAnimationFrame = (callback: FrameRequestCallback) => {
      rafIdCounter++;
      rafCallbacks.push(callback);
      return rafIdCounter;
    };

    global.cancelAnimationFrame = (id: number) => {
      // Basic mock
    };
  });

  afterEach(() => {
    global.requestAnimationFrame = originalRequestAnimationFrame;
    global.cancelAnimationFrame = originalCancelAnimationFrame;
    rafCallbacks = [];
    rafIdCounter = 0;
  });

  it('should apply material to meshes', () => {
    const model = new THREE.Object3D();
    const mesh = new THREE.Mesh();
    model.add(mesh);

    const cleanup = applyJellyShader(model);

    assert.ok(mesh.material !== undefined);
    assert.ok((mesh.material as any).uniforms !== undefined);
    assert.ok((mesh.material as any).uniforms.time !== undefined);

    cleanup();
  });

  it('should not apply material to non-meshes', () => {
    const model = new THREE.Object3D();
    const light = new THREE.PointLight();
    model.add(light);

    const cleanup = applyJellyShader(model);

    assert.strictEqual((light as any).material, undefined);

    cleanup();
  });

  it('should set up animation loop that updates time uniform', () => {
    const model = new THREE.Object3D();
    const mesh = new THREE.Mesh();
    model.add(mesh);

    const cleanup = applyJellyShader(model);

    // There should be a callback queued
    assert.strictEqual(rafCallbacks.length, 1);

    // Trigger the callback
    const cb = rafCallbacks[0];
    cb(0);

    // It should queue another callback
    assert.strictEqual(rafCallbacks.length, 2);

    cleanup();
  });

  it('should dispose material and cancel animation on cleanup', () => {
    const model = new THREE.Object3D();
    const mesh = new THREE.Mesh();
    model.add(mesh);

    let cancelCalledId = -1;
    global.cancelAnimationFrame = (id: number) => {
      cancelCalledId = id;
    };

    const cleanup = applyJellyShader(model);
    const material = mesh.material as any;

    let disposeCalled = false;
    material.dispose = () => {
      disposeCalled = true;
    };

    cleanup();

    assert.strictEqual(cancelCalledId, rafIdCounter);
    assert.strictEqual(disposeCalled, true);
  });
});
