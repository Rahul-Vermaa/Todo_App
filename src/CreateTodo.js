import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const Complete = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://139.59.47.49:4004/api/tasks?status=1');
      if (Array.isArray(response.data)) {
        setCompletedTasks(response.data);
      } else {
        throw new Error('Data received is not an array');
      }
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
      // Handle error state or message display
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://139.59.47.49:4004/api/task/delete/${taskId}`);
      setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
      // Optionally, you can show a success message here
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error message display
    }
  };

  const handleUpdateStatus = async (taskId) => {
    try {
      // Assuming API call to get updated task details after status update
      const response = await axios.get(`http://139.59.47.49:4004/api/task/${taskId}`);
      const updatedTask = response.data;

      // Remove updated task from completedTasks and update with new data
      setCompletedTasks(prevTasks =>
        prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error('Error updating task status:', error);
      // Handle error message display
    }
  };

  return (
    <div>
      <h1>Completed Tasks</h1>
      {completedTasks.map(task => (
        <TodoItem key={task.id} task={task} onDelete={handleDelete} onUpdateStatus={handleUpdateStatus} />
      ))}
    </div>
  );
};

export default Complete;
