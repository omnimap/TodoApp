// AddTodo.tsx
// Component for adding a new todo. Handles input, description, and submission logic for creating todos.
import React, { useState } from 'react';
import { Todo } from '../services/todoApi';
import './AddTodo.css';
import { PlusIcon } from '@heroicons/react/24/solid';

interface AddTodoProps {
  onAdd: (todo: Omit<Todo, 'id'>) => void;
  userId?: string;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd, userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        completed: false,
        userId: userId || undefined
      });
      setTitle('');
      setDescription('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit} className="add-todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="What needs to be done?"
          className="add-todo-input"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Description (optional)"
          className="add-todo-textarea"
        />
        <div className="add-todo-actions">
          <button type="submit" className="btn btn-add" disabled={!title.trim()}>
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo; 