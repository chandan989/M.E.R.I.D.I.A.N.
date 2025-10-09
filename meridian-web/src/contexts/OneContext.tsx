import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserType = "provider" | "buyer" | null;

interface OneContextType {
  did: string | null;
  setDid: (did: string | null) => void;
  userType: UserType;
  setUserType: (userType: UserType) => void;
  isLoading: boolean;
}

const OneContext = createContext<OneContextType | undefined>(undefined);

const DID_STORAGE_KEY = 'meridian_user_did';
const USERTYPE_STORAGE_KEY = 'meridian_user_type';

export const OneProvider = ({ children }: { children: ReactNode }) => {
  const [did, setDidState] = useState<string | null>(null);
  const [userType, setUserTypeState] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load did and userType from localStorage on mount
  useEffect(() => {
    const storedDid = localStorage.getItem(DID_STORAGE_KEY);
    const storedUserType = localStorage.getItem(USERTYPE_STORAGE_KEY);
    
    if (storedDid) {
      setDidState(storedDid);
    }
    
    if (storedUserType && (storedUserType === 'provider' || storedUserType === 'buyer')) {
      setUserTypeState(storedUserType as UserType);
    }
    
    setIsLoading(false);
  }, []);

  // Wrapper to persist did to localStorage
  const setDid = (newDid: string | null) => {
    setDidState(newDid);
    if (newDid) {
      localStorage.setItem(DID_STORAGE_KEY, newDid);
    } else {
      localStorage.removeItem(DID_STORAGE_KEY);
    }
  };

  // Wrapper to persist userType to localStorage
  const setUserType = (newUserType: UserType) => {
    setUserTypeState(newUserType);
    if (newUserType) {
      localStorage.setItem(USERTYPE_STORAGE_KEY, newUserType);
    } else {
      localStorage.removeItem(USERTYPE_STORAGE_KEY);
    }
  };

  return (
    <OneContext.Provider value={{ did, setDid, userType, setUserType, isLoading }}>
      {children}
    </OneContext.Provider>
  );
};

export const useOne = () => {
  const context = useContext(OneContext);
  if (!context) {
    throw new Error('useOne must be used within a OneProvider');
  }
  return context;
};
