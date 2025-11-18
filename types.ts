// Fix: Import `ElementType` from `react` to resolve the "Cannot find namespace 'React'" error.
import type { ElementType } from 'react';

export interface User {
  username: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  icon: ElementType;
  color: string;
}

export interface CompletedTask {
  id: string;
  taskId: string;
  categoryId: string;
  taskTitle: string;
  categoryTitle: string;
  date: string;
  imageUrl: string;
  username: string;
}
