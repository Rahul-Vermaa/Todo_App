import React, { useState } from 'react';
import axios from 'axios';
import { Button, Space, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';

const TodoItem = ({ task, onDelete, onStatusChange }) => {
  const [deleted, setDeleted] = useState(false);
  const [editVisible, setEditVisible] = useState(false);


  const handleDelete = async () => {
    try {
      if (onDelete) {
        await onDelete();
        message.success('Task marked as deleted successfully');
      } else {
        await axios.delete(`http://139.59.47.49:4004/api/task/delete/${task.id}`);
        message.success('Task permanently deleted successfully');
        setDeleted(true); 
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      message.error('Failed to delete task');
    }
  };


  const handleClick = async (newStatus) => {
    try {
      await onStatusChange(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update status');
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <div className="card mb-3" style={{left:'80px'}}>
      <div className="card-body">
        <h5 className="card-title">{task.task_name}</h5>
        <p className="card-text">Date: {task.date}</p>
        <Space>
          {task.status = 1 && ( 
            <Button type="primary" icon={<EditOutlined />} onClick={() => setEditVisible(true)}>
              Edit
            </Button>
          )}
          <Popconfirm
            title={onDelete ? "Are you sure to mark this task as deleted?" : "Are you sure to permanently delete this task?"}
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          <Button type="default" icon={<CheckOutlined />} onClick={() => handleClick(2)}>
            Done
          </Button>
        </Space>
      </div>
     
    </div>
  );
};

export default TodoItem;
