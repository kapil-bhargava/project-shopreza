import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from 'react-redux';

const Header = ({ loginPopup, popupBg }) => {
    const mynum = useSelector((state) => state.cartitem);
    const jump = useNavigate();

    const [saved, setSaved] = useState();

    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();
    const [cookie_userAddress, createcookie_userAddress, removecookie_userAddress] = useCookies();
    const [cartData, setCartData] = useState([])
    const [total, settotal] = useState(0);
    const dispatch = useDispatch();
    const cart = useRef();
    const cartbg = useRef();
    const userProfile = useRef();
    const userProfileBg = useRef();

    const confirmPopup = useRef();
    const confirmPopupBg = useRef();


    // confirm popup code 
    const openConfirmPopup = () => {
        closeUserProfile()
        confirmPopup.current.classList.add("active-confirmation-popup");
        confirmPopupBg.current.classList.add("active-confirmationBg");
    }
    const closeConfirmPopup = () => {
        confirmPopup.current.classList.remove("active-confirmation-popup");
        confirmPopupBg.current.classList.remove("active-confirmationBg");
    }

    const closeUserProfile = () => {
        userProfile.current.style.transform = 'translateX(100%)';
        userProfileBg.current.classList.remove("user-profileBg-active")
    }
    const openUserProfile = () => {
        userProfile.current.style.transform = 'translateX(0)';
        userProfileBg.current.classList.add("user-profileBg-active")
    }

    const cartOpen = () => {
        getCartData();
        cart.current.classList.add("show")
        cartbg.current.classList.add("show")
    }
    const cartClose = () => {
        cart.current.classList.remove("show")
        cartbg.current.classList.remove("show")

    }
    const openLogin = () => {
        // if (loginPopup.current) {
        loginPopup.current.classList.add("active-popup");
        popupBg.current.classList.add("active-popupBg");
        // }

    }


    const [cartLength, setCartLength] = useState("");
    // gettting cart data 
    const getCartData = async () => {
        // alert(cookie.sp)
        const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: cookie.sp, storeid: cookie.storeid })
        });
        const data = await re.json();
        setCartLength(data.length)
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

    // logout function 
    const logout = () => {
        
            removecookie("sp");
            removecookie("storeid");
            removecookie("address");
            removecookie("username");
            closeUserProfile();
            jump('/')
            window.location.reload();
            // setTimeout(() => {
            //     openLogin()
            // }, 5000)

    };


    // Increment and Decrement of Product in Cart 
    const cartCount = async (ctype, cartid) => {
        const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ctype: ctype, cartid: cartid, mobile: cookie.sp, storeid: cookie.storeid })
        });
        const data = await re.json();
        dispatch({ type: 'INC', cdata: data.cdata });
        getCartData();
    }



    const groceryItems = ["Vegetables", "Fruits", "Dairy", "Grocery", "Eggs"];

    const [currentIndex, setCurrentIndex] = useState(0);
    const inputRef = useRef();
    const searchRef = useRef();
    const input = inputRef.current;

    const head = useRef();

