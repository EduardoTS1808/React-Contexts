import React, { useState } from 'react';
import { useApiContext } from '../contexts/ContextApi';
import { useLocalStorageContext } from '../contexts/ContextLocalStorage';

const CurrencyConverter: React.FC = () => {
  const { rates, loading, error } = useApiContext();
  const { addConversion } = useLocalStorageContext();

  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    if (rates) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      const conversionResult = amount * rate;
      setResult(conversionResult);

      const newConversion = {
        from: fromCurrency,
        to: toCurrency,
        amount,
        result: conversionResult,
        date: new Date().toLocaleString()
      };

      addConversion(newConversion);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Calculadora conversora de moedas globais</h2>
      <div>
        <label>
        De
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {rates && Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label>
          Para
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {rates && Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
        <label>
         Valor
          <input style={{
           
                fontSize: '18px',
                padding: '5px 10px',
                paddingLeft:'35px',
                outline: 'none',
                background: '#FFFFFF',
                color: '#000000',
                border:' 1px solid #C4D1EB',
                borderRadius:' 5px',
                boxShadow:' 3px 3px 2px 0px #E2E2E2',
                transition:' .3s ease'
            
          }} type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </label>
        <button style={{ 
  color: '#000000',
  fontSize: '14px',
  boxShadow: '1px 1px 5px #BEE2F9',
  padding: '10px 25px',
  borderRadius: '19px',
  border:' 0px double #A30A0A',
  background: '#FFF'}} onClick={handleConvert}> Click para Converter</button>
      </div>
      {result !== null && <div  style={{border:'2px solid #333', padding:'5px'}} >Resultado = {result.toFixed(2)}
    </div>}
    </div>
  );
};

export default CurrencyConverter;
