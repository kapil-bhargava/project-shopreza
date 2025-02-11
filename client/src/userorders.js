import React, { useEffect, useState } from 'react'
import Header from './common/common'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Userorders = () => {
    const [cookie, createcookie, removecookie] = useCookies();

    const jump = useNavigate();

    // useState for setting order Data 
    const [orderData, setOrderData] = useState([]);
    // getting productorder
    const getProductOrders = async () => {
        try {
            const re = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php?vtype=customer&mobile=${cookie.sp}&storeid=${cookie.storeid}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const dt = await re.json();
            setOrderData(dt);
            // console.log(dt);
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
            {/* using Header form common  */}
            <Header />
            {/* User Order page coding */}
            <div className="order-container">
                <h2>My Orders</h2>
                {
                    orderData.map((order, index) => {
                        return (
                            <div onClick={()=>{openTracking(order.orderid)}} key={index} className="order">
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

                {/* <div className="order">
                    <div className="details">
                        <img src={require("./images/snacks.png")} alt="Smart Watch" />
                        <div className="info">
                            <p><strong>Order #12345</strong></p>
                            <p>Product: Wireless Earbuds</p>
                            <p>Price: ₹1,999</p>
                        </div>
                    </div>
                    <span className="status processing">Processing</span>
                </div>

                <div className="order">
                    <div className="details">
                        <img src={require("./images/fruits.png")} alt="Smart Watch" />
                        <div className="info">
                            <p><strong>Order #12346</strong></p>
                            <p>Product: Smart Watch</p>
                            <p>Price: ₹3,499</p>
                        </div>
                    </div>
                    <span className="status Delivered">Delivered</span>
                </div> */}
                {/* 
                <div className="order">
                    <div className="details">
                        <img src={require("./images/snacks.png")} alt="Smart Watch" />
                        <div className="info">
                            <p><strong>Order #12347</strong></p>
                            <p>Product: Gaming Mouse</p>
                            <p>Price: ₹899</p>
                        </div>
                    </div>
                    <span className="status Delivered">Pending</span>
                </div> */}


            </div>
        </>
    )
}

export default Userorders