import { useMetaMask } from 'metamask-react';
import React, { Children } from 'react';
import { Route, Navigate } from 'react-router-dom';

const RouteGuard = ({ children }) => {
    const { status } = useMetaMask();

    // TODO: still buggy, get metamask connection status
    function checkMetamask() {
        // if (status === "notConnected" || status === "unavailable") {
        //     localStorage.removeItem("token");
        // }
    }

    function hasJWT() {
        checkMetamask();
        return localStorage.getItem("token") ? true : false;
    }

    if (!hasJWT()) {
        return <Navigate to="/login" replace />
    }

    return children;
};

export default RouteGuard;