// Function changing the backgroundColor of header when scroll Y 50px 
    // useEffect(() => {
        // window.addEventListener('scroll', () => {
        //     if (window.scrollY > 50) {
        //         head.current.style.backgroundColor = 'var(--primary-yellow)';
        //     } else {
        //         head.current.style.backgroundColor = 'var(--primary-green)';
        //     }
        // });
    // }, []);





    useEffect(() => {
        if (cookie.sp == null) {
            openLogin()
        }
        else {
            getCartData();

            // Change text every 2 seconds
            const interval = setInterval(() => {
                if (document.activeElement === input) {
                    searchRef.current.style.backgroundColor = 'red';
                    // input.blur();
                    // alert("Input is focused")
                }
                else {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % groceryItems.length);

                }
            }, 2000);

            return () => clearInterval(interval); // Cleanup on unmount
        }


    }, [])

    return (
        <>
            <header ref={head}>
                <div className="logo">
                    <Link className='link' to="/">
                        <h1>Shop<span>Reza</span></h1>
                    </Link>
                </div>
                <div className="add-div">
                    {cookie_userAddress.address == null ?
                        (<h6><i style={{color:"white"}} className="fas fa-map-marker-alt"></i></h6>)
                        : (<span><h5>Delivery in <span>10</span> minutes</h5>
                            <p>{cookie_userAddress.address}</p></span>)}


                </div>
                <div className="inpt-div">
                    <div ref={searchRef} className="search">
                        <i className="fa-solid fa-magnifying-glass"></i><input ref={inputRef} placeholder="" type="text" />
                        <div key={currentIndex} className="placeholder-text" id="placeholder-text">{groceryItems[currentIndex]}</div>
                    </div>
                </div>
                <div className="cart-btn-div">
                    <i onClick={cartOpen} className="fa fa-shopping-cart">
                        {/* {cartData.length > 0? cartData.reduce((acc, item) => acc + item.qty, 0) : 0} */}
                        {/* <span className="cat-badge">{cartData.length > 0? cartData.reduce((acc, item) => acc + item.qty, 0) : 0 }</span> */}
                        <span className="cat-badge">{mynum}</span>
                        {/* <span className="cart-price">��560</span> */}

                    </i>
                    {
                        cookie["sp"] == null && cookie2["sp2"] == null ? (
                            // <Link to="/userlogin">
                            <button onClick={openLogin} className="btn btn-success">Login</button>
                            // </Link>
                        ) : (
                            <div className="mobile-user-icon">
                                <i onClick={openUserProfile} className="fa fa-user"></i>
                            </div>
                        )
                    }

                </div>
                {/* <div className="mobile-user-icon">
                    <i className="fa fa-user"></i>
                </div> */}
            </header>

            {/* =======cart coding=========  */}

            <div ref={cartbg} onClick={cartClose} className="cart-bg-div"></div>
            <div id='cc' ref={cart} className="cart-container">
                <div className="cart-header">
                    <h2> Cart</h2>
                    <i onClick={cartClose} className="fa fa-times"></i>
                </div>
                {
                    cartLength == 0 ? (
                        <div className="empty-cart">
                            {/* <h3>Your cart is empty</h3> */}
                            <img src={require("../images/empty_cart.png")} alt="" />
                            <p>Your cart is empty. Start shopping now!</p>
                            <div className="empty-cart-btn-div">
                                <Link to="/" className="lnk-empty-cart btn btn-warning">Continue Shopping</Link>
                            </div>
                        </div>
                    )
                        : (


                            <div>

                                <div className="scroll-cart">

                                    <div className="delivery-info">
                                        <p>
                                            <strong>Free delivery in 9 minutes</strong>
                                        </p>
                                        <p>Shipment of {cartLength} items</p>
                                    </div>

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
                                                            <p><del>{x.price}</del> <strong>{x.offerprice}</strong></p>
                                                        </div>
                                                        <div className="quantity">
                                                            <span className="quantity-btn" onClick={() => { cartCount("minus", x.cartid) }}>-</span>
                                                            <span>{x.quantity}</span>
                                                            <span className="quantity-btn" onClick={() => { cartCount("plus", x.cartid) }}>+</span>
                                                        </div>
                                                        <div className="multipy-item-div">
                                                            <strong>₹{x.quantity * x.offerprice}</strong>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }


                                    </div>

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
                                    <div className="bill-details">
                                        <h4> <strong>Address</strong></h4>
                                        <p>
                                            {cookie_userAddress.address}
                                        </p>
                                    </div>

                                    <div className="cart-footer">
                                        <div className="total-amount">₹ {total}</div>
                                        <Link to="/checkout">
                                            <button className="proceed-btn">Proceed</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

            </div>


            {/* user icon click section part  */}
            <div onClick={closeUserProfile} ref={userProfileBg} className="user-profileBg"></div>
            <section ref={userProfile} className="user-profile">
                <h3>{cookie.username} <br /> {cookie.sp}</h3> <div onClick={closeUserProfile} className="cross-mobile">&times;</div>
                <div className="user-dropdown">
                    <ul>
                        <li><Link className='link-m' to="/profile"> <i className="fas fa-user"></i> Profile</Link></li>
                        <li><Link className='link-m' to="/userorders"> <i className="fas fa-box"></i> Orders</Link></li>
                        <li onClick={openConfirmPopup}> <i className="fas fa-sign-out-alt"></i> Logout</li>
                    </ul>
                </div>
            </section>


            <div style={{zIndex:"5000"}} ref={confirmPopupBg} className="confirmation-popupBg user-logoutBg">
                <div style={{zIndex:"5001"}} ref={confirmPopup} className="confirmation-popup user-logout-poppup">
                    <div className="cross-confirm-main-div d-flex justify-content-end">
                        <div onClick={closeConfirmPopup} className="cross-confirm-popup-div">
                            <i className="fas fa-times" ></i>
                        </div>
                    </div>
                    <h6 className='text-center'>
                        Are you sure want to Logout ?</h6>
                    {/* <p style={{fontSize:"12px"}}>
            This action will log you out from the system.
          </p> */}
                    <div className="del-btn-div d-flex justify-content-around">
                        <button onClick={logout} className="btn btn-danger btn-sm">Yes, Logout</button>
                        <button onClick={closeConfirmPopup} className="btn btn-light border btn-sm">Cancel</button>
                    </div>
                </div>
            </div>


        </>
    )
};


