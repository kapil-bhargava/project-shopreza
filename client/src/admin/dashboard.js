import React, { useEffect, useRef } from 'react';
import "./admin.css";
import Customer from './customer';
import SideBar from './admincommon';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [cookie, createcookie, removecookie] = useCookies()
    const sidebar = useRef();
    const jump = useNavigate();

 
    useEffect(()=>{
        if(cookie["adminCookie"]==null){
            jump('/adminlogin');
            // return null;    
        }
    
    },[])
    

    const openSidebar = () => {
        sidebar.current.classList.toggle('active');
    };

    return (
        <>
            <div className="sidebar-main">
                <SideBar />
                <div className="main-content">
                    <div className="header">
                        <h1>Dashboard Overview</h1>
                    </div>
                    <div className="dashboard-cards">
                        <div className="card">
                            <h2>Total Customers</h2>
                            <p>1,234</p>
                        </div>
                        <div className="card">
                            <h2>Total Orders</h2>
                            <p>5,678</p>
                        </div>
                        <div className="card">
                            <h2>Revenue</h2>
                            <p>₹123,456</p>
                        </div>
                    </div>
                    {/* <Customer /> */}
                    <h2>Recent Orders</h2>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#12345</td>
                                    <td>John Doe</td>
                                    <td>Smartphone</td>
                                    <td>$599</td>
                                    <td>2023-05-01</td>
                                    <td><span className="status completed">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>#12346</td>
                                    <td>Jane Smith</td>
                                    <td>Laptop</td>
                                    <td>$999</td>
                                    <td>2023-05-02</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>#12347</td>
                                    <td>Bob Johnson</td>
                                    <td>Headphones</td>
                                    <td>$149</td>
                                    <td>2023-05-03</td>
                                    <td><span className="status completed">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>#12348</td>
                                    <td>Alice Brown</td>
                                    <td>Smartwatch</td>
                                    <td>$299</td>
                                    <td>2023-05-04</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>#12349</td>
                                    <td>Charlie Wilson</td>
                                    <td>Tablet</td>
                                    <td>$449</td>
                                    <td>2023-05-05</td>
                                    <td><span className="status completed">Completed</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard