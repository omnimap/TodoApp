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
  userId?: string;
}

const todoApi = {
  // Get all todos for user
  getAllTodos: async (userId: string): Promise<Todo[]> => {
    const response = await axios.get(`${API_BASE_URL}/todos`, { params: { userId } });
    return response.data;
  },

  // Get todo by ID (user-specific)
  getTodoById: async (id: number, userId: string): Promise<Todo> => {
    const response = await axios.get(`${API_BASE_URL}/todos/${id}`, { params: { userId } });
    return response.data;
  },

  // Create new todo (userId in body)
  createTodo: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await axios.post(`${API_BASE_URL}/todos`, todo);
    return response.data;
  },

  // Update todo (user-specific)
  updateTodo: async (id: number, todo: Partial<Todo> & { userId: string }): Promise<Todo> => {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, todo, { params: { userId: todo.userId } });
    return response.data;
  },

  // Delete todo (user-specific)
  deleteTodo: async (id: number, userId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/todos/${id}`, { params: { userId } });
  },

  // Get todos by completion status (user-specific)
  getTodosByStatus: async (completed: boolean, userId: string): Promise<Todo[]> => {
    const response = await axios.get(`${API_BASE_URL}/todos/completed/${completed}`, { params: { userId } });
    return response.data;
  },

  // Toggle completion status (user-specific)
  toggleTodoStatus: async (id: number, userId: string): Promise<Todo> => {
    const response = await axios.patch(`${API_BASE_URL}/todos/${id}/toggle`, null, { params: { userId } });
    return response.data;
  }
};

export default todoApi; 