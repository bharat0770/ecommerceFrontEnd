import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import AdminHamburger from "./AdminHamburger";
const Header = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const logoutHandeler = async () => {
        try {
            await signOut(auth);
            toast.success("Signed out successfully");
            setIsOpen(false);
        }
        catch (error) {
            console.log(error.message);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("nav", { className: "Header", children: [_jsx(AdminHamburger, {}), _jsx(Link, { to: "/", children: "Home" }), _jsx(Link, { to: "/search", children: _jsx(FaSearch, {}) }), _jsx(Link, { to: "/cart", children: _jsx(FaShoppingBag, {}) }), user?._id ? (_jsx(_Fragment, { children: _jsxs("div", { className: "user-dialog", children: [_jsx("button", { id: "user-btn", onClick: () => setIsOpen((prev) => !prev), children: _jsx(FaUser, {}) }), isOpen && _jsx("div", { className: "overlay visible", onClick: () => { setIsOpen(false); } }), _jsx("dialog", { className: "login-dialog", open: isOpen, children: _jsxs("div", { className: "hidden-dialog-content", children: [user.role === "admin" && _jsx(Link, { to: '/admin/dashboard', className: "header-links", children: "admin" }), _jsx(Link, { to: '/orders', className: "header-links", children: "orders" }), _jsx(Link, { to: "/login", className: "header-links", onClick: logoutHandeler, children: _jsx(FaSignOutAlt, {}) })] }) })] }) })) : _jsx(Link, { to: "/logIn", children: _jsx(FaSignInAlt, {}) })] }) }));
};
export default Header;
