import React, { useState } from 'react';
import { InputPlusProps } from '../../../interfaces/interfaces';

import styles from './index.module.scss';

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');
  const addTask = () => {
    onAdd(inputValue);
    setInputValue('');
  };
	

  return (
    <div className={styles.inputPlus}>
      <input
        className={styles.inputPlusValue}
        type='text'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTask();
          }
        }}
        placeholder='Введите название задачи'
      />
      <button
        className={styles.inputPlusButton}
        onClick={addTask}
        aria-label='Add'
      ></button>
    </div>
  );
};
