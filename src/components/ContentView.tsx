import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { ModelViewer } from './ModelViewer';
import { EffectData } from '../types';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ContentViewProps {
  effectData: EffectData | null;
  isLoading: boolean;
  error: string | null;
  modelUrl: string;
  selectedEffect: string | null;
  onUploadClick: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormattedDescription: React.FC<{ description: string }> = ({ description }) => {
  return (
    <div className="prose prose-invert max-w-none">
      {description.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-2 last:mb-0">{paragraph}</p>
      ))}
    </div>
  );
};

export const ContentView: React.FC<ContentViewProps> = ({
  effectData,
  isLoading,
  error,
  modelUrl,
  selectedEffect,
  onUploadClick,
}) => {
  console.log(`[ContentView] Rendering effect: ${selectedEffect || 'None'}, isLoading: ${isLoading}`);

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {effectData ? effectData.name : 'Select an Effect'}
        </h1>
        <div className="flex items-center gap-3">
          {isLoading && <span className="text-xs text-blue-400 animate-pulse font-mono uppercase tracking-widest">System Processing...</span>}
          <button
            onClick={onUploadClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-lg shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            Upload Custom Model
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        <div className="flex-1 bg-gray-700 rounded-lg relative flex items-center justify-center border border-gray-600">
          <Suspense fallback={
            <div className="text-white flex flex-col items-center">
              <SpinnerIcon className="animate-spin h-8 w-8 text-white" />
              <p className="mt-2 font-mono text-sm opacity-70">Initializing 3D Pipeline...</p>
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
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-gray-500 uppercase">
            Active Stream: {modelUrl.includes('blob:') ? 'Local Asset' : 'Default Cache'}
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-gray-700 rounded-lg p-4 overflow-y-auto border border-gray-600">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Effect Intelligence
          </h2>
          {isLoading ? (
            <div className="text-white flex flex-col items-center py-8">
              <SpinnerIcon className="animate-spin h-6 w-6 text-blue-400" />
              <p className="mt-2 text-sm text-gray-400 font-mono">Synthesizing description...</p>
            </div>
          ) : error ? (
            <div className="text-red-400 p-4 bg-red-900/20 rounded-md border border-red-800/50">
              <p className="font-bold uppercase text-xs mb-1 tracking-wider">Interface Warning</p>
              <p className="text-sm opacity-90">{error}</p>
              <p className="text-xs mt-3 pt-3 border-t border-red-800/30 italic text-gray-500">
                Visual engine remains operational. Description service temporarily disconnected.
              </p>
            </div>
          ) : effectData ? (
            <FormattedDescription description={effectData.description} />
          ) : (
            <p className="text-gray-400 font-mono text-sm italic">System standby. Select a neural filter from the sidebar.</p>
          )}
        </div>
      </div>
    </div>
  );
};
