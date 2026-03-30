import { describe, it } from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FormattedDescription } from './FormattedDescription.tsx';

describe('FormattedDescription', () => {
  it('should render a single paragraph when given a string without newlines', () => {
    const markup = renderToStaticMarkup(
      <FormattedDescription description="Hello world" />
    );
    assert.strictEqual(
      markup,
      '<div class="prose prose-invert max-w-none"><p class="mb-2 last:mb-0">Hello world</p></div>'
    );
  });

  it('should render multiple paragraphs when given a string with newlines', () => {
    const markup = renderToStaticMarkup(
      <FormattedDescription description={'Hello\nWorld\n!'} />
    );
    assert.strictEqual(
      markup,
      '<div class="prose prose-invert max-w-none"><p class="mb-2 last:mb-0">Hello</p><p class="mb-2 last:mb-0">World</p><p class="mb-2 last:mb-0">!</p></div>'
    );
  });

  it('should handle empty inputs gracefully', () => {
    const markup = renderToStaticMarkup(
      <FormattedDescription description="" />
    );
    assert.strictEqual(
      markup,
      '<div class="prose prose-invert max-w-none"><p class="mb-2 last:mb-0"></p></div>'
    );
  });

  it('should handle inputs with multiple consecutive empty lines', () => {
    const markup = renderToStaticMarkup(
      <FormattedDescription description={'Line 1\n\n\nLine 2'} />
    );
    assert.strictEqual(
      markup,
      '<div class="prose prose-invert max-w-none"><p class="mb-2 last:mb-0">Line 1</p><p class="mb-2 last:mb-0"></p><p class="mb-2 last:mb-0"></p><p class="mb-2 last:mb-0">Line 2</p></div>'
    );
  });
});
