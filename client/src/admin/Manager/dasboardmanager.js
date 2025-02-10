import React, { useEffect, useRef, useState } from 'react';
import "../admin.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebars/Sidebar';

const ManagerDashboard = () => {
    const sidebar = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const popup = useRef();
    const popupBg = useRef();
    const orderPopup = useRef();
    const orderPopupBg = useRef();
    const [orderData, setOrderData] = useState([]);
    const [orderDetailsData, setOrderDetailsData] = useState([]);
    const [cookie, createcookie, removecookie] = useCookies();
    const [skeletonLoading, setSkeletonLoading] = useState(false);
    const jump = useNavigate();

    const [empData, setEmpData] = useState([]);

    // states for order
    const [orderId, setOrderId] = useState("");
    const [status, setstatus] = useState("");

    // =========  popup coding  ===============
    const closePopup = () => {
        popupBg.current.style.display = "none";
        popup.current.style.display = "none";
    }
    const openPopup = () => {
        popupBg.current.style.display = "block";
        popup.current.style.display = "block";
    }
    const closeorderPopup = () => {
        orderPopupBg.current.style.display = "none";
        orderPopup.current.style.display = "none";
    }
    const openorderPopup = () => {
        orderPopupBg.current.style.display = "block";
        orderPopup.current.style.display = "block";
    }





    //    getting employees 
    const getEmployees = async () => {
        var et = "etype=Delivery Agent&storeid=" + cookie.storeid;
        try {
            loaderLoading.current.style.display = "block"
            const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php?${et}&`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            // console.log(data);
            loaderLoading.current.style.display = "none"
            setEmpData(data);
        }
        catch (error) {
            console.error(error);
            loaderLoading.current.style.display = "none"
        }
    }


    const assign = (orderid, orderstatus) => {
        setOrderId(orderid);
        setstatus(orderstatus);
        getEmployees()
        openPopup();

    }
    const assignAgain = (orderid, orderstatus) => {
        setOrderId(orderid);
        setstatus(orderstatus);
        getEmployees()
        openPopup();

    }

    // NEW Orders getting 
    const getOrders = async (status) => {
        try {
            loaderWaiting.current.style.display = "block";
            const response = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php?vtype=manager&mobile=${cookie.uname}&status=${status}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                }
            });
            loaderWaiting.current.style.display = "none";
            const data = await response.json();
            console.log(data)
            setstatus(status);
            setOrderData(data);
        }
        catch (error) {
            alert(error);
        }
    }

    // setting the status of the order 
    const setAs = async (orderid, orderstatus) => {

        if (orderstatus === "Pending") {
            orderstatus = "Packed"
        }
        else if (orderstatus === "Packed") {
            orderstatus = "Assigned"
        }
        else if (orderstatus === "Assigned") {
            orderstatus = "Ontheway"
        }
        else {
            orderstatus = ""
        }
        // console.log(orderstatus)
        setOrderId(orderid);
        if (window.confirm("sure to set as " + orderstatus)) {
            try {
                loaderWaiting.current.style.display = "block";
                const response = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: orderstatus,
                        orderid: orderid,
                    })
                })
                // const data = await response.json();
                // console.log(data);
                getOrders(orderstatus);
                setstatus(orderstatus);
                loaderWaiting.current.style.display = "none";
                closePopup();
                // console.log(data);
            }
            catch (error) {
                loaderWaiting.current.style.display = "none";
                alert(error);
            }
        }
    }


    // orderdetails  
    const viewOrderdetails = async (orderid) => {
        setOrderId(orderid);
        openorderPopup();
        try {
            loaderWaiting.current.style.display = "block";
            const response = await fetch(`${process.env.REACT_APP_URL}/orderdetailsapi.php?orderid=${orderid}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                }
            });
            const data = await response.json();
            // console.log(data);
            if (data.length === 0) {
                // alert("No order found");
                setSkeletonLoading(true);
                // return;
            }
            else {
                setOrderDetailsData(data);
                setSkeletonLoading(false);
            }
            loaderWaiting.current.style.display = "none";

        }
        catch (error) {
            loaderWaiting.current.style.display = "none";
            alert(error);
        }
    }

    // edit order functionality
    const editOrder = () => {

    }

    // setasAssigned funcionality 
    const setAsAssigned = async (empid) => {
        console.log("Order ID" + orderId);
        console.log("Emp ID" + empid);
        // alert(boyid)
        // try {
        loaderWaiting.current.style.display = "block";
        const response = await fetch(`${process.env.REACT_APP_URL}/orderassign.php`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                orderid: orderId,
                boyid: empid,
            })
        })
        const data = await response.json();
        console.log(data)
        // alert(data.Response);
        loaderWaiting.current.style.display = "none";
        getOrders("Assigned");
        // }
        // catch (err) {
        //     loaderWaiting.current.style.display = "none";
        //     alert(err);
        // }
    }

    // assigning again 
    const setAsAssignedAgain = async (boyid) => {
        console.log("OI" + orderId);
        console.log("BI" + boyid);
        // alert(boyid)
        // try {
        loaderWaiting.current.style.display = "block";
        const response = await fetch(`${process.env.REACT_APP_URL}/orderassign.php`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                orderid: orderId,
                boyid: boyid,
            })
        })
        const data = await response.json();
        console.log(data)
        // alert(data.Response);
        loaderWaiting.current.style.display = "none";
        getOrders("Assigned");
        // }
        // catch (err) {
        //     loaderWaiting.current.style.display = "none";
        //     alert(err);
        // }
    }

    useEffect(() => {
        if (cookie.uname == null && cookie.utype !== "manager") {
            jump('/emplogin');
        }
        else {
            getOrders("Pending");
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
                    <div className='order-active-status'>

                        <button
                            onClick={() => getOrders("Pending")}
                            className={`btn ${status === "Pending" ? "no-border btn-primary" : ""}`}
                        >
                            New Orders
                        </button>{" "}
                        &nbsp;
                        <button
                            onClick={() => getOrders("Packed")}
                            className={`btn ${status === "Packed" ? "btn-primary" : ""}`}
                        >
                            Packed Orders
                        </button>{" "}
                        &nbsp;
                        <button
                            onClick={() => getOrders("Assigned")}
                            className={`btn ${status === "Assigned" ? "btn-primary" : ""}`}
                        >
                            Assign Orders
                        </button>{" "}
                        &nbsp;
                        <button
                            onClick={() => getOrders("Ontheway")}
                            className={`btn ${status === "Ontheway" ? "btn-primary" : ""}`}
                        >
                            On the Way
                        </button>{" "}
                        &nbsp;
                        <button
                            onClick={() => getOrders("Delivered")}
                            className={`btn ${status === "Delivered" ? "btn-primary" : ""}`}
                        >
                            Delivered
                        </button>{" "}
                        &nbsp;
                    </div>
                    <div className="table-responsive">
                        {
                            orderData.length > 0 ?

                                (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>S. No.</th>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th style={{ width: "120px" }}>Order Date</th>
                                                <th>Address</th>
                                                <th>Payment Mode</th>
                                                <th>Payment status</th>
                                                <th>Order status</th>
                                                {
                                                    status === "Assigned" ? (
                                                        <>
                                                            <th>Assigned to</th>
                                                            {/* <th>Boy Contact</th> */}
                                                            {/* <th>Action</th> */}
                                                        </>
                                                    )
                                                        :
                                                        null
                                                }
                                                <th>status</th>
                                                <th>#</th>
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
                                                            {
                                                                status === "Assigned" ?
                                                                    <td>{x.DelBoy} <i onClick={() => { assignAgain(x.orderid, x.orderstatus) }} className="fa fa-pencil"></i></td>
                                                                    :
                                                                    null
                                                            }
                                                            <td>
                                                                <span className={`status ${x.status.toLowerCase()}`}>{x.status}</span>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => { viewOrderdetails(x.orderid) }} className="btn btn-primary btn-sm">
                                                                    <i className="fa fa-eye"></i>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button onClick={editOrder} className="btn btn-success btn-sm">
                                                                    <i className="fa fa-pencil"></i>
                                                                </button>
                                                            </td>
                                                            <td>

                                                                {/* ternary method  */}
                                                                <button
                                                                    onClick={() =>
                                                                        // function names 
                                                                        status === "Pending"
                                                                            ? setAs(x.orderid, x.orderstatus)
                                                                            : status === "Packed"
                                                                                ? assign(x.orderid, x.orderstatus)
                                                                                : status === "Assigned"
                                                                                    ? setAs(x.orderid, x.orderstatus)
                                                                                    : setAs(x.orderid, x.orderstatus)
                                                                    }
                                                                    // classNames 
                                                                    className={`btn btn-sm ${status === "Pending"
                                                                        ? "btn-info"
                                                                        : status === "Packed"
                                                                            ? "btn-warning"
                                                                            : status === "Assigned"
                                                                                ? "btn-info"
                                                                                : "btn-danger"
                                                                        }`}
                                                                >
                                                                    {/* button inner HTML  */}
                                                                    {status === "Pending"
                                                                        ? "Set as packed"
                                                                        : status === "Packed"
                                                                            ? "Assign"
                                                                            : status === "Assigned"
                                                                                ? "set as way"
                                                                                : ""}
                                                                </button>


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

                                        <h1>
                                            {status === ""
                                                ? "Please Select Status"
                                                : `No Data for ${status} status`}
                                        </h1>

                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>



            {/*  =========== delivery boy popup ============  */}
            <div ref={popupBg} className="c-bg"></div>
            <div ref={popup} className="add-customer-form assign-popup ">
                <div className="cross-entity">
                    <i className="fas fa-times" onClick={closePopup}></i>
                </div>
                <h2>Delivery Persons</h2>
                <div className="table-responsive table-employee">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>DOB</th>
                                <th>Adhar No.</th>
                                <th>PAN No.</th>
                                <th>Join Date</th>
                                <th>Action</th>
                                {/* <th>Referral Code</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                empData.map((employee, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {/* <td><img src={employee.photo} alt="Employee Photo" /></td> */}
                                            <td>{employee.name + "(" + employee.gender + ")"}</td>
                                            <td>{employee.address}</td>
                                            <td>{employee.mobile}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.dob}</td>
                                            <td>{employee.aadharno}</td>
                                            <td>{employee.panno}</td>
                                            <td>{employee.joindate}</td>
                                            <td>
                                                <button onClick={() => { status === "Packed" ? setAsAssigned(employee.empid) : setAsAssignedAgain(employee.boyid) }} className="btn btn-success btn-sm ">
                                                    {status === "Packed" ? "Assign" : "Assign Again"}

                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ============= order details view popup  ============= */}
            <div ref={orderPopupBg} onClick={closeorderPopup} className="c-bg"></div>
            <div ref={orderPopup} className="add-customer-form orderdetails-popup">
                <h2>Order Details</h2>
                {/* table for order details view  */}
                <div className="mt-4 table-responsive table-employee">
                    {
                        skeletonLoading ? (
                            <div className="skeleton-loader">
                                <h1>Order ID {orderId} contains NO Order Details</h1>
                            </div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>status</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>

                                    {orderDetailsData.map((x, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>< img src={x.pic} alt={x.pic} /> {x.prodcutname} ({x.unitname})</td>
                                                <td>
                                                    ₹ {x.price}
                                                </td>
                                                <td>{x.status}</td>
                                            </tr>
                                        );
                                    }
                                    )
                                    }

                                </tbody>
                            </table>)
                    }
                </div>
            </div>

            {/* ======== loader and waiter ===== */}
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