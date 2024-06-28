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

  useEffect(() => {
    fetchData();
  }, []);


  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://139.59.47.49:4004/api/tasks?limit=10&start=1');
      const activeTasks = response.data.rows.filter(task => task.status !== 0 && task.status !== 2);
      setTasks(activeTasks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    setVisible(false);
    fetchData();
  };


  const handleDelete = async (taskId) => {
    try {
      await axios.post(`http://139.59.47.49:4004/api/task/status`, { id: taskId, status: 0 });
      setTasks(tasks.filter(task => task.id !== taskId)); 
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
      setTasks(tasks.filter(task => task.id !== taskId)); 
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  return (
    <div className="container mt-4" >
      <h2 className="text-center mb-4"  >Tasks</h2>
      <Space style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ left: '80px' }} type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>
          Add Task
        </Button>
      </Space>
      <Row gutter={[16, 16]}>
        {tasks.map(task => (
          <Col xs={24} sm={12} md={8} key={task.id}>
            <TodoItem
              task={task}
              onDelete={() => handleDelete(task.id)}
              onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
            />
          </Col>
        ))}
      </Row>
      <CreateTodo
        visible={visible}
        onCreate={handleCreate}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Home;
