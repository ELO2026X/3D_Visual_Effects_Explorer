import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { ModelViewer } from './ModelViewer';
import { EffectData } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { FormattedDescription } from './FormattedDescription.tsx';

interface ContentViewProps {
  effectData: EffectData | null;
  isLoading: boolean;
  error: string | null;
  modelUrl: string;
  selectedEffect: string | null;
  onUploadClick: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContentView: React.FC<ContentViewProps> = ({
  effectData,
  isLoading,
  error,
  modelUrl,
  selectedEffect,
  onUploadClick,
}) => {
  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {effectData ? effectData.name : 'Select an Effect'}
        </h1>
        <button
          onClick={onUploadClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Upload Custom Model
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        <div className="flex-1 bg-gray-700 rounded-lg relative flex items-center justify-center">
          <Suspense fallback={
            <div className="text-white flex flex-col items-center">
              <SpinnerIcon className="animate-spin h-8 w-8 text-white" />
              <p className="mt-2">Loading 3D model...</p>
            </div>
          }>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]} flat>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Stage environment="city" intensity={0.6}>
                <ModelViewer modelPath={modelUrl} effectName={selectedEffect} />
              </Stage>
              <OrbitControls />
            </Canvas>
          </Suspense>
        </div>

        <div className="w-full lg:w-1/3 bg-gray-700 rounded-lg p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Effect Description</h2>
          {isLoading ? (
            <div className="text-white flex flex-col items-center py-4">
              <SpinnerIcon className="animate-spin h-6 w-6 text-white" />
              <p className="mt-2 text-sm text-gray-400">Loading description...</p>
            </div>
          ) : error ? (
            <div className="text-red-400 p-3 bg-red-900/30 rounded-md border border-red-800">
              <p className="font-medium">Service Info:</p>
              <p className="text-sm opacity-90">{error}</p>
              <p className="text-xs mt-2 italic text-gray-400">(The 3D viewer is still active above)</p>
            </div>
          ) : effectData ? (
            <FormattedDescription description={effectData.description} />
          ) : (
            <p className="text-gray-400">Select an effect from the sidebar to see its description.</p>
          )}
        </div>
      </div>
    </div>
  );
};
