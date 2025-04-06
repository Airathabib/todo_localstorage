export interface Task {
  id: string;
  title: string;
  checked: boolean;
  createdAt: number;
}

export interface InputPlusProps {
  onAdd: (title: string) => void;
}

export interface ToDoStore {
  changeTask(id: string, checked: boolean): unknown;
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}
export interface InputTaskProps {
  id: string;
  title: string;
  checked: boolean;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}
