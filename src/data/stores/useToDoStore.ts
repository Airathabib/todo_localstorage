import { create } from 'zustand';
import {
  generateId,
  getCurrentState,
  localStorageUpdate,
  removeTodoFromStorage,
} from '../helpers';
import { ToDoStore } from '../../interfaces/interfaces';

export const useToDoStore = create<ToDoStore>((set, get) => ({
  tasks: getCurrentState(),
  createTask(title) {
    const { tasks } = get();
    const newTask = {
      id: generateId(),
      title,
      checked: false,
      createdAt: Date.now(),
    };
    set({
      tasks: [newTask].concat(tasks),
    });
    localStorageUpdate('tasks', get());
  },

  changeTask(id: string, checked: boolean) {
    const { tasks } = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        checked: task.id === id ? checked : task.checked,
      })),
    });
    localStorageUpdate('tasks', get());
  },

  updateTask(id, title) {
    const { tasks } = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      })),
    });
    localStorageUpdate('tasks', get());
  },
  removeTask(id) {
    const { tasks } = get();
    set({
      tasks: tasks.filter((task) => task.id !== id),
    });
    removeTodoFromStorage(id);
  },
}));
