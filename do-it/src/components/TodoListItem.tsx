import React, { useState } from 'react';
import Button from '../components/common/button';
import { Todo } from '../types/common';

interface TodoListItemProps {
todo: Todo;
onToggle: (id: number) => void;
onDelete: (id: number) => void;
onEdit: (id: number, newText: string) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
const [isEditing, setIsEditing] = useState(false);
const [newText, setNewText] = useState(todo.text);

const handleEdit = () => {
    setIsEditing(true);
};

const handleSave = () => {
    onEdit(todo.id, newText);
    setIsEditing(false);
};

return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
    {isEditing ? (
        <input
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        />
    ) : (
        <span>{todo.text}</span>
    )}
    <Button text={todo.completed ? '복구' : '완료'} onClick={() => onToggle(todo.id)} />
    <Button text="삭제" onClick={() => onDelete(todo.id)} />
    {isEditing ? (
        <Button text="저장" onClick={handleSave} />
    ) : (
        <Button text="수정" onClick={handleEdit} />
    )}
    </li>
);
};

export default TodoListItem;