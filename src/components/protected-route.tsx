import React, { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
interface PropsType {
    isAuthenticated: boolean;
    children?: ReactElement;
    isAdmin?: boolean;
    adminRoute?: boolean;
    redirect?: string;
}
const protectedRoute = ({ isAuthenticated, children, isAdmin, adminRoute, redirect = "/" }: PropsType) => {
    if (!isAuthenticated) return <Navigate to={redirect} />

    return children ? children : <Outlet />;
}
export default protectedRoute; 