import React from 'react'
import Header from './common/common'

const TrackingOrder = () => {

    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => {
            document.querySelector(".status-tracker").classList.add("animate");
        }, 500);
    });



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
                    <div className="progress-bar"></div>
                    <div className="progress-bar-fill"></div>

                    <div className="step done">
                        <div className="circle">✔</div>
                        <div className="step-text">Order Placed
                        {/* <p>Order placed on <strong>2022-01-15</strong></p> */}
                        </div>
                        
                    </div>

                    <div className="step done">
                        <div className="circle">✔</div>
                        <div className="step-text">Order Confirmed</div>
                    </div>

                    <div className="step active">
                        <div className="circle">⏳</div>
                        <div className="step-text">Shipped</div>
                    </div>

                    <div className="step">
                        <div className="circle">🚚</div>
                        <div className="step-text">Out for Delivery</div>
                    </div>

                    <div className="step">
                        <div className="circle">📦</div>
                        <div className="step-text">Delivered</div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default TrackingOrder