"use client";

import { useState } from "react";

interface TodoItem {
  value: string;
  isDone: boolean;
}

function Todo() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState<TodoItem[]>([]);

  const handleAddTodo = () => {
    if (value === "") {
      return;
    }
    setTodo([
      ...todo,
      {
        value: value,
        isDone: false,
      },
    ]);
    setValue("");
  };

  const handleDoneTodo = (idx: number) => {
    setTodo((prevTodo) =>
      prevTodo.map((todo: TodoItem, index: number) =>
        idx === index ? { ...todo, isDone: true } : todo
      )
    );
  };

  const handleRemoveTodo = (idx: number) => {
    setTodo((prevTodo) =>
      prevTodo.filter((todo: TodoItem, index: number) => index !== idx)
    );
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="add To do"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <button onClick={handleAddTodo}>추가</button>
      <ul>
        {todo.map((todo: TodoItem, idx: number) => (
          <li key={idx} data-testid="todo-item">
            {todo.value}
            {todo.isDone ? <p data-testid="todo-success">완료</p> : null}
            <button
              data-testid="todo-submit"
              onClick={() => handleDoneTodo(idx)}
            >
              완료
            </button>
            <button
              data-testid="todo-delete"
              onClick={() => handleRemoveTodo(idx)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Todo;
