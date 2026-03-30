import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { ModelViewer } from './ModelViewer';
import { ShowcaseAnimator } from './ShowcaseAnimator';
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
  const [isShowcaseMode, setIsShowcaseMode] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {effectData ? effectData.name : 'Select an Effect'}
        </h1>
        <div className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isShowcaseMode}
                onChange={() => setIsShowcaseMode(!isShowcaseMode)}
              />
              <div className={`block w-10 h-6 rounded-full transition-colors ${isShowcaseMode ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isShowcaseMode ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <span className="ml-3 text-white font-medium">Showcase Mode</span>
          </label>
          <button
            onClick={onUploadClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Upload Custom Model
          </button>
        </div>
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
                <ShowcaseAnimator isEnabled={isShowcaseMode}>
                  <ModelViewer modelPath={modelUrl} effectName={selectedEffect} />
                </ShowcaseAnimator>
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
