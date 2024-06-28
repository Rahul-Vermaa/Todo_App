import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const Deleted = () => {
  const [deletedTasks, setDeletedTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://139.59.47.49:4004/api/tasks?limit=50&start=1&status=0');
      setDeletedTasks(response.data.rows);
    } catch (error) {
      console.error('Error fetching deleted tasks:', error);
    }
  };


  
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Deleted Tasks</h2>
      {deletedTasks.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Deleted;
