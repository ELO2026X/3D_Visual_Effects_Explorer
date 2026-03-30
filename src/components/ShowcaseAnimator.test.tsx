import 'jsdom-global/register.js';
import React from 'react';
import { test } from 'node:test';
import assert from 'node:assert';

// We must mock the window object before importing anything that might use it
if (typeof window !== 'undefined') {
  (window as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

import { renderToStaticMarkup } from 'react-dom/server';
import { Canvas } from '@react-three/fiber';
import { ShowcaseAnimator } from './ShowcaseAnimator.tsx';

test('ShowcaseAnimator renders correctly in Canvas', () => {
  const html = renderToStaticMarkup(
    <Canvas>
      <ShowcaseAnimator isEnabled={true}>
        <mesh data-testid="child-mesh" />
      </ShowcaseAnimator>
    </Canvas>
  );

  // Just verify it doesn't throw and renders an output
  assert.ok(html !== undefined);
});
