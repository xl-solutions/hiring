import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { getStock } from '@/Frontend/api/api';

export default function Header({ setStocks }) {
  const [newStock, setNewStock] = useState('');

  const handleInputChange = (event) => {
    setNewStock(event.target.value);
  };

  const handleAddStock = async () => {
    try {
      const response = await getStock(newStock)
      console.log(response)
      setStocks((prevStocks) => [...prevStocks, { ...response }]);
      setNewStock('');
    } catch (error) {
      throw error
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