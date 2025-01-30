import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie'

const Adminorder = () => {
    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();

    const loaderWaiting = useRef();
    const loaderLoading = useRef();


    // useState for setting order Data 
    const [orderData, setOrderData] = useState([]);
    // getting productorder
    const getProductOrders = async () => {
        try {
            loaderLoading.current.style.display = "block";
            const re = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php?vtype=admin&storeid=${cookie2.adminCookie2}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const dt = await re.json();
            loaderLoading.current.style.display = "none";
            setOrderData(dt);
        }
        catch (error) {
            alert(error)
        }
    }


    // view order function 
    const viewOrder = (id) => {
        alert("no coding yet");
        // createcookie2('orderid', id);
        // window.location.href = "/admin/orderview";
    }
    const editOrder = (id) => {
        alert("no coding yet");
        // createcookie2('orderid', id);
        // window.location.href = "/admin/orderview";
    }

    useEffect(() => {
        getProductOrders();
    }, []);
    return (
        <>

            {cookie.adminCookie != null ? <SideBar /> : <SideBarEmp />}

            <div className="new-employee-main">
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
                                            <th>Action</th>
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
                                                        <td style={{ wordBreak:"break-word", whiteSpace:"wrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.address}</td>
                                                        <td>{x.paymentmode}</td>
                                                        <td>{x.paymentstatus}</td>
                                                        <td>{x.orderstatus}</td>
                                                        <td>
                                                            <span className={`status ${x.status.toLowerCase()}`}>{x.status}</span>
                                                        </td>
                                                        <td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <button onClick={viewOrder} className="btn btn-primary btn-sm">View</button> &nbsp;&nbsp;
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
                                    <h1>No Orders for this store</h1>
                                </div>
                            )
                    }
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

export default Adminorder