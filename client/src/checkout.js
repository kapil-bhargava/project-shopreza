import { useEffect, useRef, useState } from "react";
import Header from "./common/common"
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
    const mynum = useSelector((state) => state.cartitem);
    const jump = useNavigate();

    const [saved, setSaved] = useState();

    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();
    const [cookie_userAddress, createcookie_userAddress, removecookie_userAddress] = useCookies();
    const [cookie_username, createcookie_username, removecookie_username] = useCookies();
    const [cartData, setCartData] = useState([])
    const [total, settotal] = useState(0);
    const dispatch = useDispatch();
    const cart = useRef();
    const cartbg = useRef();
    const userProfile = useRef();


    // gettting cart data 
    const getCartData = async () => {
        // alert(cookie.sp)
        const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: cookie.sp, storeid: "1" })
        });
        const data = await re.json();
        var itot = 0;
        var qty = 0;
        var saved = 0;
        for (var i = 0; i < data.length; i++) {
            saved = saved + (parseFloat(data[i].price - parseFloat(data[i].offerprice)) * parseFloat(data[i].quantity))
            itot = itot + (parseFloat(data[i].offerprice) * parseFloat(data[i].quantity));
            qty = qty + parseInt(data[i].quantity);
        }
        setSaved(saved)
        settotal(itot);
        setCartData(data);
        dispatch({ type: 'INC', cdata: qty });

    }


    // order placing function 
    const placeOrder = async () => {
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/productorderapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: cookie.sp,
                    storeid: cookie.storeid,
                    amount: total,
                    paymentmode: "COD"
                })
            });
            const data = await re.json();
            console.log(data);
            showOrderPopup();
            // createLeaves();
            // if (data.status === "success") {
            //     alert("Order placed successfully");
            //     removecookie("sp");
            //     removecookie_userAddress();
            //     removecookie_username();
            //     jump("/");
            // } else {
            //     alert("Failed to place order");
            // }
        }
        catch (error) {
            console.error(error);
        }
    }

    // function for animation of placing order 
    function showOrderPopup() {
    jump("/trackingorder")
        let popup = document.getElementById("orderPopup");
        popup.classList.add("show");
        createLeaves();
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            popup.classList.remove("show");
            window.location.reload();
            console.log("running timeout")
            // jump("/singleorder")
        }, 3000);
    }

    // Generate falling leaves dynamically
    function createLeaves() {
        const leafContainer = document.querySelector(".leaf-container");
        const leafTypes = ['leaf1', 'leaf2', 'leaf3'];

        for (let i = 0; i < 25; i++) { // Increased number of leaves
            let leaf = document.createElement("div");
            leaf.classList.add("leaf", leafTypes[Math.floor(Math.random() * leafTypes.length)]);

            // Random positions and animations
            let randomX = Math.random() * 100;
            let randomDelay = Math.random() * 5;
            let randomDuration = Math.random() * 10 + 10; // Longer duration
            let randomSize = Math.random() * 30 + 20; // Random size between 20px and 50px
            let randomRotation = Math.random() * 360; // Random initial rotation

            leaf.style.left = `${randomX}vw`;
            leaf.style.animationDuration = `${randomDuration}s`;
            leaf.style.animationDelay = `-${randomDelay}s`;
            leaf.style.width = `${randomSize}px`;
            leaf.style.height = `${randomSize}px`;
            leaf.style.transform = `rotate(${randomRotation}deg)`;

            leafContainer.appendChild(leaf);
        }
    }



    useEffect(() => {
        getCartData()
    }, [])

    return (
        <>
            <Header />
            {/* checkout page */}
            <div className="checkout-container">


                <div className="cart-items">
                    {
                        cartData.map((x, index) => {
                            return (

                                <div key={index} className="item">
                                    <img
                                        src={x.pic}
                                        alt={x.productname}
                                        className="item-image"
                                    />
                                    <div className="item-details">
                                        <p>{x.productname}</p>
                                        <p>{x.unitname}</p>
                                        <strong><p>{x.offerprice}</p></strong>
                                    </div>
                                  
                                </div>
                            )
                        })
                    }


                </div>

                {/* bill details  */}
                <div className="bill-details">
                    <h3> <strong>Bill details</strong></h3>
                    <p>
                        Items total <span className="saved">Saved ₹{saved}</span> ₹{total}
                    </p>
                    <p>
                        Delivery charge <span className="free">FREE</span>
                    </p>
                    <p>Handling charge <span className="free">FREE</span></p>
                    <p>Grand total <span><strong>₹ {total}</strong></span></p>
                </div>

                {/* address  */}
                <div className="bill-details">
                    <h4> <strong>Address</strong></h4>
                    <p>
                        {cookie_userAddress.address}
                    </p>
                </div>
                <div className="place-order-btn-div">
                    <button className="btn" onClick={placeOrder}>Place Order</button>

                </div>

                {/* <div className="cart-footer">
                    <div className="total-amount">₹ {total}</div>
                    <Link to="/checkout">
                        <button className="proceed-btn">Proceed</button>
                    </Link>
                </div> */}
            </div >

            {/* animatioin for placed order desing code  */}
            <div className="leaf-container"></div>

            <div id="orderPopup" className="popup">
                <h2>🎉 Order Placed!</h2>
                <p>Your order has been successfully placed.</p>
                <div className="progress-bar"></div>
            </div>

        </>
    )
}

export default Checkout