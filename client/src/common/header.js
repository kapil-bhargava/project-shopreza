import React, { useEffect, useRef, useState } from 'react'
import { Link, Links } from 'react-router-dom'
import { useCookies } from "react-cookie";

const Header = ({ loginPopup }) => {
    const [cookie, createcookie, removecookie] = useCookies()
    const [cartData, setCartData] = useState([])

    const cart = useRef();
    const cartbg = useRef();
    const userProfile = useRef();

    const closeUserProfile = () => {
        userProfile.current.style.transform = 'translateX(100%)';
    }
    const openUserProfile = () => {
        userProfile.current.style.transform = 'translateX(0)';
    }

    const cartOpen = () => {
        cart.current.style.display = 'block';
        cartbg.current.style.display = 'block';
    }
    const cartClose = () => {
        cart.current.style.display = 'none';
        cartbg.current.style.display = 'none';

    }
    const openLogin = () => {
        if (loginPopup.current) {
            const currentDisplay = loginPopup.current.style.display;
            loginPopup.current.style.display = currentDisplay === 'none' ? 'block' : 'none';
        }

    }

    // gettting cart data 
    const getCartData = async () => {
        const re = await fetch("https://zninfotech.com/mywork/webapi/cartapi.php", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: cookie.sp, storeid: "1" })
        });
        const data = await re.json();
        alert(data.length);
        setCartData(data)
    }
    
    // logout function 
    const logout = () => {
        removecookie("sp");
        closeUserProfile();
        // window.location.reload();
    }

    useEffect(() => {
        // getCartData();
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
                    <h5>Delivery in <span>15</span> minutes</h5>
                    <p>Lucknow, Uttar Pradesh, India</p>
                </div>
                <div className="inpt-div">
                    <div className="search">
                        <i className="fa-solid fa-magnifying-glass"></i><input placeholder="Search Milk..." type="text" />
                    </div>
                </div>
                <div className="cart-btn-div">
                    <i onClick={cartOpen} className="fa fa-shopping-cart"></i>
                    {
                        cookie["sp"] == null ? (
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
                    <h2>My Cart</h2>
                    <i onClick={cartClose} className="fa fa-times"></i>
                </div>

                <div className="delivery-info">
                    <p>
                        <strong>Free delivery in 9 minutes</strong>
                    </p>
                    <p>Shipment of 2 items</p>
                </div>

                <div className="cart-items">
                    <div className="item">
                        <img
                            src={require("./images/amul_butter.png")}
                            alt="Amul Salted Butter"
                            className="item-image"
                        />
                        <div className="item-details">
                            <p>Amul Salted Butter</p>
                            <p>100 g</p>
                            <strong><p>₹60</p></strong>
                        </div>
                        <div className="quantity">
                            <button className="quantity-btn">-</button>
                            <span>1</span>
                            <button className="quantity-btn">+</button>
                        </div>
                    </div>

                    <div className="item">
                        <img
                            src={require("./images/snacks.png")}
                            alt="Britannia Good Day Cashew Biscuit"
                            className="item-image"
                        />
                        <div className="item-details">
                            <p>Britannia Good Day Cashew Biscuit</p>
                            <p>200 g</p>
                            <strong><p>₹49</p></strong>
                        </div>
                        <div className="quantity">
                            <button className="quantity-btn">-</button>
                            <span>1</span>
                            <button className="quantity-btn">+</button>
                        </div>
                    </div>
                </div>

                <div className="bill-details">
                    <h3>Bill details</h3>
                    <p>
                        Items total <span className="saved">Saved ₹1</span> ₹109
                    </p>
                    <p>
                        Delivery charge <span className="free">FREE</span> ₹25
                    </p>
                    <p>Handling charge ₹2</p>
                    <h3>Grand total ₹111</h3>
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

                <div className="cancellation-policy">
                    <h3>Cancellation Policy</h3>
                    <p>
                        Orders cannot be canceled once packed for delivery. In case of
                        unexpected delays, a refund will be provided, if applicable.
                    </p>
                </div>

                <div className="cart-footer">
                    <div className="total-amount">₹111 TOTAL</div>
                    <button className="proceed-btn">Proceed</button>
                </div>
            </div>

            {/* user icon click section part  */}
            <section ref={userProfile} className="user-profile">
                <h3>User Name</h3> <div onClick={closeUserProfile} className="cross-mobile">&times;</div>
                <div className="user-dropdown">
                    <ul>
                        <li><Link className='link-m' to="/profile">Profile</Link></li>
                        <li><Link className='link-m' to="/orders">Orders</Link></li>
                        <li onClick={logout}>Logout</li>
                    </ul>
                </div>
            </section>
        </>
    )
}


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