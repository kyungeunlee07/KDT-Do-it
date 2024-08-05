import React, { useState } from 'react';
import { PlusCircle, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'TODO' | 'DONE'>('TODO');

  const handleAddTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => 
    activeTab === 'TODO' ? !todo.completed : todo.completed
  );

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="mb-6 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력해주세요"
          className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={handleAddTodo}
          className="bg-purple-600 text-white px-4 py-3 rounded-r-lg flex items-center"
        >
          <PlusCircle size={20} className="mr-2" />
          추가하기
        </button>
      </div>

      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('TODO')}
          className={`mr-2 px-4 py-2 rounded-full ${
            activeTab === 'TODO' ? 'bg-green-300' : 'bg-gray-200'
          }`}
        >
          TO DO
        </button>
        <button
          onClick={() => setActiveTab('DONE')}
          className={`px-4 py-2 rounded-full ${
            activeTab === 'DONE' ? 'bg-green-600 text-white' : 'bg-gray-200'
          }`}
        >
          DONE
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`rounded-lg shadow-md p-4 mb-4 flex items-center ${todo.completed ? 'bg-purple-100' : 'bg-white'}`}>
            <button
              onClick={() => handleToggleTodo(todo.id)}
              className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                todo.completed ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
              }`}
            >
              {todo.completed && <Check size={14} color="white" />}
            </button>
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;