import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { TodoInput } from './components/TodoInput';
import { EditModal } from './components/EditModal';
import { ThemeSelector } from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';
import './styles/theme.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { currentTheme, setCurrentTheme, themes } = useTheme();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setEditingTodo(todo);
    }
  };

  const saveTodoEdit = (newText: string) => {
    if (editingTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, text: newText } : todo
        )
      );
      setEditingTodo(null);
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen theme-transition" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-2xl mx-auto py-12 px-4 relative">
        <ThemeSelector
          themes={themes}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 theme-transition"
            style={{ color: 'var(--color-text)' }}>
            Todo List
          </h1>
          <p className="theme-transition" style={{ color: 'var(--color-secondary)' }}>
            Stay organized and get things done
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <TodoInput onAdd={addTodo} theme={currentTheme} />
        </div>

        <div className="space-y-4">
          {todos.length > 0 ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <span className="text-sm theme-transition" style={{ color: 'var(--color-text)' }}>
                  {completedCount} of {todos.length} tasks completed
                </span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-sm theme-transition" style={{ color: 'var(--color-text)' }}>
                    {Math.round((completedCount / todos.length) * 100)}%
                  </span>
                </div>
              </div>

              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={startEditing}
                  theme={currentTheme}
                />
              ))}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="theme-transition" style={{ color: 'var(--color-secondary)' }}>
                No todos yet. Add one to get started!
              </p>
            </div>
          )}
        </div>
      </div>

      <EditModal
        isOpen={editingTodo !== null}
        onClose={() => setEditingTodo(null)}
        onSave={saveTodoEdit}
        initialText={editingTodo?.text || ''}
        theme={currentTheme}
      />
    </div>
  );
}

export default App;