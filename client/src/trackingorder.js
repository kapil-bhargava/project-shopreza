import React, { useEffect, useRef, useState } from 'react'
import Header from './common/common'
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const TrackingOrder = () => {
    const { orderid } = useParams();
    const [cookie, createcookie, removecookie] = useCookies();

    const [otp, setOTP] = useState();
    var [status, setStatus] = useState();
    var [delBoyName, setDelBoyName] = useState();
    const [orderDate, setOrderDate] = useState();
    const [orderTime, setOrderTime] = useState();

    // refs 
    const loaderLoading = useRef();
    const loaderWaiting = useRef();

    const progressBar = useRef();

    const orderPlacedStep = useRef();
    const orderPlacedText = useRef();
    const orderPackedStep = useRef();
    const orderPackedText = useRef();
    const orderOnTheWayStep = useRef();
    const orderOnTheWayText = useRef();
    const orderAssignedStep = useRef();
    const orderAssignedText = useRef();
    const orderDeliveredStep = useRef();
    const orderDeliveredText = useRef();


    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => {
            document.querySelector(".status-tracker").classList.add("animate");
        }, 10000);
    });

    const getProductOrders = async () => {
        progressBar.current.style.height = "0%";
        try {
            loaderLoading.current.style.display = "block";
            const re = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderid: orderid
                })
            });
            const dt = await re.json();
            // console.log(dt);
            loaderLoading.current.style.display = "none";
            setOrderDate(dt[0].orderdate);
            setOrderTime(dt[0].ordertime);
            setDelBoyName(dt[0].DelBoy);
            setOTP(dt[0].OTP);
            if (dt[0].orderstatus === "Pending") {
                orderPlacedStep.current.classList.add("done");
                orderPlacedText.current.classList.add("done");
                progressBar.current.style.height = "15%";
                setStatus(dt[0].orderstatus);
            }
            else if (dt[0].orderstatus === "Packed") {
                orderPackedStep.current.classList.add("done");
                orderPackedText.current.classList.add("done");
                orderPlacedStep.current.classList.add("done");
                orderPlacedText.current.classList.add("done");
                progressBar.current.style.height = "36%";
                setStatus(dt[0].orderstatus);
            }
            else if (dt[0].orderstatus === "Assigned") {
                orderAssignedStep.current.classList.add("done");
                orderAssignedText.current.classList.add("done");
                orderPackedStep.current.classList.add("done");
                orderPackedText.current.classList.add("done");
                orderPlacedStep.current.classList.add("done");
                orderPlacedText.current.classList.add("done");
                progressBar.current.style.height = "60%";

                setStatus(dt[0].orderstatus);
            }
            else if (dt[0].orderstatus === "Ontheway") {
                orderOnTheWayStep.current.classList.add("done");
                orderOnTheWayText.current.classList.add("done");
                orderAssignedStep.current.classList.add("done");
                orderAssignedText.current.classList.add("done");
                orderPackedStep.current.classList.add("done");
                orderPackedText.current.classList.add("done");
                orderPlacedStep.current.classList.add("done");
                orderPlacedText.current.classList.add("done");
                progressBar.current.style.height = "85%";
                setStatus(dt[0].orderstatus);
            }
            else if (dt[0].orderstatus === "Delivered") {
                orderDeliveredStep.current.classList.add("done");
                orderDeliveredText.current.classList.add("done");
                orderOnTheWayStep.current.classList.add("done");
                orderOnTheWayText.current.classList.add("done");
                orderAssignedStep.current.classList.add("done");
                orderAssignedText.current.classList.add("done");
                orderPackedStep.current.classList.add("done");
                orderPackedText.current.classList.add("done");
                orderPlacedStep.current.classList.add("done");
                orderPlacedText.current.classList.add("done");
                progressBar.current.style.height = "100%";
                setStatus(dt[0].orderstatus);

            }
        }
        catch (error) {
            alert(error)
        }
    }


    // const isFirstRender = useRef(true);

    useEffect(() => {
        // if (isFirstRender.current) {
        //     isFirstRender.current = false;
        //     return; // Skip the first duplicate execution
        // }
        getProductOrders();
    }, []);

    return (
        <>
            {/* <Header /> */}

            <Header />

            {/* ===== User Order Single (Tracking) ======= */}

            <div className="tracking-container">
                <h2> Order Tracking</h2>

                <div className="order-info">
                    <img src={require("./images/fruits.png")} alt="Fruits" />
                    <div className="details">
                        <p><strong>Order #12345</strong></p>
                        <p>Product: Wireless Earbuds</p>
                        <p>Price: ₹1,999</p>
                    </div>
                </div>

                <div className="status-tracker">
                    <div className="progress-bar">
                        <div ref={progressBar} className="progress-bar-fills">
                            {
                                status != "Delivered" ? (
                                    <div className="point-container">
                                        <div className="point"></div>
                                        <div className="pulse"></div>
                                        <div className="pulse"></div>
                                        <div className="pulse"></div>
                                    </div>
                                )
                                    : null

                            }

                        </div>

                    </div>

                    <div ref={orderPlacedStep} className="step">
                        <div className="circle">✔</div>
                        <div ref={orderPlacedText} className="step-text">Order Placed

                            {["Pending", "Packed", "Assigned", "Ontheway", "Delivered"].includes(status) ? (
                                <span className="status-details-div">
                                    <p>order placed on <strong>{orderDate} <br />{orderTime}</strong></p>
                                </span>
                            ) : null}
                        </div>
                    </div>
                    <div ref={orderPackedStep} className="step">
                        <div className="circle">✔</div>
                        <div ref={orderPackedText} className="step-text">Order Packed
                            {["Packed", "Assigned", "Ontheway", "Delivered"].includes(status) ? (
                                <span className="status-details-div">
                                    <p>Your Order has been Packed</p>
                                </span>
                            ) : null}
                        </div>

                    </div>

                    <div ref={orderAssignedStep} className="step">
                        <div className="circle">✔</div>
                        <div ref={orderAssignedText} className="step-text">Assigned to Delivery Boy
                            {["Assigned", "Ontheway", "Delivered"].includes(status) ? (
                                <span className="status-details-div">
                                    <p>Assigned to <strong>{delBoyName}</strong></p>
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div ref={orderOnTheWayStep} className="step">
                        <div className="circle">✔</div>
                        <div ref={orderOnTheWayText} className="step-text">On the Way
                            {["Ontheway", "Delivered"].includes(status) ? (
                                <span className="status-details-div">
                                    <p>Share this OTP to Delivery Boy <strong>{otp}</strong></p>
                                </span>
                            ) : null}
                        </div>
                    </div>

                    <div ref={orderDeliveredStep} className="step">
                        <div className="circle">✔</div>
                        <div ref={orderDeliveredText} className="step-text">Delivered
                            {["Delivered"].includes(status) ? (
                                <span className="status-details-div">
                                    <p>Your order is <strong>{status}</strong></p>
                                </span>
                            ) : null}
                        </div>
                    </div>
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

export default TrackingOrder