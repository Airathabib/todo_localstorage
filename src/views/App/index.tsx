import React, { useEffect } from 'react';
import { useToDoStore } from '../../data/stores/useToDoStore';
import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';
import { getCurrentState } from '../../data/helpers';

import styles from './index.module.scss';

export const App: React.FC = () => {
  const tasks = useToDoStore((state) => state.tasks);
  const createTask = useToDoStore((state) => state.createTask);
  const updateTask = useToDoStore((state) => state.updateTask);
  const removeTask = useToDoStore((state) => state.removeTask);

  useEffect(() => {
    getCurrentState();
  }, [tasks]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>Список задач</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if (title) createTask(title);
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>Список задач пуст</p>
        )}
        {tasks.map((task) => (
          <InputTask
            key={task.id}
            id={task.id}
            checked={task.checked}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  );
};
