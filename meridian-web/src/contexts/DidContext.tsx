import { createContext, useContext, useState, ReactNode } from 'react';

interface DidContextType {
  did: string | null;
  setDid: (did: string | null) => void;
}

const DidContext = createContext<DidContextType | undefined>(undefined);

export const DidProvider = ({ children }: { children: ReactNode }) => {
  const [did, setDid] = useState<string | null>(null);

  return (
    <DidContext.Provider value={{ did, setDid }}>
      {children}
    </DidContext.Provider>
  );
};

export const useDid = () => {
  const context = useContext(DidContext);
  if (!context) {
    throw new Error('useDid must be used within a DidProvider');
  }
  return context;
};