const Footer = () => {
    return (
        <>
            <footer>
                <p>2024 ShopReza. All Rights Reserved.</p>
                <div className="social-media-div">
                    <a href="#"><i className="fa-brands fa-facebook"></i></a>
                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#"><i className="fa-brands fa-youtube"></i></a>
                </div>
            </footer>
        </>
    )
}
const Tracking = () => {
    const [cookie, createcookie, removecookie] = useCookies();

    // useState for setting order Data 
    const [orderData, setOrderData] = useState([]);
    const [totalNotDeliveredOrders, setTotalNotDeliveredOrders] = useState();

    const jump = useNavigate();
    // getting productorder
    const getProductOrders = async () => {
        try {
            // loaderLoading.current.style.display = "block";
            const re = await fetch(`${process.env.REACT_APP_URL}/productorderapi.php?vtype=customer&mobile=${cookie.sp}&storeid=${cookie.storeid}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const dt = await re.json();
            const or = dt.filter(order => order.orderstatus !== "Delivered");
            setOrderData(or);
            setTotalNotDeliveredOrders(or.length);
            // loaderLoading.current.style.display = "none";
        }
        catch (error) {
            console.log(error)
        }
    }

    const orPopup = useRef();
    const orPopupBg = useRef();

    const openOrders = () => {
        orPopup.current.classList.add("show");
        orPopupBg.current.classList.add("showBg");

        // console.log(orderData)
        // alert("Orders");
    }
    const closeOrders = () => {
        orPopupBg.current.classList.remove("showBg");
        orPopup.current.classList.remove("show")
    }

    const openTracking = (orderid) => {
        jump(`/trackingorder/${orderid}`)
    }

    useEffect(() => {
        getProductOrders();
        // console.log("useeffect run")
    }, [])
    return (
        <>
            {/* Tracking fixed section in bottom  */}
            <div className="track-main">
                <p>Track your Order here</p>
                <p>Total tracking orders : <strong onClick={openOrders}>{totalNotDeliveredOrders}</strong> </p>
            </div>

            {/* or Popup */}
            <div ref={orPopupBg} className="NotDeliveredOrder-popup-Bg"></div>
            <div ref={orPopup} className="NotDeliveredOrder-popup">
                <div className="closeOrder">
                    <i onClick={closeOrders} className="fa fa-times"></i>
                </div>
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
                </div>
            </div>
        </>
    )
}


export default Header

export { Footer, Tracking }