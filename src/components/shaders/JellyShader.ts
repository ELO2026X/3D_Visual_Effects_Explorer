import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const JellyMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0x00ff00),
  },
  // Vertex Shader
  `
    uniform float time;
    varying vec3 vNormal;
    void main() {
      vNormal = normal;
      vec3 newPosition = position + normal * sin(position.y * 10.0 + time) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 color;
    varying vec3 vNormal;
    void main() {
      gl_FragColor = vec4(color * vNormal, 1.0);
    }
  `
);

extend({ JellyMaterial });

export interface JellyMaterialType extends THREE.ShaderMaterial {
  uniforms: {
    time: { value: number };
    color: { value: THREE.Color };
    [key: string]: THREE.IUniform<any>;
  };
}

export const applyJellyShader = (model: THREE.Object3D) => {
  const material = new (JellyMaterial as unknown as new () => JellyMaterialType)();
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
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

  // Return a cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId);
    material.dispose();
  };
};