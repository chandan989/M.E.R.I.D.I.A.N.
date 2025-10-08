import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isInitialLoading: boolean;
  setIsInitialLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isInitialLoading, setIsInitialLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
