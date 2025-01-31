import React, { useEffect, useRef, useState } from 'react';
import "./admin.css";
import Customer from './customer';
import SideBar from './admincommon';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebars/Sidebar';

const ManagerDashboard = () => {
    const sidebar = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [orderData, setOrderData] = useState([]);


    const [cookie, createcookie, removecookie] = useCookies()
    const jump = useNavigate();

    // NEW Orders getting 
    const getOrders = async (status) => {
        const response = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php?vtype=manager&mobile=${cookie.managerCookie}&status=${status}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }

        });
        const data = await response.json();
        setOrderData(data);
    }

    const viewOrder = () => {

    }
    const editOrder = () => {

    }


    useEffect(() => {
        if (cookie["managerCookie"] == null) {
            jump('/managerlogin');
            // return null;    
        }

    }, [])


    return (
        <>
            <div className="sidebar-main">
                <Sidebar />
                <div className="main-content">
                    <div className="header">
                        <h1>Dashboard Overview</h1>
                    </div>
                    <div className="dashboard-cards">
                        <div className="card">
                            <h2 className='text-primary'>New Orders</h2>
                            <p>1,234</p>
                        </div>
                        <div className="card">
                            <h2>Delivered Orders</h2>
                            <p>1,234</p>
                        </div>
                        <div className="card">
                            <h2 className='text-danger'>Cancelled Orders</h2>
                            <p>1,234</p>
                        </div>
                        <div className="card">
                            <h2 className='text-danger'>Returned Orders</h2>
                            <p>1,234</p>
                        </div>

                    </div>
                    {/* <Customer /> */}
                    {/* <h2>Recent Orders</h2> */}
                    <button onClick={() => { getOrders("Pending") }} className=" h5 btn btn-primary">New Orders</button> &nbsp;
                    <button onClick={() => { getOrders("neworder") }} className=" h5 btn btn-dark">Packed Orders</button> &nbsp;
                    <button onClick={() => { getOrders("neworder") }} className=" h5 btn btn-warning">Assign Orders</button> &nbsp;
                    <button onClick={() => { getOrders("neworder") }} className=" h5 btn btn-info">Out for Delivery</button> &nbsp;
                    <button onClick={() => { getOrders("neworder") }} className=" h5 btn btn-success">Delivered</button> &nbsp;
                    <div className="table-responsive">
                        {
                            orderData.length > 0 ?

                                (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>S. No.</th>
                                                <th>Order ID</th>
                                                <th>Customer Name</th>
                                                {/* <th >Order Date</th> */}
                                                <th style={{ width: "120px" }}>Order Date</th>
                                                <th>Address</th>
                                                <th>Payment Mode</th>
                                                <th>Payment Status</th>
                                                <th>Order Status</th>
                                                <th>Status</th>
                                                <th>#</th>
                                                <th>#</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                orderData.map((x, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>#{x.orderid}</td>
                                                            <td>{x.name} ({x.gender})</td>

                                                            <td><strong> {x.orderdate}</strong> <br /> {x.ordertime}</td>
                                                            <td style={{ wordBreak: "break-word", whiteSpace: "wrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.address}</td>
                                                            <td>{x.paymentmode}</td>
                                                            <td>{x.paymentstatus}</td>
                                                            <td>{x.orderstatus}</td>
                                                            <td>
                                                                <span className={`status ${x.status.toLowerCase()}`}>{x.status}</span>
                                                            </td>
                                                            <td>
                                                                <button onClick={viewOrder} className="btn btn-primary btn-sm">View</button>
                                                            </td>
                                                            <td>
                                                                <button onClick={editOrder} className="btn btn-success btn-sm">Edit</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                )
                                : (
                                    <div className="no-data">
                                        <h1>No Data for this Status</h1>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>


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

export default ManagerDashboard