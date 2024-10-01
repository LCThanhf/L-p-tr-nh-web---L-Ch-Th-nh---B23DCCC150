import './App.css';
import React, { useState } from 'react';
import { FaCalendarAlt, FaCheck } from 'react-icons/fa';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() && dueDate.trim()) {
      setTodos([...todos, { text: inputValue, dueDate, completed: false, color: getRandomColor() }]);
      setInputValue('');
      setDueDate('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A1'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new todo"
      />
      <input
        type="date"
        value={dueDate}
        onChange={handleDateChange}
      />
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <button
              className="check-button"
              onClick={() => handleToggleComplete(index)}
              style={{ backgroundColor: todo.color }}
            >
              <FaCheck />
            </button>
            {todo.text}
            <div className="due-date">
              <FaCalendarAlt /> {todo.dueDate}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleAddTodo}>Add task</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;