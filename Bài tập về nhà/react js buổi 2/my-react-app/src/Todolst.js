import React, { useState } from 'react';
import './App.css'; 

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Học lập trình web với React', date: 'Tomorrow', completed: false, color: '#FF5733' },
    { id: 2, name: 'Gửi email nộp bài tập về nhà', date: 'Saturday', completed: false, color: '#33FF57' },
    { id: 3, name: 'Học từ vựng tiếng anh mỗi ngày', date: 'Monday', completed: false, color: '#3357FF' },
    { id: 4, name: 'Viết tiểu luận môn Triết học', date: 'Today', completed: false, color: '#FF33A1' }
  ]);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');

  // Hàm lấy màu ngẫu nhiên
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Hàm xử lý ngày tháng
  const formatDueDate = (date) => {
    const currentDate = new Date();
    const dueDate = new Date(date);
  
    // Xóa phần giờ, phút, giây để chỉ so sánh ngày
    currentDate.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
  
    // Tính số ngày khác biệt giữa dueDate và currentDate
    const diffTime = dueDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    // Xác định ngày Thứ Hai đầu tuần và Chủ Nhật cuối tuần
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    const daysToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); 
    startOfWeek.setDate(currentDate.getDate() - daysToMonday);
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); 
  
    // Kiểm tra xem dueDate có nằm trong tuần hiện tại không
    if (dueDate >= startOfWeek && dueDate <= endOfWeek) {
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Tomorrow';
      return dueDate.toLocaleDateString('en-US', { weekday: 'long' }); 
    }
  
    // Nếu ngoài tuần hiện tại, hiển thị dd/mm/yyyy
    return dueDate.toLocaleDateString('en-GB'); 
  };
  
  // function xóa task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };
  
  // Thêm mới task
  const addTask = () => {
    if (newTask && newDate) {
      const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
      const newTaskObj = { 
        id: newId, 
        name: newTask, 
        date: formatDueDate(newDate), 
        completed: false, 
        color: getRandomColor() 
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setNewDate('');
    }
  };

  // Toggle trạng thái task
  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>My work 🎯</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <button 
              className="toggle-btn" 
              style={{ backgroundColor: task.color }}
              onClick={() => toggleCompletion(task.id)}
            ></button>
            <span>{task.name} - {task.date}</span>
            <button 
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              >Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <input 
          type="text" 
          placeholder="Add new task..." 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <input 
          type="date" 
          value={newDate} 
          onChange={(e) => setNewDate(e.target.value)} 
        />
        <button className="add-task" onClick={addTask}>Add task</button>
      </div>
    </div>
  );
};

export default TodoList;
