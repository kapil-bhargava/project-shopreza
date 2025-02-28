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
    removecookie('uname');
    removecookie('storeid');
    removecookie('utype');
    jump("/emplogin")
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

  const confirmPopup = useRef();
  const confirmPopupBg = useRef();

  const openConfirmPopup = (catid) => {
    confirmPopup.current.classList.add("active-confirmation-popup");
    confirmPopupBg.current.classList.add("active-confirmationBg");
  }
  const closeConfirmPopup = () => {
    confirmPopup.current.classList.remove("active-confirmation-popup");
    confirmPopupBg.current.classList.remove("active-confirmationBg");
  }





  const sm = useRef();

  const leftArrow = useRef();

  function toggleSubmenu(element) {
    let submenu = sm.current;
    if (submenu.style.height === "0px" || submenu.style.height === "") {
      submenu.style.height = submenu.scrollHeight + "px";
      submenu.style.border = "1px solid var(--primary-green";
      leftArrow.current.style.transform = "rotate(-90deg)"
      // submenu.classList.add("expanded");
      // alert(submenu.scrollHeight)
    } else {
      submenu.style.height = "0px";
      leftArrow.current.style.transform = "rotate(0deg)"
      submenu.style.border = "1px solid var(--primary-green";
      // submenu.classList.remove("expanded");
    }
  }



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
              <a onClick={openConfirmPopup} className="linkdb text-danger p-1 ps-2" >
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
          <div onClick={toggleSubmenu} className="nav-item"><Link className="linkdb subm">Store & Products <i ref={leftArrow} className="fa-solid fa-chevron-left"></i></Link></div>
          <div ref={sm} className=" submenu">
            <div className="sub-item"><Link className="linkdb" to="/banner"><i className="fas fa-list"></i>Banners</Link></div>
            <div className="sub-item"><Link className="linkdb" to="/bannerproducts"><i className="fas fa-list"></i>Banner Products</Link></div>
            <div className="sub-item"><Link className="linkdb" to="/stores"><i className="fas fa-store"></i>Stores</Link></div>
            <div className="sub-item"><Link className="linkdb" to="/category"><i className="fa-solid fa-tags"></i>Category</Link></div>
            <div className="sub-item"><Link className="linkdb" to="/subcategory"><i className="fa-solid fa-th-large"></i>Subcategory</Link></div>
            <div className="sub-item"><Link className="linkdb" to="/product" ><i className="fas fa-box"></i>Products</Link></div>
          </div>
          {/* <div className="nav-item"><Link className="linkdb" to="/category"><i className="fa-solid fa-tags"></i>Category</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/subcategory"><i className="fa-solid fa-th-large"></i>Subcategory</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/product" ><i className="fas fa-box"></i>Products</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/adminorders"  ><i className="fas fa-shopping-cart"></i>Orders</Link></div> */}
          <div className="nav-item"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link></div>
          <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div>
        </nav>
      </div>

      <div ref={sidebarBg} onClick={closeSidebar} className="sidebar-bg"></div>

      {/* </div> */}



      {/* Confirm Popup  */}
      <div ref={confirmPopupBg} className="confirmation-popupBg">
        <div ref={confirmPopup} className="confirmation-popup">
          <div className="cross-confirm-main-div d-flex justify-content-end">
            <div onClick={closeConfirmPopup} className="cross-confirm-popup-div">
              <i className="fas fa-times" ></i>
            </div>
          </div>
          <h6 className='text-center'>
            Are you sure want to Logout ?</h6>
          {/* <p style={{fontSize:"12px"}}>
            This action will log you out from the system.
          </p> */}
          <div className="del-btn-div d-flex justify-content-around">
            <button onClick={logout} className="btn btn-danger btn-sm">Yes, Logout</button>
            <button onClick={closeConfirmPopup} className="btn btn-light border btn-sm">Cancel</button>
          </div>
        </div>
      </div>




    </>
  )
}

export default Managersidebar