import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminHamburger = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && (<div className='overlay visible' onClick={() => setIsOpen((prev) => !prev)}></div>)}
            <button className={`cancel-btn ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen((prev) => !prev)}>X</button>
            <div className="admin-hamburger">
                <button className="admin-hamburger-btn" onClick={() => setIsOpen((prev) => !prev)}>
                    <span></span><span></span><span></span>
                </button>
                <div className={`admin-hamburger-content ${isOpen ? 'open' : ''}`} >
                    <ul>
                        <li><Link to="admin/product/create" onClick={() => setIsOpen((prev) => !prev)}>create product</Link></li>
                        <li><Link to="admin/product/all" onClick={() => setIsOpen((prev) => !prev)}>all product</Link></li>
                        <li><Link to="admin/product/process" onClick={() => setIsOpen((prev) => !prev)}>transactions</Link></li>
                        <li><Link to="admin/dashboard" onClick={() => setIsOpen((prev) => !prev)}>Dashboard</Link></li>
                        <li><Link to="admin/dashboard/bar" onClick={() => setIsOpen((prev) => !prev)}>Bar charts</Link></li>
                        <li><Link to="admin/dashboard/pie" onClick={() => setIsOpen((prev) => !prev)}>Pie charts</Link></li>
                        <li><Link to="admin/dashboard/line" onClick={() => setIsOpen((prev) => !prev)}>Line charts</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminHamburger; 