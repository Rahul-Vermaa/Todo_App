# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
import React, { useContext } from 'react';
import useTaskData from './useTaskData'; // Adjust the path as necessary
import FetchData from './FetchData';

const Home = () => {
  const { data, status, updateStatus } = useTaskData();
  // You can useContext to get location if needed
  // const { location } = useContext(DataContext);

  return (
    <div>
      <FetchData/>
      <h1>Tasks</h1>
      <div>
        <button onClick={() => updateStatus(1)}>All Tasks</button>
        <button onClick={() => updateStatus(2)}>Completed Tasks</button>
        <button onClick={() => updateStatus(0)}>Deleted Tasks</button>
      </div>
      <ul>
        {data.rows.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;












// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaginationComponent from './PaginationComponent';
import Add from './Add';
import Delete from './Delete';
import Edit from './Edit';

function Home() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(false);

  async function getData(pageNumber) {
    try {
      const start = (pageNumber - 1) * itemsPerPage + 1;
      const res = await axios.get(`http://139.59.47.49:4004/api/tasks?limit=${itemsPerPage}&start=${start}`);
      setData(res.data.rows);
      setTotalCount(res.data.count);
      setHasNext(res.data.count > pageNumber * itemsPerPage);
      setHasPrevious(pageNumber > 1);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData(pageNumber);
  }, [pageNumber]);

  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1);
  };

  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage);
  };

  const handleAdd = () => {
    getData(pageNumber);
  };

  const handleDelete = (deletedTaskId) => {
    setData(data.filter(item => item.id !== deletedTaskId)); // Remove deleted task from state
  };

  const handleEdit = () => {
    getData(pageNumber); 
  };

  return (
    <>
      <div className='Home-Container'>
        {data.map((item, index) => (
          <div key={index}>
            <p>Task Name: {item.task_name}</p>
            <p>Date: {item.date}</p>
            <Delete taskId={item.id} onDelete={handleDelete} />
            <Edit task={item} onEdit={handleEdit} />
            <hr />
          </div>
        ))}
      </div>
      <Add onAdd={handleAdd} />
      <div>
        {hasPrevious && (
          <button className='' onClick={handlePrevious}>&lt;</button>
        )}
        {hasNext && (
          <button onClick={handleNext}>&gt;</button>
        )}
      </div>
      <PaginationComponent
        pageCount={Math.ceil(totalCount / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Home;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Row, Col, Space, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const cardsPerPage = 8;

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Reload data when currentPage changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://139.59.47.49:4004/api/tasks?limit=${cardsPerPage}&start=${(currentPage - 1) * cardsPerPage + 1}`);
      const { rows, count } = response.data;
      const activeTasks = rows.filter(task => task.status !== 0 && task.status !== 2);
      setTasks(activeTasks);
      setTotalTasks(count); // Set total number of tasks
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tasks</h2>
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
      <Pagination
        current={currentPage}
        pageSize={cardsPerPage}
        total={totalTasks}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default Home




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Space, Button, Row, Col, Pagination } from 'antd';
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';
import { PlusOutlined } from '@ant-design/icons';
import "./App.css"

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [totalTasks, setTotalTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of tasks per page

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Reload data when currentPage changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://139.59.47.49:4004/api/tasks?limit=${pageSize}&start=${(currentPage - 1) * pageSize + 1}`);
      const activeTasks = response.data.rows.filter(task => task.status !== 0 && task.status !== 2);
  
      // Update tasks state based on whether it's the first page or subsequent pages
      if (currentPage === 1) {
        setTasks(activeTasks);
      } else {
        setTasks(prevTasks => [...prevTasks, ...activeTasks]);
      }
  
      setTotalTasks(response.data.count); // Total count of tasks from API
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    setVisible(false);
    fetchData(); // Refresh data after creating a new task
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.post(`http://139.59.47.49:4004/api/task/status`, { id: taskId, status: 0 });
      fetchData(); // Refresh data after deleting a task
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
      fetchData(); // Refresh data after updating task status
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tasks</h2>
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
      <Pagination
  style={{ marginTop: '16px', textAlign: 'center' }}
  current={currentPage}
  total={totalTasks}
  pageSize={pageSize}
  onChange={handlePageChange}
/>

      <CreateTodo
        visible={visible}
        onCreate={handleCreate}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Home;
