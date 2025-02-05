import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Distributorsidebar = (x) => {
    const [cookie, createcookie, removecookie] = useCookies()
    const sidebar = useRef();
    const sidebarBg = useRef();
    const jump = useNavigate()

    // logout employee 
    const logoutEmployee = () => {
        if (window.confirm("Sure want to logout ?")) {
            removecookie('uname');
            removecookie('storeid');
            removecookie('utype');
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
            <div className="dashboard-header">
                {/* <div className="loader-waiting" ref={loaderWaiting}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> */}
                {/* <div className="loader-loading" ref={loaderLoading}>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> */}

                <div className="name-div">
                    <h6>{x.name} {x.storename} Distributor {cookie.empCookie}</h6>
                </div>
            </div>
            <button className="menu-toggle" onClick={openSidebar}><i className="fas fa-bars"></i></button>
            <div className="sidebardb" ref={sidebar}>

                <div className="logo">Distributor Panel <br />{cookie.empCookie}</div>
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

export default Distributorsidebar