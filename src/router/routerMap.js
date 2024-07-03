import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../pages/login/login'

export const routerMap = [
    {
        path: '/',
        element: <Navigate to="/home" />,
    },
    {
        path:'/home',
        element: <Home />,
    },
    {
        path:'/login',
        element: <Login />,
    }
];