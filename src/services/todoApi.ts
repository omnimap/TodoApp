import axios from 'axios';

// todoApi.ts
// Service for interacting with the backend todo API. Provides CRUD operations and type definitions for todos.

const API_BASE_URL = 'http://localhost:8080/api';

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const todoApi = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  },

  // Get todo by ID
  getTodoById: async (id: number): Promise<Todo> => {
    const response = await axios.get(`${API_BASE_URL}/todos/${id}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await axios.post(`${API_BASE_URL}/todos`, todo);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: number, todo: Partial<Todo>): Promise<Todo> => {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, todo);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
  },

  // Get todos by completion status
  getTodosByStatus: async (completed: boolean): Promise<Todo[]> => {
    const response = await axios.get(`${API_BASE_URL}/todos/completed/${completed}`);
    return response.data;
  },

  // Toggle completion status
  toggleTodoStatus: async (id: number): Promise<Todo> => {
    const response = await axios.patch(`${API_BASE_URL}/todos/${id}/toggle`);
    return response.data;
  }
};

export default todoApi; 