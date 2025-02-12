import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from 'react-redux';
import Userlogin from '../userlogin';

const Header = ({ loginPopup, popupBg }) => {
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
    const userProfileBg = useRef();

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
        cart.current.style.display = 'block';
        cartbg.current.style.display = 'block';
    }
    const cartClose = () => {
        cart.current.style.display = 'none';
        cartbg.current.style.display = 'none';

    }
    const openLogin = () => {
        // if (loginPopup.current) {
        loginPopup.current.classList.add("active-popup");
        popupBg.current.classList.add("active-popupBg");
        // }

    }


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

    // logout function 
    const logout = () => {
        if (window.confirm("Are you sure ?")) {
            removecookie("sp");
            removecookie("storeid");
            removecookie("address");
            removecookie("username");
            closeUserProfile();
            jump('/')
            window.location.reload();
            setTimeout(() => {
                openLogin()
            }, 5000)

        }
    };


    // Increment and Decrement of Product in Cart 
    const cartCount = async (ctype, cartid) => {

        const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ctype: ctype, cartid: cartid })
        });
        const data = await re.json();
        dispatch({ type: 'INC', cdata: data.cdata });
        getCartData();
    }


    useEffect(() => {
        if (cookie.sp == null) {
            openLogin()
        }
        else {
            getCartData();
        }


    }, [])

    return (
        <>
            <header>
                <div className="logo">
                    <Link className='link' to="/">
                        <h1>Shop<span>Reza</span></h1>
                    </Link>
                </div>
                <div className="add-div">
                    {cookie_userAddress.address == null ?
                        (<h6><i className="fas fa-map-marker-alt"></i> &nbsp;Enter Location</h6>)
                        : (<span><h5>Delivery in <span>15</span> minutes</h5>
                            <p>{cookie_userAddress.address}</p></span>)}


                </div>
                <div className="inpt-div">
                    <div className="search">
                        <i className="fa-solid fa-magnifying-glass"></i><input placeholder="Search Milk..." type="text" />
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

                <div>
                    <div className="cart-header">
                        <h2> Cart</h2>
                        <i onClick={cartClose} className="fa fa-times"></i>
                    </div>
                    <div className="scroll-cart">

                        <div className="delivery-info">
                            <p>
                                <strong>Free delivery in 9 minutes</strong>
                            </p>
                            <p>Shipment of 2 items</p>
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
                                                <strong><p>{x.offerprice}</p></strong>
                                            </div>
                                            <div className="quantity">
                                                <button className="quantity-btn" onClick={() => { cartCount("minus", x.cartid) }}>-</button>
                                                <span>{x.quantity}</span>
                                                <button className="quantity-btn" onClick={() => { cartCount("plus", x.cartid) }}>+</button>
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

                        {/* <div className="donation">
                    <input type="checkbox" id="donation" />
                    <label htmlFor="donation">
                        Feeding India donation ₹1
                        <p>Working towards a malnutrition-free India. Feeding India...</p>
                    </label>
                </div> */}

                        {/* <div className="tip-delivery">
                    <h3>Tip your delivery partner</h3>
                    <p>
                        Your kindness means a lot! 100% of your tip will go directly to your
                        delivery partner.
                    </p>
                    <div className="tip-options">
                        <button>₹20</button>
                        <button className="most-tipped">₹30</button>
                        <button>₹50</button>
                        <button>Custom</button>
                    </div>
                </div> */}

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

            </div>

            {/* user icon click section part  */}
            <div onClick={closeUserProfile} ref={userProfileBg}  className="user-profileBg"></div>
            <section ref={userProfile} className="user-profile">
                <h3>{cookie.username} <br /> {cookie.sp}</h3> <div onClick={closeUserProfile} className="cross-mobile">&times;</div>
                <div className="user-dropdown">
                    <ul>
                        <li><Link className='link-m' to="/profile">Profile</Link></li>
                        <li><Link className='link-m' to="/userorders">Orders</Link></li>
                        <li onClick={logout}>Logout</li>
                    </ul>
                </div>
            </section>


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


export default Header

export { Footer }