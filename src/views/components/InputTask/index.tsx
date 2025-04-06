import React, { useEffect, useRef, useState } from 'react';
import { InputTaskProps } from '../../../interfaces/interfaces';
import styles from './index.module.scss';
import { useToDoStore } from '../../../data/stores/useToDoStore';

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  checked,
  onEdited,
  onRemoved,
}) => {
  const [check, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode, check]);

  const changeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!e.target.checked);
    useToDoStore.getState().changeTask(id, e.target.checked);
  };

  return (
    <div className={styles.inputTask}>
      <div className={styles.inputTaskWraper}>
        <label className={styles.inputTaskLabel}>
          <input
            className={styles.inputTaskCheckbox}
            disabled={isEditMode}
            type='checkbox'
            defaultChecked={checked}
            onChange={(e) => {
              changeTask(e);
            }}
          />
          <span className={styles.checkbox}></span>
        </label>
        {isEditMode ? (
          <input
            className={styles.inputTaskEditTitle}
            ref={editTitleInputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
          />
        ) : (
          <h3
            className={
              checked ? styles.inputTaskTitleDone : styles.inputTaskTitle
            }
          >
            {title}
          </h3>
        )}
      </div>
      {isEditMode ? (
        <button
          className={styles.inputTaskSave}
          aria-label='Save'
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          className={styles.inputTaskEdit}
          aria-label='Edit'
          onClick={() => {
            setIsEditMode(true);
          }}
        />
      )}
      <button
        className={styles.inputTaskRemove}
        aria-label='Remove'
        onClick={() => {
          if (confirm('Вы уверены?')) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};
