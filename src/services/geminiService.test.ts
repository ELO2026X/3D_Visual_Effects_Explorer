import { describe, it } from 'node:test';
import assert from 'node:assert';
import { generateEffectDescription } from './geminiService.ts';

describe('generateEffectDescription', () => {
  it('should return effect description on successful fetch', async () => {
    const mockDescription = 'A cool visual effect.';
    const mockResponse = {
      ok: true,
      json: async () => ({ description: mockDescription }),
    };

    const originalFetch = global.fetch;
    global.fetch = async () => mockResponse as Response;

    try {
      const description = await generateEffectDescription('CoolEffect');
      assert.strictEqual(description, mockDescription);
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('should throw error when response is not ok', async () => {
    const mockResponse = {
      ok: false,
    };

    const originalFetch = global.fetch;
    global.fetch = async () => mockResponse as any;

    try {
      await assert.rejects(
        generateEffectDescription('CoolEffect'),
        { message: 'Failed to fetch effect description' }
      );
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('should throw error on network failure', async () => {
    const originalFetch = global.fetch;
    global.fetch = async () => {
      throw new Error('Network error');
    };

    try {
      await assert.rejects(
        generateEffectDescription('CoolEffect'),
        { message: 'Network error' }
      );
    } finally {
      global.fetch = originalFetch;
    }
  });
});
