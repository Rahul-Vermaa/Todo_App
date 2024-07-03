import React from 'react';
import { Link } from 'react-router-dom'; 
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      width={150}
      className="site-layout-background"
      style={{ backgroundColor: '#001529', height: '100vh', position: 'fixed', left: 0, overflow: 'auto' }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ backgroundColor: '#001529', color: '#fff', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<HomeOutlined style={{ color: '#fff' }} />}>
          <Link to="/" style={{ color: '#fff' }}>Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CheckCircleOutlined style={{ color: '#fff' }} />}>
          <Link to="/completed" style={{ color: '#fff' }}>Completed</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<DeleteOutlined style={{ color: '#fff' }} />}>
          <Link to="/deleted" style={{ color: '#fff' }}>Deleted</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
