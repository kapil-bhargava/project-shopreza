import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Adminsidebar = () => {
  const loaderWaiting = useRef();
  const loaderLoading = useRef();
  const confirmPopup = useRef();
  const confirmPopupBg = useRef();


  const [stores, setStores] = useState([]);
  const [activeStore, setActiveStore] = useState();
  // const [storeId, setStoreId] = useState();
  const jump = useNavigate();
  const sidebar = useRef();
  const sidebarBg = useRef();
  const [cookie, createcookie, removecookie] = useCookies();

  const openConfirmPopup = (catid) => {
    confirmPopup.current.classList.add("active-confirmation-popup");
    confirmPopupBg.current.classList.add("active-confirmationBg");
  }
  const closeConfirmPopup = () => {
    confirmPopup.current.classList.remove("active-confirmation-popup");
    confirmPopupBg.current.classList.remove("active-confirmationBg");
  }


  // logout admin 
  const logoutAdmin = () => {
    removecookie('uname');
    removecookie('storeid');
    removecookie('utype');
    jump("/adminlogin");
  }

  const [activeStoreId, setActiveStoreId] = useState();
  // getting store 
  const getStores = async () => {
    loaderWaiting.current.style.display = "block"
    const re = await fetch(`${process.env.REACT_APP_URL}/storeapi.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await re.json();
    // setStoreId(cookie2.adminCookie2);
    setStores(data);
    loaderWaiting.current.style.display = "none"
    const selectedStore = data.find((store) => store.storeid == cookie.storeid);
    if (selectedStore) {
      setActiveStore(selectedStore.storename);
      setActiveStoreId(selectedStore.storeid);
    } else {
      setActiveStore(''); // Reset if no store matches the id
      // console.log("else")
    }
    // console.log(activeStore);
    // loaderWaiting.current.style.display = "none"
    // console.log(data);
  }

  const openSidebar = () => {
    sidebar.current.classList.add('activesb');
    sidebarBg.current.classList.add('activesb-bg');
  };

  const closeSidebar = () => {
    sidebar.current.classList.remove('activesb');
    sidebarBg.current.classList.remove('activesb-bg');
  };

  const navItems = document.querySelectorAll('nav .linkdb');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Remove 'clicked' class from all nav items
      navItems.forEach(navItem => navItem.classList.remove('clicked'));
      // Add 'clicked' class to the clicked item
      e.target.classList.add('clicked');
    });
  });

  // changing the store 
  const changeStore = (storeId) => {
    // setStoreId(storeId);
    createcookie('storeid', storeId);
    getStores()
    window.location.reload();

  }

  const select = useRef();
  const cross = useRef();
  const pencil = useRef();

  const showSelect = () => {
    select.current.style.display = "block";
    cross.current.style.display = "block";
    pencil.current.style.display = "none";
  }
  const hideSelect = () => {
    select.current.style.display = "none";
    cross.current.style.display = "none";
    pencil.current.style.display = "block";
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

  const togglefullScreen = ()=>{
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  useEffect(() => {

    getStores();
    // alert(activeStore)
    // console.log(stores);
  }, [])


  return (
    <>
      {/* Sidebar of Admin  */}
      <div className="dashboard-header">
        <h6>1</h6>
        <h6>{activeStore}</h6>

        <div className="name-div">
        <button onClick={togglefullScreen} className='btn btn-primary'>FullScreen</button>
          <div className="btn-group">
            <i type="button" className="fa fa-user dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul className="dropdown-menu">
              <h6 className='text-primary p-1 text-center fw-bold'>{cookie.uname}</h6>
              <Link className="linkdb text-dark p-1 ps-2" >Profile</Link>
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
        <div className="form-group">
          <strong><span style={{ fontSize: "20px" }}> {activeStore}</span></strong> <i ref={pencil} onClick={showSelect} style={{ cursor: "pointer" }} className="fa fa-pencil"></i>
          <i ref={cross} onClick={hideSelect} style={{ display: "none" }} className="fas fa-times"></i>
          <select style={{ display: "none" }} ref={select} value={activeStoreId} onChange={(e) => { changeStore(e.target.value) }}>
            {/* <option>Select Store</option> */}
            {stores.map((store, index) => {
              return (
                <option key={index} value={store.storeid}>{store.storename}</option>
              )
            })}
          </select>
        </div>
        <div className="logo">{cookie.uname} Dashboard </div>
        <nav>
          <div className="nav-item"><Link className="linkdb" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/customers"><i className="fas fa-users"></i>Customers</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/employee"><i className="fas fa-handshake"></i>Employees</Link></div>
          {/* <div className="nav-item"><Link className="linkdb" to="/stores"><i className="fas fa-store"></i>Stores</Link></div> */}
          <div onClick={toggleSubmenu} className="nav-item"><Link className="linkdb subm">Store & Products <i ref={leftArrow} className="fa-solid fa-chevron-left"></i></Link></div>
          <div ref={sm} className=" submenu">
            <div className="sub-item"><Link className="linkdb" to="/stores"><i className="fas fa-store"></i>Stores</Link></div>
            <div className="sub-item"><Link className="linkdb" to="/category"><i className="fa-solid fa-tags"></i>Category</Link></div>
            <div className="sub-item"><Link className="linkdb" to="/subcategory"><i className="fa-solid fa-th-large"></i>Subcategory</Link></div>
            <div className="sub-item"><Link className="linkdb" to="/product" ><i className="fas fa-box"></i>Products</Link></div>
          </div>
          {/* {Stores and Products menu} */}

          {/* <div className="nav-item"><Link className="linkdb" to="/category"><i className="fa-solid fa-tags"></i>Category</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/subcategory"><i className="fa-solid fa-th-large"></i>Subcategory</Link></div>
          <div className="nav-item"><Link className="linkdb" to="/product" ><i className="fas fa-box"></i>Products</Link></div> */}
          {/* <div onClick={toggleSubmenu} className="nav-item an"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link>
            <div className=" submenu">
              <Link className="dro">sub 1</Link>
              <Link className="dro">sub 2</Link>
              <Link className="dro">sub 3</Link>
            </div>
          </div> */}
          <div className="nav-item"><Link className="linkdb" to="/adminorders"  ><i className="fas fa-shopping-cart"></i>Orders</Link></div>
        </nav>
      </div>

      <div ref={sidebarBg} onClick={closeSidebar} className="sidebar-bg"></div>
      {/* </div> */}
      {/* loader  */}
      <div ref={loaderLoading} className="loading">
        <p>Loading....</p>
      </div>

      {/* wait  */}
      <div ref={loaderWaiting} className="loading">
        <p>Please wait....</p>
      </div>

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
            <button onClick={logoutAdmin} className="btn btn-danger btn-sm">Yes, Logout</button>
            <button onClick={closeConfirmPopup} className="btn btn-light border btn-sm">Cancel</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Adminsidebar