import { useBlurbGeneration } from '@/hooks/useBlurbGeneration';
import { BlurbRequest, PLATFORM } from '@/types';
import { UseCompletionHelpers } from 'ai/react';
import { createContext, useContext, ReactNode } from 'react';

type BlurbGenerationValue = {
  regenerate: (platformName: PLATFORM, oldBlurb: string, action: string) => Promise<void>;
  generate: (platformNames: PLATFORM[], blurbRequest: BlurbRequest) => Promise<void>;
  platformGenerationMap: Map<PLATFORM, UseCompletionHelpers>;
};

const BlurbGenerationContext = createContext<BlurbGenerationValue | null>(null);

export const useBlurbGenerationContext = (): BlurbGenerationValue => {
  const context = useContext(BlurbGenerationContext);
  if (!context) {
    throw new Error('useBlurbGenerationContext must be used within a BlurbGenerationProvider');
  }
  return context;
}

type BlurbGenerationProviderProps = {
  children: ReactNode;
};

export const BlurbGenerationProvider: React.FC<BlurbGenerationProviderProps> = ({ children }) => {
  const {generate, platformGenerationMap, regenerate} = useBlurbGeneration();
  
  return (
    <BlurbGenerationContext.Provider value={{generate, platformGenerationMap, regenerate}}>
      {children}
    </BlurbGenerationContext.Provider>
  );
}
