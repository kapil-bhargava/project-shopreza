import React, { useEffect, useRef, useState } from 'react'
import Header, { Tracking } from './common/common'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Userorders = () => {
    const [cookie, createcookie, removecookie] = useCookies();

    const loaderLoading = useRef();
    const loaderWaiting = useRef();

    const jump = useNavigate();

    // useState for setting order Data 
    const [orderData, setOrderData] = useState([]);
    // getting productorder
    const getProductOrders = async () => {
        try {
            loaderLoading.current.style.display = "block";
            const re = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php?vtype=customer&mobile=${cookie.sp}&storeid=${cookie.storeid}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const dt = await re.json();
            setOrderData(dt);
            // console.log(dt);
            loaderLoading.current.style.display = "none";
        }
        catch (error) {
            console.log(error)
        }
    }

    // opening single page order view for tracking 
    const openTracking = (orderid) => {
        jump(`/trackingorder/${orderid}`)
    }


    useEffect(() => {
        getProductOrders();
    }, [])


    return (
        <>
            <Tracking />
            {/* using Header form common  */}
            <Header />
            {/* User Order page coding */}
            <div className="order-container">
                <h2>My Orders</h2>
                {
                    orderData.map((order, index) => {
                        return (
                            <div onClick={() => { openTracking(order.orderid) }} key={index} className="order">
                                <div className="details">
                                    <img src={require("./images/fruits.png")} alt="Fruits" />
                                    <div className="info">
                                        <p>
                                            Order # <strong>{order.orderid}</strong>
                                        </p>
                                        <p>Order Date : <strong>{order.orderdate}</strong> {order.ordertime}</p>

                                    </div>
                                </div>
                                {/* <span className={`status ${order.order_status.toLowerCase()}`}>{order.order_status}</span> */}
                                <span className={`status ${order.orderstatus}`}>{order.orderstatus}</span>
                            </div>
                        )
                    })
                }
                <div className="fixed-gradiet-section"></div>
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

            <div className="fixed-gradiet-section"></div>
        </>
    )
}

export default Userorders