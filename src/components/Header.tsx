import { signOut } from "firebase/auth";
import { User } from "../types/types";
import React, { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import AdminHamburger from "./AdminHamburger";

// const user = { id: '', role: '' };

interface Proptypes {
    user: User | null,
}
const Header = ({ user }: Proptypes) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const logoutHandeler = async () => {
        try {
            await signOut(auth);
            toast.success("Signed out successfully");
            setIsOpen(false);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <nav className="Header">
                <AdminHamburger />
                <Link to="/">Home</Link>
                <Link to="/search">
                    <FaSearch />
                </Link>
                <Link to="/cart"><FaShoppingBag /></Link>
                {user?._id ? (
                    <>
                        <div className="user-dialog">
                            <button id="user-btn" onClick={() => setIsOpen((prev) => !prev)}>
                                <FaUser />
                            </button>
                            {isOpen && <div className="overlay visible" onClick={() => { setIsOpen(false) }}></div >}
                            <dialog className="login-dialog" open={isOpen}>
                                <div className="hidden-dialog-content">
                                    {user.role === "admin" && <Link to='/admin/dashboard' className="header-links">admin</Link>}
                                    <Link to='/orders' className="header-links">orders</Link>
                                    <Link to="/login" className="header-links" onClick={logoutHandeler}><FaSignOutAlt /></Link>
                                </div>
                            </dialog>
                        </div>
                    </>
                ) : <Link to="/logIn"><FaSignInAlt /></Link>
                }
            </nav>
        </>
    );
};

export default Header;
