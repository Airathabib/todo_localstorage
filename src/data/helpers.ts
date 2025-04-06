import { ToDoStore } from '../interfaces/interfaces';

type GenerateId = () => string;

export const generateId: GenerateId = () =>
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36);

export const getCurrentState = () =>
  JSON.parse(localStorage.getItem('tasks') ?? '[]');

export const localStorageUpdate = (key: string, state: ToDoStore) => {
  if (key === 'tasks') {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }
};

export const removeTodoFromStorage = (id: string) =>
  localStorage.setItem(
    'tasks',
    JSON.stringify(
      JSON.parse(localStorage.getItem('tasks') ?? '[]').filter(
        (item: { id: string }) => item.id !== id
      )
    )
  );
