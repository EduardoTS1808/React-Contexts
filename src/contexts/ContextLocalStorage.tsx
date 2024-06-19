import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Conversion {
  from: string;
  to: string;
  amount: number;
  result: number;
  date: string;
}

interface LocalStorageContextProps {
  conversions: Conversion[];
  addConversion: (conversion: Conversion) => void;
}

const LocalStorageContext = createContext<LocalStorageContextProps | undefined>(undefined);

const LocalStorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversions, setConversions] = useState<Conversion[]>(() => {
    const savedConversions = localStorage.getItem('converssoes');
    return savedConversions ? JSON.parse(savedConversions) : [];
  });

  useEffect(() => {
    localStorage.setItem('converssoes', JSON.stringify(conversions));
  }, [conversions]);

  const addConversion = (conversion: Conversion) => {
    setConversions([...conversions, conversion]);
  };

  return (
    <LocalStorageContext.Provider value={{ conversions, addConversion }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

const useLocalStorageContext = (): LocalStorageContextProps => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error('useLocalStorageContext must be used within a LocalStorageProvider');
  }
  return context;
};

export { LocalStorageProvider, useLocalStorageContext };
