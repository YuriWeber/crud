import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from './pages/Main';
import Login from './pages/Login';
import Manage from './pages/Manage';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="conectar" element={<Login/>}/>
                <Route path="gerenciar" element={<Manage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;