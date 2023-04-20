import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

export default function Header({ setStocks }) {
  const [newStock, setNewStock] = useState('');

  const handleInputChange = (event) => {
    setNewStock(event.target.value);
  };

  const handleAddStock = async () => {
    try {
      const response = await axios.get(`/api/stocks/${newStock}/quote`);
      const stockPrice = response.data;
      setStocks((prevStocks) => [...prevStocks, { ...stockPrice }]);
      setNewStock('');
    } catch (error) {
      console.error(error);
      // Tratar erro adequadamente
    }
  };

  return (
    <React.Fragment>
      <div className={styles.align}>
        <h1>Meu Portifolio</h1>
        <div className={styles.gap}>
          <button onClick={handleAddStock}>Incluir Ação</button>
          <input value={newStock} onChange={handleInputChange} />
        </div>
      </div>
    </React.Fragment>
  );
}