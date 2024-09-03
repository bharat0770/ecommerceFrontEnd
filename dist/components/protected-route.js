import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
const protectedRoute = ({ isAuthenticated, children, isAdmin, adminRoute, redirect = "/" }) => {
    if (!isAuthenticated)
        return _jsx(Navigate, { to: redirect });
    return children ? children : _jsx(Outlet, {});
};
export default protectedRoute;
