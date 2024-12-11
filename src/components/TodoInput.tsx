import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Theme } from '../types/theme';

interface TodoInputProps {
  onAdd: (text: string) => void;
  theme: Theme;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 
          focus:outline-none focus:ring-2 theme-transition"
        style={{
          '--tw-ring-color': 'var(--color-primary)',
          borderColor: 'var(--color-secondary)'
        } as React.CSSProperties}
      />
      <button
        type="submit"
        className="px-4 py-2 text-white rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-offset-2 
          flex items-center gap-2 theme-transition"
        style={{
          backgroundColor: 'var(--color-primary)',
          '--tw-ring-color': 'var(--color-primary)'
        } as React.CSSProperties}
      >
        <PlusCircle className="h-5 w-5" />
        Add
      </button>
    </form>
  );
}