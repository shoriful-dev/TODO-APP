import React from 'react';
import { Check, Trash2, Square, Pencil } from 'lucide-react';
import { Theme } from '../types/theme';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  theme: Theme;
}

export function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onEdit
}: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm 
      border group hover:shadow-md transition-all theme-transition"
      style={{ borderColor: 'var(--color-secondary)' }}>
      <button
        onClick={() => onToggle(id)}
        className="transition-colors theme-transition"
        style={{ color: completed ? 'var(--color-accent)' : 'var(--color-secondary)' }}
      >
        {completed ? (
          <Check className="h-5 w-5" />
        ) : (
          <Square className="h-5 w-5" />
        )}
      </button>
      <span
        className="flex-1 theme-transition"
        style={{
          color: completed ? 'var(--color-secondary)' : 'var(--color-text)',
          textDecoration: completed ? 'line-through' : 'none'
        }}
      >
        {text}
      </span>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(id)}
          className="transition-colors theme-transition"
          style={{ color: 'var(--color-secondary)' }}
        >
          <Pencil className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}