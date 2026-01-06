//import React from "react";
import{ Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRouter = () => {
    const { userInfo, loading } = useAuth() as any;

    if(loading) {
        return <div>Checking auth status...</div>
    }

    return userInfo ? <Outlet/> : <Navigate to="/login" replace />;
};

export default ProtectedRouter;