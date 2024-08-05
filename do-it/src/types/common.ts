export interface ButtonProps {
    text: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
  }
  
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoFormProps {
  onAdd: (text: string) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export interface TodoListItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
  