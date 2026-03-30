import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const ChromaticAberrationMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0xffffff),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      float shift = 0.05 * sin(time * 2.0);
      float r = color.r;
      float g = color.g;
      float b = color.b;

      // Simple chromatic aberration simulation using normals or UVs
      // Since we're applying this to a 3D model, we can use normals to shift colors
      vec3 shiftedR = vec3(r, 0.0, 0.0) * max(0.2, dot(vNormal, vec3(1.0, 0.0, 0.0) + shift));
      vec3 shiftedG = vec3(0.0, g, 0.0) * max(0.2, dot(vNormal, vec3(0.0, 1.0, 0.0)));
      vec3 shiftedB = vec3(0.0, 0.0, b) * max(0.2, dot(vNormal, vec3(0.0, 0.0, 1.0) - shift));

      gl_FragColor = vec4(shiftedR + shiftedG + shiftedB, 1.0);
    }
  `
);

extend({ ChromaticAberrationMaterial });

export const applyChromaticAberrationShader = (model: THREE.Object3D) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const material = new (ChromaticAberrationMaterial as any)();
  const originalMaterials = new Map<string, THREE.Material>();

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      originalMaterials.set(child.uuid, child.material);
      if (child.material && (child.material as THREE.MeshStandardMaterial).color) {
        material.uniforms.color.value.copy((child.material as THREE.MeshStandardMaterial).color);
      }
      child.material = material;
    }
  });

  const clock = new THREE.Clock();
  let animationFrameId: number;

  const animate = () => {
    material.uniforms.time.value = clock.getElapsedTime();
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && originalMaterials.has(child.uuid)) {
        child.material = originalMaterials.get(child.uuid)!;
      }
    });
    material.dispose();
  };
};
