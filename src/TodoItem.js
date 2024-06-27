import React from 'react';
import axios from 'axios';
import { Button, Space, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';



const TodoItem = ({ task, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://139.59.47.49:4004/api/task/delete/${task.id}`);
      onDelete(task.id);
      message.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      message.error('Failed to delete task');
    }
  };



  const handleClick = async (newStatus) => {
    try {
      const response = await axios.post('http://139.59.47.49:4004/api/task/status', {
        id: task.id,
        status: newStatus,
      });
      if (response.status === 200) {
        message.success('Status updated successfully');
        // Optionally, trigger a function to move this task to the Complete component
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update status');
    }
  };



  
  return (
    <div className="card mb-3" style={{ left: '90px', width:'325px' }}>
      <div className="card-body">
        <h5 className="card-title">{task.task_name}</h5>
        <p className="card-text">Date: {task.date}</p>
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={() => console.log('Edit clicked')}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          <Button type="default" icon={<CheckOutlined />} onClick={() => handleClick(1)}>
     Done
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default TodoItem;
