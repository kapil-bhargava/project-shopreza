import React, { useEffect, useRef, useState } from 'react';
import "./admin.css";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const SideBar = () => {
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [stores, setStores] = useState([]);
    const [activeStore, setActiveStore] = useState();
    const [storeId, setStoreId] = useState();
    const jump = useNavigate();
    const sidebar = useRef();
    const sidebarBg = useRef();
    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();

    // logout admin 
    const logoutAdmin = () => {
        if (window.confirm("Sure want to logout ?")) {
            removecookie('adminCookie');
            jump("/adminlogin")
        }
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
        const selectedStore = data.find((store) => store.storeid == cookie2.adminCookie2);
        if (selectedStore) {
            setActiveStore(selectedStore.storename);
            setActiveStoreId(selectedStore.storeid);
            // console.log(activeStore)
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
        setStoreId(storeId);
        createcookie2('adminCookie2', storeId);
        getStores()
        window.location.reload();
        // setActiveStore(storeId);
        window.location.reload();
        // console.log(storeId);
    }




    useEffect(() => {
        getStores();
        // alert(activeStore)
        // console.log(stores);
    }, [])


    return (
        <>

            {/* Sidebar of Admin  */}
            <button className="menu-toggle" onClick={openSidebar}><i className="fas fa-bars"></i></button>
            <div className="sidebardb" ref={sidebar}>
                <div className="form-group">
                    <h5>{cookie2.adminCookie2}{activeStore}</h5>
                    <label>Store</label>
                    <select value={activeStoreId} onChange={(e) => { changeStore(e.target.value) }}>
                        {/* <option>Select Store</option> */}
                        {stores.map((store, index) => {
                            return (
                                <option key={index} value={store.storeid}>{store.storename}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="logo">{cookie.adminCookie} Dashboard </div>
                <nav>
                    <div className="nav-item"><Link className="linkdb" to="/dashboard"><i className="fas fa-home"></i>Dashboard</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/customers"><i className="fas fa-users"></i>Customers</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/employee"><i className="fas fa-handshake"></i>Employees</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/stores"><i className="fas fa-store"></i>Stores</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/category"><i className="fa-solid fa-tags"></i>Category</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/subcategory"><i className="fa-solid fa-th-large"></i>Subcategory</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/product" ><i className="fas fa-box"></i>Products</Link></div>
                    <div className="nav-item"><Link className="linkdb" to="/adminorders"  ><i className="fas fa-shopping-cart"></i>Orders</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-chart-bar"></i>Analytics</Link></div>
                    <div className="nav-item"><Link className="linkdb" ><i className="fas fa-cog"></i>Settings</Link></div>
                    <div onClick={logoutAdmin} className="nav-item"><Link className="linkdb" ><i className="fas fa-sign-out-alt"></i>Logout</Link></div>
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

        </>
    )
}

// Sidebar for Employee 
const SideBarEmp = () => {
    const [cookie, createcookie, removecookie] = useCookies()
    const sidebar = useRef();
    const sidebarBg = useRef();
    const jump = useNavigate()

    // logout employee 
    const logoutEmployee = () => {
        removecookie('empCookie');
        jump("/emplogin")
        // window.location.href = '/';

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

                <div className="logo">Distributor Dashboard</div>
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

            <div ref={sidebarBg} onClick={closeSidebar} className="sidebar-bg"></div>
            {/* </div> */}




        </>
    )
}

export default SideBar
export { SideBarEmp }
