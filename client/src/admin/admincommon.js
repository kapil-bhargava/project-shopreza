import React, { useEffect, useRef, useState } from 'react';
import "./admin.css";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';



// Sidebar for Employee (Distributor) 
const SideBarEmp = () => {
    const [cookie, createcookie, removecookie] = useCookies()
    const sidebar = useRef();
    const sidebarBg = useRef();
    const jump = useNavigate()

    // logout employee 
    const logoutEmployee = () => {
        if (window.confirm("Sure want to logout ?")) {
            removecookie('empCookie');
            jump("/emplogin")
            // window.location.href = '/';

        }
    }

    const openSidebar = () => {
        sidebar.current.classList.add('activesb');
        sidebarBg.current.classList.add('activesb-bg');
    };
    const closeSidebar = () => {
        sidebar.current.classList.remove('activesb');
        sidebarBg.current.classList.remove('activesb-bg');
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

                <div className="logo">Distributor Emp Dashboard</div>
                <nav>
                    {/* <div className="nav-item"><Link className="linkdb clicked" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div> */}
                    <div className="nav-item"><Link className="linkdb" to="/customers"><i className="fas fa-users"></i>Customers</Link></div>

                    {/* <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div> */}
                    <div onClick={logoutEmployee} className="nav-item"><Link className="linkdb" ><i className="fas fa-sign-out-alt"></i>Logout</Link></div>
                </nav>
            </div>

            <div ref={sidebarBg} onClick={closeSidebar} className="sidebar-bg"></div>
            {/* </div> */}




        </>
    )
}

// Sidebar for Manager 

const SideBarManager = () => {
    const [cookie, createcookie, removecookie] = useCookies()
    const sidebar = useRef();
    const sidebarBg = useRef();
    const jump = useNavigate()

    // logout employee 
    const logoutEmployee = () => {
        if (window.confirm("Sure want to logout ?")) {
            removecookie('managerCookie');
            jump("/managerlogin")
            // window.location.href = '/';

        }
    }

    const openSidebar = () => {
        sidebar.current.classList.add('activesb');
        sidebarBg.current.classList.add('activesb-bg');
    };
    const closeSidebar = () => {
        sidebar.current.classList.remove('activesb');
        sidebarBg.current.classList.remove('activesb-bg');
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

                <div className="logo">Manager Dashboard</div>
                <nav>
                    {/* <div className="nav-item"><Link className="linkdb clicked" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div> */}
                    <div className="nav-item"><Link className="linkdb" to="/customers"><i className="fas fa-users"></i>Customers</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/employee"><i className="fas fa-handshake"></i>Employees</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/stores"><i className="fas fa-store"></i>Stores</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/category"><i className="fa-solid fa-tags"></i>Category</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/subcategory"><i className="fa-solid fa-th-large"></i>Subcategory</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/product" ><i className="fas fa-box"></i>Products</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/adminorders"  ><i className="fas fa-shopping-cart"></i>Orders</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div>
                    <div onClick={logoutEmployee} className="nav-item"><Link className="linkdb" ><i className="fas fa-sign-out-alt"></i>Logout</Link></div>
                </nav>
            </div>

            <div ref={sidebarBg} onClick={closeSidebar} className="sidebar-bg"></div>
            {/* </div> */}




        </>
    )
}

// Sidebar for Delivery Boy 
const SideBarDeliveryboy = () => {
    const [cookie, createcookie, removecookie] = useCookies()
    const sidebar = useRef();
    const sidebarBg = useRef();
    const jump = useNavigate()

    // logout employee 
    const logoutEmployee = () => {
        if (window.confirm("Sure want to logout ?")) {
            removecookie('deliveryboyCookie');
            jump("/deliveryboylogin")
            // window.location.href = '/';

        }
    }

    const openSidebar = () => {
        sidebar.current.classList.add('activesb');
        sidebarBg.current.classList.add('activesb-bg');
    };
    const closeSidebar = () => {
        sidebar.current.classList.remove('activesb');
        sidebarBg.current.classList.remove('activesb-bg');
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

                <div className="logo">Delivery Boy Dashboard</div>
                <nav>
                    {/* <div className="nav-item"><Link className="linkdb clicked" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div> */}
                    <div className="nav-item"><Link className="linkdb" to="/customers"><i className="fas fa-users"></i>Customers</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/employee"><i className="fas fa-handshake"></i>Employees</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/stores"><i className="fas fa-store"></i>Stores</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/category"><i className="fa-solid fa-tags"></i>Category</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/subcategory"><i className="fa-solid fa-th-large"></i>Subcategory</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/product" ><i className="fas fa-box"></i>Products</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/adminorders"  ><i className="fas fa-shopping-cart"></i>Orders</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div>
                    <div onClick={logoutEmployee} className="nav-item"><Link className="linkdb" ><i className="fas fa-sign-out-alt"></i>Logout</Link></div>
                </nav>
            </div>

            <div ref={sidebarBg} onClick={closeSidebar} className="sidebar-bg"></div>
            {/* </div> */}




        </>
    )
}


// ConfirmPopup.js
const ConfirmPopup = ({ resp, showRes }) => { 
    const [response, setResponse] = useState("");
    const res = useRef();

    useEffect(() => {
        if (resp) {
            showRes(); // Call showRes when the response is passed
        }
    }, [resp, showRes]);

    return (
        <div ref={res} className="response-popup">
            <p>{resp}</p>
        </div>
    );  
}


export { SideBarEmp, SideBarManager, SideBarDeliveryboy, ConfirmPopup }
