import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataProvider';

const AllTasks = () => {
  const { getData, data } = useContext(DataContext);

  useEffect(() => {
    getData(); 
  }, [getData]);

  return (
    <div>
      <h2>All Tasks</h2>
      <ul>
        {data.rows.map(task => (
          <li key={task.id}>
            <strong>{task.task_name}</strong>
            <p>Date: {task.date}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
