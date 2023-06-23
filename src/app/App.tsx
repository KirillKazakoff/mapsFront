import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainRoute from './components/Routes/MainRoute';
import Map2 from './components/Routes/Map2';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainRoute />}>
                    <Route path='/' element={<Map2 />} />
                </Route>
            </Routes>
        </Router>
    );
}
