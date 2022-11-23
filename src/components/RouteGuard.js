import React, { Children } from 'react';
import { Route, Navigate } from 'react-router-dom';

const RouteGuard = ({ children }) => {

    function hasJWT() {
        let flag = false;
        localStorage.getItem("token") ? flag = true : flag = false
        return flag
    }

    if (!hasJWT()) {
        return <Navigate to="/login" replace />
    }

    return Children;
};

export default RouteGuard;