import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Main from './pages/Main';
import Login from './pages/Login';
import Gerenciar from './pages/Gerenciar';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="gerenciar" element={<Gerenciar/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;