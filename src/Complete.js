import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const Complete = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://139.59.47.49:4004/api/tasks?limit=50&start=1&status=2');
      setCompletedTasks(response.data.rows);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Completed Tasks</h2>
      {completedTasks.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Complete;
