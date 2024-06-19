import React from 'react';
import { useLocalStorageContext } from '../contexts/ContextLocalStorage';

const ConversionHistory: React.FC = () => {
  const { conversions } = useLocalStorageContext();

  return (
    <div>
      <h2>Histórico</h2>
      <ul>
        {conversions.map((conversion, index) => (
          <li style={{border: '2px solid #000', listStyle: 'none', paddingLeft: '15px',borderRadius: '10px', paddingRight: '10px', margin: '20px'}} key={index}>
            <p> data e hora  {conversion.date} </p>
            <p>de  {conversion.from} para  {conversion.to}  </p>
            <p>valor digitado = {conversion.amount} </p>
            <p> Resultado = {conversion.result.toFixed(2)}</p>
          
             
            
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversionHistory;
