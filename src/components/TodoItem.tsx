// TodoItem.tsx
// Component for displaying a single todo item, including edit, delete, and toggle actions. Handles modal editing and UI for each todo.
import React, { useState } from 'react';
import { Todo } from '../services/todoApi';
import './TodoItem.css';
import { PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onUpdate: (id: number, updatedTodo: Partial<Todo>) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id!, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Modal close on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <div className="todo-edit">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                className="edit-input"
                placeholder="Todo title"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleKeyPress}
                className="edit-textarea"
                placeholder="Description (optional)"
              />
              <div className="edit-actions">
                <button onClick={handleSave} className="btn btn-save" title="Save">
                  <CheckIcon style={{ width: 22, height: 22 }} />
                </button>
                <button onClick={handleCancel} className="btn btn-cancel" title="Cancel">
                  <XMarkIcon style={{ width: 22, height: 22 }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isEditing && (
        <div className="todo-content">
          <div className="todo-header">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id!)}
              className="todo-checkbox"
            />
            <h3 className="todo-title">{todo.title}</h3>
            <div className="todo-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-edit"
                title="Edit todo"
              >
                <PencilSquareIcon style={{ width: 20, height: 20 }} />
              </button>
              <button
                onClick={() => onDelete(todo.id!)}
                className="btn btn-delete"
                title="Delete todo"
              >
                <TrashIcon style={{ width: 20, height: 20 }} />
              </button>
            </div>
          </div>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <div className="todo-meta">
            {todo.createdAt && (
              <span className="todo-date">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem; 