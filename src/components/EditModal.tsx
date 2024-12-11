import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types/theme';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  initialText: string;
  theme: Theme;
}

export function EditModal({ isOpen, onClose, onSave, initialText }: EditModalProps) {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSave(text.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold theme-transition"
            style={{ color: 'var(--color-text)' }}>
            Edit Todo
          </h2>
          <button
            onClick={onClose}
            className="transition-colors theme-transition"
            style={{ color: 'var(--color-secondary)' }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border mb-4
              focus:outline-none focus:ring-2 theme-transition"
            style={{
              borderColor: 'var(--color-secondary)',
              '--tw-ring-color': 'var(--color-primary)'
            } as React.CSSProperties}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 transition-colors theme-transition"
              style={{ color: 'var(--color-secondary)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-offset-2 theme-transition"
              style={{
                backgroundColor: 'var(--color-primary)',
                '--tw-ring-color': 'var(--color-primary)'
              } as React.CSSProperties}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}