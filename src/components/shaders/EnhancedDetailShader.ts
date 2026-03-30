import * as THREE from 'three';

/**
 * Enhanced Mesh Detail Shader
 * Uses procedural noise and vertex displacement to add detail and "paint" the mesh
 * based on spatial intelligence concepts.
 */
export const applyEnhancedDetailShader = (model: THREE.Object3D) => {
  const materials: { mesh: THREE.Mesh; originalMaterial: THREE.Material | THREE.Material[] }[] = [];

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      materials.push({ mesh: child, originalMaterial: child.material });

      const detailMaterial = new THREE.MeshStandardMaterial({
        color: 0x44aa88,
        roughness: 0.2,
        metalness: 0.8,
        flatShading: false,
      });

      // Inject custom shader logic for "painting" and displacement
      detailMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = { value: 0 };
        
        shader.vertexShader = `
          uniform float uTime;
          varying float vHeight;
          ${shader.vertexShader}
        `.replace(
          '#include <begin_vertex>',
          `
          #include <begin_vertex>
          vHeight = position.y;
          float displacement = sin(position.x * 5.0 + uTime) * 0.05;
          transformed.y += displacement;
          `
        );

        shader.fragmentShader = `
          varying float vHeight;
          ${shader.fragmentShader}
        `.replace(
          '#include <color_fragment>',
          `
          #include <color_fragment>
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.0, 0.8, 1.0), clamp(vHeight + 0.5, 0.0, 1.0));
          `
        );

        // Animation loop for the shader
        const animate = (time: number) => {
          shader.uniforms.uTime.value = time * 0.001;
          requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      };

      child.material = detailMaterial;
    }
  });

  return () => {
    materials.forEach(({ mesh, originalMaterial }) => {
      if (mesh.material instanceof THREE.Material) {
        mesh.material.dispose();
      }
      mesh.material = originalMaterial;
    });
  };
};
