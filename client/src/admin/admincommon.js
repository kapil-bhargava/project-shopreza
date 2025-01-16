import React, { useRef } from 'react';
import "./admin.css";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const SideBar = () => {
    const jump = useNavigate();
    const sidebar = useRef();
    const [cookie, createcookie, removecookie] = useCookies();

    // logout admin 
    const logoutAdmin = () => {
        if (window.confirm("Sure want to logout ?")) {
            removecookie('adminCookie');
            jump("/adminlogin")
        }
    }

    const openSidebar = () => {
        // sidebar.current.classList.toggle('active');
        sidebar.current.style.transform = "translateX(0)"
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
                <div className="logo">{cookie.adminCookie} Dashboard</div>
                <nav>
                    <div className="nav-item"><Link className="linkdb clicked" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/customers"><i className="fas fa-users"></i>Customers</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/employee"><i class="fas fa-handshake"></i>Employees</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/stores"><i className="fas fa-store"></i>Stores</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-shopping-cart"></i>Orders</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-box"></i>Products</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div>
                    <div onClick={logoutAdmin} className="nav-item"><Link className="linkdb" ><i className="fas fa-sign-out-alt"></i>Logout</Link></div>
                </nav>
            </div>
            {/* </div> */}

        </>
    )
}

// Sidebar for Employee 
const SideBarEmp = () => {
    const [cookie, createcookie, removecookie] = useCookies()
    const sidebar = useRef();
    const jump = useNavigate()

    // logout employee 
    const logoutEmployee = () => {
        removecookie('empCookie');
        jump("/emplogin")
        // window.location.href = '/';

    }


    const openSidebar = () => {
        // sidebar.current.classList.toggle('active');
        sidebar.current.style.transform = "translateX(0)"
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
                <div className="logo">Customer Dashboard</div>
                <nav>
                    {/* <div className="nav-item"><Link className="linkdb clicked" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div> */}
                    <div className="nav-item"><Link className="linkdb" to="/customers"><i className="fas fa-users"></i>Customers</Link></div>
                    {/* <div className="nav-item"><Link className="linkdb" to="/employee"><i class="fas fa-handshake"></i>Employees</Link></div> */}
                    {/* <div className="nav-item"><Link className="linkdb" to="/stores"><i className="fas fa-store"></i>Stores</Link></div> */}
                    {/* <div className="nav-item"><Link className="linkdb" ><i className="fas fa-shopping-cart"></i>Orders</Link></div> */}
                    {/* <div className="nav-item"><Link className="linkdb" ><i className="fas fa-box"></i>Products</Link></div> */}
                    {/* <div className="nav-item"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link></div> */}
                    {/* <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div> */}
                    <div onClick={logoutEmployee} className="nav-item"><Link className="linkdb" ><i className="fas fa-sign-out-alt"></i>Logout</Link></div>
                </nav>
            </div>
            {/* </div> */}

        </>
    )
}

export default SideBar
export { SideBarEmp }
