import React from 'react';
import { ApiProvider } from './contexts/ContextApi';
import { LocalStorageProvider } from './contexts/ContextLocalStorage';
import CurrencyConverter from './components/Convert';
import ConversionHistory from './components/ConvertHistori';
import './App.css';

const App: React.FC = () => {
  return (
    <ApiProvider>
      <LocalStorageProvider>
        <div className="app">
          <CurrencyConverter />
          <ConversionHistory />
        </div>
      </LocalStorageProvider>
    </ApiProvider>
  );
};

export default App;

