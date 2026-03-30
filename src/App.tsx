import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentView } from './components/ContentView';
import { effectCategories, DEFAULT_MODEL_URL } from './constants';
import { generateEffectDescription } from './services/geminiService';
import { EffectData } from './types';

function App() {
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string>(DEFAULT_MODEL_URL);
  const [effectData, setEffectData] = useState<EffectData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    // Set initial selected effect to the first effect in the first category
    if (effectCategories.length > 0 && effectCategories[0].effects.length > 0) {
      const initialEffect = effectCategories[0].effects[0].name;
      console.log(`[App] Initializing with effect: ${initialEffect}`);
      setSelectedEffect(initialEffect);
    }
  }, []);

  const fetchEffectData = useCallback(async (effectName: string) => {
    console.log(`[App] Requesting data for effect: ${effectName}`);
    setError(null);
    if (cache.current.has(effectName)) {
      console.log(`[App] Using cached description for: ${effectName}`);
      setEffectData({ name: effectName, description: cache.current.get(effectName)! });
      return;
    }

    setIsLoading(true);
    try {
      const description = await generateEffectDescription(effectName);
      console.log(`[App] Successfully fetched description for: ${effectName}`);
      cache.current.set(effectName, description);
      setEffectData({ name: effectName, description });
    } catch (err) {
      console.error(`[App] Error fetching description for ${effectName}:`, err);
      setError("Failed to load effect description.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedEffect) {
      fetchEffectData(selectedEffect);
    }
  }, [selectedEffect, fetchEffectData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(`[App] New model file selected: ${file.name} (${file.size} bytes)`);
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };

  const handleUploadClick = () => {
    console.log("[App] Triggering custom model upload");
    document.getElementById('model-upload-input')?.click();
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        effectCategories={effectCategories}
        selectedEffect={selectedEffect}
        onSelectEffect={setSelectedEffect}
        isLoading={isLoading}
      />
      <ContentView
        effectData={effectData}
        isLoading={isLoading}
        error={error}
        modelUrl={modelUrl}
        selectedEffect={selectedEffect}
        onUploadClick={handleUploadClick}
        onFileChange={handleFileChange}
      />
      <input
        id="model-upload-input"
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default App;
