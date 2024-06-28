import React from 'react';
import axios from 'axios';
import { Modal, Form, Input, DatePicker, Button, message } from 'antd';

const CreateTodo = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const { taskName, date } = values;

      const response = await axios.post('http://139.59.47.49:4004/api/task', {
        task_name: taskName,
        date: date.format('YYYY-MM-DD'),
      });

      form.resetFields();
      onCreate(response.data);
      message.success('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      message.error('Failed to create task');
    }
  };


  return (
    <Modal
      visible={visible}
      title="Add New Task"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleCreate}
    >
      <Form form={form} layout="vertical" name="createTodoForm">
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

export default CreateTodo;
