import React, { useEffect, useRef, useState } from 'react';
import "../admin.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebars/Sidebar';

const DelBoyDashboard = () => {
    const sidebar = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const popup = useRef();
    const popupBg = useRef();
    const orderPopup = useRef();
    const orderPopupBg = useRef();
    const [orderData, setOrderData] = useState([]);
    const [otp, setOTP] = useState();
    const [orderDetailsData, setOrderDetailsData] = useState([]);
    const [cookie, createcookie, removecookie] = useCookies();
    const [skeletonLoading, setSkeletonLoading] = useState(false);
    const jump = useNavigate();

    const [empData, setEmpData] = useState([]);

    // states for order
    const [orderId, setOrderId] = useState("");
    const [status, setstatus] = useState("Ontheway");

    // =========  popup coding  ===============
    const closePopup = () => {
        popupBg.current.style.display = "none";
        popup.current.style.display = "none";
    }
    const openPopup = (orderid) => {
        setOrderId(orderid);
        setstatus("Delivered")
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



    const assignAgain = (orderid, orderstatus) => {
        setOrderId(orderid);
        setstatus(orderstatus);
        getEmployees()
        openPopup();

    }

    // NEW Orders getting 
    const getOrders = async (status) => {
        console.log(status)
        try {
            setstatus(status);
            loaderWaiting.current.style.display = "block";
            const response = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php?vtype=deliveryboy&mobile=${cookie.uname}&storeid=${cookie.storeid}&status=${status}`, {
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
    const setAs = async () => {
        // console.log(orderid);
        if (window.confirm("sure to set as Delivered ?")) {
            try {
                loaderWaiting.current.style.display = "block";
                const response = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: "Delivered",
                        orderid: orderId,
                        otp: otp
                    })
                })
                const data = await response.json();
                console.log(data);
                getOrders("Delivered");
                // setstatus(orderstatus);
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




    useEffect(() => {
        if (cookie.uname == null && cookie.utype !== "manager") {
            jump('/emplogin');
        }
        else {
            getOrders(status);
        }

    }, [status])

    return (
        <>
            <div className="sidebar-main">
                <Sidebar />
                <div className="main-content">
                    <div className="header">
                        <h1>Dashboard Overview</h1>
                    </div>
                    <div className="dashboard-cards">
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

                                                                <button onClick={status === "Ontheway" ? () => { openPopup(x.orderid) } : null} className='btn btn-primary'>{status === "Ontheway" ? "Set as Delivered" : "Delivered"}</button>

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
            </div >




            {/* ============= order details view popup  ============= */}
            < div ref={orderPopupBg} onClick={closeorderPopup} className="c-bg" ></ div>
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


            {/* OTP Form  */}
            <div ref={popupBg} className="c-bg"></div>
            <div ref={popup} className="add-customer-form">
                <div className="cross-entity">
                    <i className="fas fa-times" onClick={closePopup}></i>
                </div>
                <h2>Enter OTP</h2>
                <div className="form-group">
                    <input onChange={(e)=>{setOTP(e.target.value)}} placeholder='Enter OTP' type="number" />
                </div>

                <div className="form-group">
                    <button onClick={setAs}>Submit</button>
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

export default DelBoyDashboard