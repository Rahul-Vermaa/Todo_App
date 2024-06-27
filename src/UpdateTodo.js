import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Input, DatePicker, message } from 'antd';
import moment from 'moment'; // Import moment for date formatting

const UpdateTodo = ({ visible, onUpdate, onCancel, task }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form fields with existing task data
  form.setFieldsValue({
    taskName: task.task_name,
    date: moment(task.date), // Use moment to format the date
  });


  
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.put(`http://139.59.47.49:4004/api/task/${task.id}`, {
        task_name: values.taskName,
        date: values.date.format('YYYY-MM-DD'),
      });
      message.success('Task updated successfully');
      onUpdate(); // Refresh the task list or update UI after edit
    } catch (error) {
      console.error('Error updating task:', error);
      message.error('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
      onCancel();
    }
  };


  return (
    <Modal
      visible={visible}
      title="Update Task"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" name="updateTodoForm" onFinish={onFinish}>
        <Form.Item
          name="taskName"
          label="Task Name"
          rules={[{ required: true, message: 'Please enter the task name' }]}
        >
          <Input placeholder="Enter task name" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTodo;
