import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainRoute from './components/Routes/MainRoute';
import { Map } from './components/Routes/Map';
import { LoginRoute } from './components/Routes/LoginRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainRoute />}>
                    <Route path='/map' element={<Map />} />
                    <Route path='/login' element={<LoginRoute />} />
                </Route>
            </Routes>
        </Router>
    );
}
