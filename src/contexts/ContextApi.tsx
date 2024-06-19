import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ExchangeRates {
  [key: string]: number;
}

interface ApiContextProps {
  rates: ExchangeRates | null;
  loading: boolean;
  error: string | null;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then((response) => response.json())
      .then((data) => {
        setRates(data.rates);
        setLoading(false);
      })
      .catch((error) => {
        setError('Falha ao buscar taxas de câmbio');
        setLoading(false);
      });
  }, []);

  return (
    <ApiContext.Provider value={{ rates, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};

const useApiContext = (): ApiContextProps => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext deve ser usado dentro de um ApiProvider');
  }
  return context;
};

export { ApiProvider, useApiContext };
