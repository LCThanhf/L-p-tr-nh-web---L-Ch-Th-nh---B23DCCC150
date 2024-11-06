import React, { useState, useEffect } from 'react';
import './App.css'; 
import axios from 'axios';
import { parse, format, addDays, nextDay, isValid } from 'date-fns';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Học lập trình web với React', date: 'Tomorrow', completed: false, color: '#FF5733' },
    { id: 2, name: 'Gửi email nộp bài tập về nhà', date: 'Saturday', completed: false, color: '#33FF57' },
    { id: 3, name: 'Học từ vựng tiếng anh mỗi ngày', date: 'Monday', completed: false, color: '#3357FF' },
    { id: 4, name: 'Viết tiểu luận môn Triết học', date: 'Today', completed: false, color: '#FF33A1' }
  ]);
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskDate, setEditTaskDate] = useState('');
  

    // Lấy danh sách to-do từ API
    useEffect(() => {
      axios.get('http://localhost:3001/api/')
        .then(response => {
          const formattedTasks = response.data.map(task => ({
            ...task,
            date: formatDueDate(task.date) // Sử dụng formatDueDate để định dạng ngày
          }));
          setTasks(formattedTasks);
        })
        .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
    }, []);
    

  // Hàm lấy màu ngẫu nhiên
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const formatDueDate = (date) => {
    const currentDate = new Date();
    const dueDate = new Date(date);
    
    // Xóa phần giờ, phút, giây để chỉ so sánh ngày
    currentDate.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    // Tính số ngày khác biệt giữa dueDate và currentDate
    const diffTime = dueDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    // Kiểm tra nếu ngày là Today, Tomorrow hoặc các ngày trong tuần hiện tại
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
  
    // Nếu không phải Today hoặc Tomorrow, kiểm tra nếu nằm trong tuần hiện tại
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = currentDate.getDay();
    const daysToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    startOfWeek.setDate(currentDate.getDate() - daysToMonday);
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  
    if (dueDate >= startOfWeek && dueDate <= endOfWeek) {
      return dueDate.toLocaleDateString('en-US', { weekday: 'long' });
    }
  
    // Nếu ngày ngoài tuần hiện tại, hiển thị dưới dạng dd/mm/yyyy
    return dueDate.toLocaleDateString('en-GB');
  };
  
  
  // function xóa task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/api/delete/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
      })
      .catch(error => console.error("Lỗi khi xóa dữ liệu:", error));
  };
  
  // Thêm mới task
  const addTask = () => {
    if (newTask && newDate) {
      const formattedDate = new Date(newDate).toISOString().split('T')[0]; // Chuyển sang 'yyyy-mm-dd'
      const newTaskObj = { 
        name: newTask, 
        date: formattedDate, 
        completed: false, 
        color: getRandomColor() 
      };
      axios.post('http://localhost:3001/api/add', newTaskObj)
      .then(response => {
      // Sử dụng formatDueDate để định dạng lại ngày trước khi thêm vào danh sách
      const displayedDate = formatDueDate(newTaskObj.date); 
      const newTaskWithFormattedDate = { 
        ...newTaskObj, 
        id: response.data.id, 
        date: displayedDate // Hiển thị ngày đã được định dạng
      };
        setTasks([...tasks, newTaskWithFormattedDate]);
        setNewTask('');
        setNewDate('');
      })
      .catch(error => console.error("Lỗi khi thêm dữ liệu:", error));
    }
  };

  // Toggle trạng thái task
  const toggleCompletion = (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
  
    if (!taskToUpdate) {
      console.error("Task not found:", id);
      return;
    }
  
    console.log("Task to update:", taskToUpdate);
  
    let originalDate = taskToUpdate.date.toLowerCase();
    let parsedDate;
  
    switch (originalDate) {
      case 'today':
        parsedDate = new Date();
        break;
      case 'tomorrow':
        parsedDate = addDays(new Date(), 1);
        break;
      case 'saturday':
        parsedDate = nextDay(new Date(), 6);
        break;
      // Add more cases as needed
      default:
        parsedDate = parse(originalDate, 'yyyy-MM-dd', new Date());
        if (!isValid(parsedDate)) {
          const dateParts = originalDate.split('/');
          if (dateParts.length === 3) {
            parsedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
          }
        }
    }
  
    if (!isValid(parsedDate)) {
      console.error("Invalid date format:", taskToUpdate.date);
      return;
    }
  
    originalDate = format(parsedDate, 'yyyy-MM-dd');
  
    const updatedTask = { 
      ...taskToUpdate, 
      completed: !taskToUpdate.completed,
      date: originalDate
    };
  
    console.log("Updated task:", updatedTask);
  
    axios.put(`http://localhost:3001/api/update/${id}`, updatedTask)
      .then(() => {
        const updatedTasks = tasks.map(task =>
          task.id === id 
            ? { ...updatedTask, date: formatDueDate(updatedTask.date) }
            : task
        );
        setTasks(updatedTasks);
      })
      .catch(error => console.error("Lỗi khi cập nhật dữ liệu:", error));
  };
  


// Edit mode toggle function
const startEditing = (task) => {
  setEditTaskId(task.id);
  setEditTaskName(task.name);
  setEditTaskDate(task.date);
};

// Cancel editing
const cancelEditing = () => {
  setEditTaskId(null);
  setEditTaskName('');
  setEditTaskDate('');
};

// Update task
const updateTask = (id) => {
  const taskToUpdate = tasks.find(task => task.id === id);
  if (!taskToUpdate) return; // Nếu không tìm thấy task, dừng lại

  const formattedDate = new Date(editTaskDate).toISOString().split('T')[0];

  // Sử dụng toàn bộ thông tin của task, bao gồm `color` và `completed`
  const updatedTask = { 
    ...taskToUpdate,
    name: editTaskName, 
    date: formattedDate 
  };

  axios.put(`http://localhost:3001/api/update/${id}`, updatedTask)
    .then(() => {
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...updatedTask, date: formatDueDate(formattedDate) } : task
      );
      setTasks(updatedTasks);
      cancelEditing();
    })
    .catch(error => console.error("Lỗi khi cập nhật dữ liệu:", error));
};














  return (
    <div className="todo-container">
      <h1>My Work🎯</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <button 
              className="toggle-btn" 
              style={{ backgroundColor: task.color }}
              onClick={() => toggleCompletion(task.id)}
            ></button>

{editTaskId === task.id ? (
              <span>
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  className="edit-input"
                />
                <input
                  type="date"
                  value={editTaskDate}
                  onChange={(e) => setEditTaskDate(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => updateTask(task.id)} className='save-btn'>Save</button>
                <button onClick={cancelEditing} className='cancel-btn'>Cancel</button>
              </span>
            ) : (











            <span>{task.name} - {task.date}</span>

            )}

            <button 
              className="edit-btn"
              onClick={() => startEditing(task)}
              ><i className="fa-solid fa-pen"></i></button>
            <button 
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              ><i className="fa-solid fa-trash"></i></button>
          </li>
        ))}
      </ul>

      <div className="add-task-container">
        <input 
          type="text" 
          placeholder="Add new task" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <input 
          type="date" 
          value={newDate} 
          onChange={(e) => setNewDate(e.target.value)} 
        />
        <button className="add-task" onClick={addTask}>+</button>
      </div>
    </div>
  );
};

export default TodoList;
