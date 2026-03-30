import 'jsdom-global/register';
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Sidebar } from './Sidebar.tsx';

describe('Sidebar', () => {
  it('renders categories and effects correctly', () => {
    const categories = [
      {
        name: 'Lighting',
        effects: [
          { name: 'Ambient', apply: () => () => {} },
          { name: 'Directional', apply: () => () => {} },
        ]
      },
      {
        name: 'Materials',
        effects: [
          { name: 'Wireframe', apply: () => () => {} },
        ]
      }
    ];

    render(
      <Sidebar
        effectCategories={categories}
        selectedEffect={null}
        onSelectEffect={() => {}}
        isLoading={false}
      />
    );

    assert.ok(screen.getByText('Effects Explorer'));
    assert.ok(screen.getByText('Lighting'));
    assert.ok(screen.getByText('Materials'));
    assert.ok(screen.getByText('Ambient'));
    assert.ok(screen.getByText('Directional'));
    assert.ok(screen.getByText('Wireframe'));
    cleanup();
  });

  it('calls onSelectEffect when an effect is clicked', () => {
    let selectedEffectName = '';
    const categories = [
      {
        name: 'Lighting',
        effects: [
          { name: 'Ambient', apply: () => () => {} },
        ]
      }
    ];

    render(
      <Sidebar
        effectCategories={categories}
        selectedEffect={null}
        onSelectEffect={(name) => { selectedEffectName = name; }}
        isLoading={false}
      />
    );

    const button = screen.getByText('Ambient');
    fireEvent.click(button);

    assert.strictEqual(selectedEffectName, 'Ambient');
    cleanup();
  });

  it('disables buttons when isLoading is true', () => {
    const categories = [
      {
        name: 'Lighting',
        effects: [
          { name: 'Ambient', apply: () => () => {} },
        ]
      }
    ];

    render(
      <Sidebar
        effectCategories={categories}
        selectedEffect={null}
        onSelectEffect={() => {}}
        isLoading={true}
      />
    );

    const button = screen.getByText('Ambient') as HTMLButtonElement;
    assert.strictEqual(button.disabled, true);
    cleanup();
  });

  it('applies the correct styling for the selected effect', () => {
    const categories = [
      {
        name: 'Lighting',
        effects: [
          { name: 'Ambient', apply: () => () => {} },
          { name: 'Directional', apply: () => () => {} },
        ]
      }
    ];

    render(
      <Sidebar
        effectCategories={categories}
        selectedEffect={'Ambient'}
        onSelectEffect={() => {}}
        isLoading={false}
      />
    );

    const ambientButton = screen.getByText('Ambient');
    const directionalButton = screen.getByText('Directional');

    assert.ok(ambientButton.className.includes('bg-blue-600'));
    assert.ok(!directionalButton.className.includes('bg-blue-600'));
    cleanup();
  });
});
