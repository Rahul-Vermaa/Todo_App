import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, message } from 'antd';
import moment from 'moment';

const EditTodo = ({ visible, onCancel, task, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleUpdate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const updatedTask = {
        ...task,
        task_name: values.task_name,
        date: values.date.format('YYYY-MM-DD'),
      };
      await onUpdate(updatedTask);
      setLoading(false);
      message.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      setLoading(false);
      message.error('Failed to update task');
    }
  };


  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };


  return (
    <Modal
      visible={visible}
      title="Edit Task"
      okText="Update"
      cancelText="Cancel"
      confirmLoading={loading}
      onOk={handleUpdate}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" initialValues={{ task_name: task.task_name, date: moment(task.date) }}>
        <Form.Item
          name="task_name"
          label="Task Name"
          rules={[{ required: true, message: 'Please enter task name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select date' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTodo;
