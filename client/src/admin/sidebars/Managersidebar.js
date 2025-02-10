import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Managersidebar = (x) => {
  const [cookie, createcookie, removecookie] = useCookies()
  const sidebar = useRef();
  const sidebarBg = useRef();
  const jump = useNavigate()

  // logout employee 
  const logout = () => {
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
  useEffect(() => {

  }, [])

  return (
    <>
      {/* <Validate/> */}
      {/* <div className="sidebar-main"> */}
      <div className="dashboard-header">
        <h6>1</h6>
        <h6>{x.storename}</h6>

        <div className="name-div">
          <div className="btn-group">
            <i type="button" className="fa fa-user dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul className="dropdown-menu">
              <h6 className='text-primary p-1 text-center fw-bold'>{x.name}</h6>
              <Link to="/empprofile" className="linkdb text-dark p-1 ps-2" >Profile</Link>
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

        <div className="logo">{x.name} {cookie.utype} Dashboard <br />{cookie.uname}</div>

        <nav>
          {/* <div className="nav-item"><Link className="linkdb clicked" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div> */}
          <div className="nav-item"><Link className="linkdb" to="/managerdashboard"><i className="fas fa-home"></i>Dashboard</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/customers"><i className="fas fa-users"></i>Customers</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/employee"><i className="fas fa-handshake"></i>Employees</Link></div>

          {/* <div className="nav-item"><Link className="linkdb" to="/stores"><i className="fas fa-store"></i>Stores</Link></div> */}
          <div className="nav-item"><Link className="linkdb" to="/category"><i className="fa-solid fa-tags"></i>Category</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/subcategory"><i className="fa-solid fa-th-large"></i>Subcategory</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/product" ><i className="fas fa-box"></i>Products</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/adminorders"  ><i className="fas fa-shopping-cart"></i>Orders</Link></div>
          <div className="nav-item"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link></div>
          <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div>
        </nav>
      </div>

      <div ref={sidebarBg} onClick={closeSidebar} className="sidebar-bg"></div>
      {/* </div> */}




    </>
  )
}

export default Managersidebar