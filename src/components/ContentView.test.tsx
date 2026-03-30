import 'jsdom-global/register.js';
import test, { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock window.ResizeObserver
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

import { ContentView } from './ContentView.tsx';

describe('ContentView', () => {
  it('should display the loading state when isLoading is true', () => {
    const { container } = render(
      <ContentView
        effectData={null}
        isLoading={true}
        error={null}
        modelUrl=""
        selectedEffect={null}
        onUploadClick={() => {}}
        onFileChange={() => {}}
      />
    );

    const loadingText = screen.getByText('Loading description...');
    assert.ok(loadingText);

    // Assert the presence of SpinnerIcon. We can find it by checking if an svg exists with the animate-spin class or similar
    const spinner = container.querySelector('.animate-spin');
    assert.ok(spinner, 'SpinnerIcon should be present and animating');
  });
});
