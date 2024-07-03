import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Space, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import EditTodo from './EditTodo'; 

const TodoItem = ({ task, onDelete, onEdit, page }) => {
  const [deleted, setDeleted] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(task); 

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

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

  const handleEdit = () => {
    setEditVisible(true);
  };

  
  const handleUpdate = async (updatedTask) => {
    try {
      await axios.put(`http://139.59.47.49:4004/api/task/`, updatedTask);
      setEditVisible(false);
      onEdit(updatedTask); 
      setCurrentTask(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  const handleStatusChange = async (newStatus) => {
    try {
      await axios.post('http://139.59.47.49:4004/api/task/status', {
        id: task.id,
        status: newStatus,
      });
      message.success('Status updated successfully');
      const updatedTask = { ...currentTask, status: newStatus };
      onEdit(updatedTask); 
      setCurrentTask(updatedTask);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{currentTask.task_name}</h5>
        <p className="card-text">Date: {currentTask.date}</p>
        <Space>
          {page !== 'deleted' && page !== 'complete' && (
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </Button>
          )}
          <Popconfirm
            title={page === 'complete' ? "Are you sure to permanently delete this task?" : "Are you sure to mark this task as deleted?"}
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          {page !== 'complete' && (
            <Button type="default" icon={<CheckOutlined />} onClick={() => handleStatusChange(2)}>
              Done
            </Button>
          )}
        </Space>
      </div>
      <EditTodo
        visible={editVisible}
        onCancel={() => setEditVisible(false)}
        task={currentTask}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default TodoItem;
