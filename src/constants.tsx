import { EffectCategory } from './types';

export const effectCategories: EffectCategory[] = [
  {
    name: 'Basic Effects',
    effects: [
      { name: 'Cel Shading', description: 'Applies a cartoon-like cel shading effect.' },
      { name: 'Jelly Effect', description: 'Makes the model appear wobbly and jelly-like.' },
      { name: 'Outline', description: 'Adds a prominent outline to the model.' },
    ],
  },
  {
    name: 'Advanced Effects',
    effects: [
      { name: 'Chromatic Aberration', description: 'Simulates a common optical distortion.' },
      { name: 'Bloom', description: 'Adds a glow effect to bright areas.' },
    ],
  },
  {
    name: 'Rosebud AI',
    effects: [
      { name: 'Rosie (Vibe Coding)', description: 'Simulates LLM-to-code vibe coding by applying a digital matrix look.' },
      { name: 'Marble (Spatial Intelligence)', description: 'Simulates Gaussian splatting by converting the model into point clouds.' },
      { name: 'Asset Models (PixelVibe)', description: 'Simulates 2D asset generation by applying a stylized pixelated flat shading.' },
      { name: 'Enhanced Detail', description: 'Enhances 3D mesh with procedural detailing and dynamic painting.' },
      { name: 'Gaussian Splat', description: 'Renders high-fidelity 3D captures using Gaussian Splatting.' },
    ],
  },
];

export const DEFAULT_MODEL_URL = '/a_cute_little_gummy_b_0806032807_texture.glb';
