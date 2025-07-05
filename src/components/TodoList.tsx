import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { Todo } from '../services/todoApi';
import todoApi from '../services/todoApi';
import './TodoList.css';
import { PlusIcon } from '@heroicons/react/24/solid';

// TodoList.tsx
// Main component for displaying and managing the todo list, including filters, sorting, and actions. Handles API integration and renders TodoItem components.
// Provides the main UI for the todo app.

const getStoredUser = () => {
  try {
    return localStorage.getItem('todoUser') || '';
  } catch {
    return '';
  }
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [showAddModal, setShowAddModal] = useState(false);
  const [user, setUser] = useState<string>(getStoredUser());
  const [showLogin, setShowLogin] = useState(!getStoredUser());
  const [loginInput, setLoginInput] = useState('');

  useEffect(() => {
    if (user) loadTodos();
  }, [user]);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getAllTodos(user);
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Please check if the API server is running.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo: Omit<Todo, 'id'>) => {
    try {
      const addedTodo = await todoApi.createTodo({ ...newTodo, userId: user });
      setTodos(prev => [...prev, addedTodo]);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoApi.toggleTodoStatus(id, user);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('Failed to toggle todo. Please try again.');
      console.error('Error toggling todo:', err);
    }
  };

  const handleUpdateTodo = async (id: number, updatedTodo: Partial<Todo>) => {
    try {
      const updated = await todoApi.updateTodo(id, { ...updatedTodo, userId: user });
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updated : todo
      ));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id, user);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInput.trim()) {
      setUser(loginInput.trim());
      localStorage.setItem('todoUser', loginInput.trim());
      setShowLogin(false);
    }
  };

  const handleLogout = () => {
    setUser('');
    localStorage.removeItem('todoUser');
    setShowLogin(true);
    setTodos([]);
  };

  const filteredAndSortedTodos = todos
    .filter(todo => todo.userId === user)
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      // Sort by date (newest first)
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

  const completedCount = filteredAndSortedTodos.filter(todo => todo.completed).length;
  const totalCount = filteredAndSortedTodos.length;

  if (showLogin) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              type="text"
              value={loginInput}
              onChange={e => setLoginInput(e.target.value)}
              placeholder="Enter your username"
              className="add-todo-input"
              autoFocus
            />
            <button type="submit" className="btn btn-add" disabled={!loginInput.trim()}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  // Modal close on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowAddModal(false);
    }
  };

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h1>Todo App</h1>
        <div className="todo-stats">
          {totalCount > 0 && (
            <span className="todo-count">
              {completedCount} of {totalCount} completed
            </span>
          )}
        </div>
        <button className="btn btn-cancel" style={{ position: 'absolute', top: 24, right: 24 }} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={loadTodos} className="btn btn-retry">
            Retry
          </button>
        </div>
      )}

      <div className="add-todo-fab" onClick={() => setShowAddModal(true)} title="Add Todo">
        <PlusIcon style={{ width: 32, height: 32 }} />
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <AddTodo onAdd={handleAddTodo} userId={user} />
            <button className="btn btn-cancel" style={{marginTop: 12}} onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="add-todo-center" style={{ display: 'none' }}></div>

      <div className="add-todo-center">
        <div className="add-todo-card">
          <div className="todo-controls">
            <div className="filter-controls">
              <button
                onClick={() => setFilter('all')}
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              >
                Completed
              </button>
            </div>

            <div className="sort-controls">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                className="sort-select"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
          <div className="todos-scrollable">
            <div className="todos-container">
              {filteredAndSortedTodos.length === 0 ? (
                <div className="empty-state">
                  {filter === 'all' ? (
                    <>
                      <div className="empty-icon">📝</div>
                      <h3>No todos yet</h3>
                      <p>Add your first todo to get started!</p>
                    </>
                  ) : (
                    <>
                      <div className="empty-icon">✅</div>
                      <h3>No {filter} todos</h3>
                      <p>Try changing the filter or add some todos.</p>
                    </>
                  )}
                </div>
              ) : (
                filteredAndSortedTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onUpdate={handleUpdateTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList; 