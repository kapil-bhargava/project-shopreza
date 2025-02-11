import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Deliveryboysidebar = (x) => {
  const [cookie, createcookie, removecookie] = useCookies()
  const sidebar = useRef();
  const sidebarBg = useRef();
  const jump = useNavigate()

  // logout employee 
 // logout admin 
 const logout = () => {
  if (window.confirm("Sure want to logouts ?")) {
    removecookie('uname');
    removecookie('storeid');
    removecookie('utype');
    jump("/emplogin");
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
        <h6>1</h6>
        {x.storename}


        <div className="name-div">
          <div className="btn-group">
            <i type="button" className="fa fa-user dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul className="dropdown-menu">
              <h6 className='text-primary p-1 text-center fw-bold'>{cookie.uname}</h6>
              <Link className="linkdb text-dark p-1 ps-2" >Profile</Link>
              <Link className="linkdb text-dark p-1 ps-2" >Settings</Link>
              <li><hr className="dropdown-divider" /></li>
              <a onClick={logout} className="linkdb text-danger p-1 ps-2" >
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </ul>
          </div>
        </div>
      </div>
      <button className="menu-toggle" onClick={openSidebar}><i className="fas fa-bars"></i></button>
      <div className="sidebardb" ref={sidebar}>

        <div className="logo">{cookie.utype} Panel <br /> {cookie.uname}</div>
        <nav>
          {/* <div className="nav-item"><Link className="linkdb clicked" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div> */}
          {/* <div className="nav-item"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link></div> */}
          <div className="nav-item"><Link className="linkdb" to="/delboydashboard" ><i className="fas fa-cog"></i>Dashboard</Link></div>
          <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/delboyorders"><i className="fas fa-cog"></i>Orders</Link></div>
        </nav>
      </div>

      <div ref={sidebarBg} onClick={closeSidebar} className="sidebar-bg"></div>
      {/* </div> */}




    </>
  )
}

export default Deliveryboysidebar