import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Complete from './Components/Complete';
import Deleted from './Components/Deleted';
import Sidebar from './Components/Sidebar';

function App() {
    return (
        
        <Router>
            <div>
            <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/completed" element={<Complete />} />
                    <Route path="/deleted" element={<Deleted />} />
                </Routes>
            </div>
        </Router>
        
    );
}

export default App;
