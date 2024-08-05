import React, { useState } from 'react';
import { Check, Pencil, Plus } from 'lucide-react';

interface DetailPageProps {
  todo: string;
}

const TodoDetail: React.FC<DetailPageProps> = ({ todo }) => {
  const [isActive, setIsActive] = useState(false);
  const [memo, setMemo] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setIsEditing(true);
    }
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 max-w-md mx-auto rounded-xl shadow-md">
      <div className="mb-4">
        <button
          onClick={toggleActive}
          className={`w-full py-3 px-4 rounded-full flex items-center justify-center ${
            isActive ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Check className={`mr-2 ${isActive ? 'visible' : 'invisible'}`} size={20} />
          {todo}
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
      
      <div className="mt-4 flex justify-end space-x-2">
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