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
