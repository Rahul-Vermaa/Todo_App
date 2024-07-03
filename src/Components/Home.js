import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Space, Button, Row, Col } from 'antd';
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';
import { PlusOutlined } from '@ant-design/icons';
import "./App.css"

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async (page = 1) => {
    try {
      const response = await axios.get(`http://139.59.47.49:4004/api/tasks?limit=${itemsPerPage}&start=${page}&status=1`);
      setTasks(response.data.rows);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNextPage = () => {
    fetchData(currentPage + 1);
  };

  const handlePrevPage = () => {
    fetchData(currentPage - 1);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    setVisible(false);
    fetchData(currentPage);
  };


  const handleDelete = async (taskId) => {
    try {
      await axios.post(`http://139.59.47.49:4004/api/task/status`, { id: taskId, status: 0 });
      fetchData(currentPage);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.post('http://139.59.47.49:4004/api/task/status', {
        id: taskId,
        status: newStatus,
      });
      fetchData(currentPage);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  const handleTaskUpdate = (updatedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" >Tasks</h2>
      <Space style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button  type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>
          Add Task
        </Button>
      </Space>
      <Row gutter={[16, 16]}>
        {tasks
          .filter(task => task.status !== 0 && task.status !== 2)
          .map(task => (
            <Col xs={24} sm={12} md={8} key={task.id}>
              <TodoItem
                key={task.id} 
                task={task}
                onDelete={() => handleDelete(task.id)}
                onEdit={(updatedTask) => handleTaskUpdate(updatedTask)}
              />
            </Col>
          ))}
      </Row>
      <CreateTodo
        visible={visible}
        onCreate={handleCreate}
        onCancel={handleCancel}
      />
      <div className="pagination" style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={tasks.length < itemsPerPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Home;
