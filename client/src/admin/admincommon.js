import React, { useRef } from 'react';
import "./admin.css";
import { Link } from 'react-router-dom';

const SideBar = () => {
    const sidebar = useRef()

    const openSidebar = () => {
        sidebar.current.classList.toggle('active');
    };
    const navItems = document.querySelectorAll('.sidebardb .linkdb');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove 'clicked' class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('clicked'));
            // Add 'clicked' class to the clicked item
            e.target.classList.add('clicked');
        });
    });

    return (
        <>
            {/* <div className="sidebar-main"> */}
                <button className="menu-toggle" onClick={openSidebar}><i className="fas fa-bars"></i></button>
                <div className="sidebardb" ref={sidebar}>
                    <div className="logo">Admin Dashboard</div>
                    <nav>
                        <div className="nav-item"><Link className="linkdb clicked" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div>
                        <div className="nav-item"><Link className="linkdb" to="/customers"><i className="fas fa-users"></i>Customers</Link></div>
                        <div className="nav-item"><Link className="linkdb" to="/employee"><i className="fas fa-users"></i>Employees</Link></div>
                        <div className="nav-item"><Link className="linkdb" to="/stores"><i className="fas fa-users"></i>Stores</Link></div>
                        <div className="nav-item"><Link className="linkdb" ><i className="fas fa-shopping-cart"></i>Orders</Link></div>
                        <div className="nav-item"><Link className="linkdb" ><i className="fas fa-box"></i>Products</Link></div>
                        <div className="nav-item"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link></div>
                        <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div>
                        <div className="nav-item"><Link className="linkdb" ><i className="fas fa-sign-out-alt"></i>Logout</Link></div>
                    </nav>
                </div>
            {/* </div> */}

        </>
    )
}

export default SideBar
