import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Check, Pencil, Plus, Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  memo?: string;
}

const TodoDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [memo, setMemo] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const tenantId = 'ke2'; 

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const response = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch todo');
          }
          const data = await response.json();
          setTodo(data);
          setIsActive(data.completed);
          setMemo(data.memo || '');
        } catch (err) {
          setError('Error fetching todo. Please try again.');
          console.error('Error:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTodo();
  }, [id]);

  const handleToggleComplete = async () => {
    if (!todo) return;
    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      setTodo({ ...todo, completed: !todo.completed });
      setIsActive(!todo.completed);
    } catch (err) {
      setError('Error updating todo. Please try again.');
      console.error('Error:', err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      router.push('/');
    } catch (err) {
      setError('Error deleting todo. Please try again.');
      console.error('Error:', err);
    }
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!todo) return;
    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todo, memo: memo }),
      });

      if (!response.ok) {
        throw new Error('Failed to update memo');
      }

      setTodo({ ...todo, memo: memo });
      setIsEditing(false);
    } catch (err) {
      setError('Error updating memo. Please try again.');
      console.error('Error:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="bg-white p-6 max-w-md mx-auto rounded-xl shadow-md">
      <div className="mb-4">
        <button
          onClick={handleToggleComplete}
          className={`w-full py-3 px-4 rounded-full flex items-center justify-center ${
            isActive ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Check className={`mr-2 ${isActive ? 'visible' : 'invisible'}`} size={20} />
          {todo.text}
        </button>
      </div>
      
      <div className={`border rounded-lg p-4 ${isActive ? 'border-purple-200' : 'border-gray-200'}`}>
        <h2 className="text-lg font-bold mb-2">메모</h2>
        <div className="relative">
          {isActive ? (
            isEditing ? (
              <textarea
                className="w-full h-32 p-2 text-sm bg-purple-50 rounded"
                value={memo}
                onChange={handleMemoChange}
                placeholder="메모를 입력하세요..."
              />
            ) : (
              <div className="w-full h-32 p-2 text-sm bg-purple-50 rounded overflow-auto">
                {memo || "메모가 없습니다."}
              </div>
            )
          ) : (
            <div className="w-full h-32 bg-gray-50 rounded flex items-center justify-center text-gray-400">
              <img src="../src/assets/images/noPic.png" alt="비활성화 상태" className="w-16 h-16" />
              <Plus size={24} />
            </div>
          )}
          {isActive && !isEditing && (
            <button
              onClick={handleEditClick}
              className="absolute bottom-2 right-2 text-purple-600 hover:text-purple-800"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between space-x-2">
        <button 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          onClick={handleDelete}
        >
          <Trash2 size={20} />
        </button>
        {isEditing && (
          <button 
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
            onClick={handleSaveClick}
          >
            저장하기
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoDetail;