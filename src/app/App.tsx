import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainRoute from './components/Routes/MainRoute';
import Map from './components/Routes/Map';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainRoute />}>
                    <Route path='/' element={<Map />} />
                </Route>
            </Routes>
        </Router>
    );
}
