import React, { useEffect, useRef, useState } from 'react'
import Header from './common/header'
import { useParams } from 'react-router-dom';
import { useCookies } from "react-cookie"

const SubCategory = () => {
    const { cid } = useParams()
    const [subcatdata, setsubcatdata] = useState([]);
    const [productdata, setproductdata] = useState([]);
    const [cookie, createcookie, removecookie] = useCookies();
    const [username, setusername] = useState()
    const [usermobile, setusermobile] = useState()
    const [userpassword, setuserpassword] = useState()
    const [otp, setOtp] = useState();
    const loginPopup = useRef()
    const signupPopup = useRef()
    const otpPopup = useRef()


    const sub = async () => {
        document.getElementById("loader").style.display = "block"
        const re = await fetch(`https://zninfotech.com/mywork/webapi/subcategoryapi.php?cid=${cid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await re.json()
        document.getElementById("loader").style.display = "none"
        setsubcatdata(data)
    }


    const getProduct = async (scid) => {
        document.getElementById("loader").style.display = "block"
        const re = await fetch(`https://zninfotech.com/mywork/webapi/productapi.php?scid=${scid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await re.json()
        document.getElementById("loader").style.display = "none";
        setproductdata(data)
    }

    //validation function for login 
    const validationLogin = async () => {
        const re = await fetch("https://zninfotech.com/mywork/webapi/validateapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${cookie["sp"]}`
            },
            body: JSON.stringify({ mobile: usermobile, password: userpassword })
        });
        const data = await re.json();
        if (data.response === "Valid") {
            createcookie("sp", usermobile);

            loginPopup.current.style.display = "none";
            otpPopup.current.style.display = "block";
            // window.location.reload();
        }
        else {
            alert("Invalid Mobile or Password")
        }
    }
    // adding to the cart 
    const addToCart = async () => {
        if (cookie["sp"] == null) {
            loginPopup.current.style.display = "block";
        }
        else {
            validationLogin()
        }
    }

    // opening login and signup popups 
    const openSignup = () => {
        signupPopup.current.style.display = "block";
        loginPopup.current.style.display = "none";
    }
    const openLogin = () => {
        loginPopup.current.style.display = "block";
        signupPopup.current.style.display = "none";
    }

    // fetching sign up api 
    const signUp = async () => {
        const re = await fetch("https://zninfotech.com/mywork/webapi/signupapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: username, mobile: usermobile, password: userpassword })
        });
        const data = await re.json();
        alert(data.response)
        loginPopup.current.style.display = "none";
        signupPopup.current.style.display = "none";
        otpPopup.current.style.display = "block";

    }

    // otp otpVerification
    const otpVerification = async () => {
        const re = await fetch("https://zninfotech.com/mywork/webapi/verifyotpapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile: usermobile, otp: otp })
        });
        const data = await re.json();
        alert(data.response);
        if (data.response === "Verified") {
            createcookie("sp", usermobile);
            // window.location.reload();
            // loginPopup.current.style.display = "none";
            otpPopup.current.style.display = "none";

        }
    }

    //login
    const login = () => {
        if (cookie["sp"] == null) {
            validationLogin()
        }
        else {
            alert("Already logged in")
        }

    }


    useEffect(() => {
        sub()
    }, [])
    return (
        <>
            {/* loader  */}
            <div id='loader' className="loading">
                <h1>Loading....</h1>
            </div>
            {/* login popup */}
            <section ref={loginPopup} className="login-popup-container">
                <h4>Login</h4>
                <label htmlFor="">Enter Mobile Number</label>
                <input onChange={(e) => { setusermobile(e.target.value) }} placeholder='915468XXXX' type="number" /> <br /> <br />
                <label htmlFor="">Enter Password</label>
                <input onChange={(e) => { setuserpassword(e.target.value) }} placeholder='Password' type="password" /> <br /> <br />

                <button className="btn btn-success" onClick={login}>Login</button> <br />
                <p>Not have an account ? <span onClick={openSignup}>Signup</span></p>
            </section>
            {/* signup popup */}
            <section ref={signupPopup} className="login-popup-container sp">
                <h4>SignUp</h4>
                <label htmlFor="">Enter Name</label>
                <input onChange={(e) => { setusername(e.target.value) }} placeholder='Your Name' type="name" /> <br /> <br />
                <label htmlFor="">Enter Mobile Number</label>
                <input onChange={(e) => { setusermobile(e.target.value) }} placeholder='915468XXXX' type="number" /> <br /> <br />
                <label htmlFor="">Enter Password</label>
                <input onChange={(e) => { setuserpassword(e.target.value) }} placeholder='Password' type="password" /> <br /> <br />

                <button className="btn btn-warning" onClick={signUp}>SignUp</button> <br />
                <p>Already have an account ? <span onClick={openLogin}>Login</span></p>
            </section>
            {/* otp popup  */}
            <section ref={otpPopup} className="login-popup-container otp">
                <p>Enter the OTP sent on <strong>{usermobile}</strong></p>
                <label htmlFor="">Enter OTP</label>
                <input onChange={(e) => { setOtp(e.target.value) }} placeholder='Enter OTP' type="number" /> <br /> <br />
                <button className="btn btn-primary" onClick={otpVerification}>Verify</button> <br />
            </section>


            {/* Header */}
            <Header loginPopup={loginPopup} />
            {/* SubCategory Section */}
            <section className="sub-cat-main-container">
                <aside className="sidebar">

                    {/* <ul> */}
                    {
                        subcatdata.map((x, index) => {
                            return (
                                <ul key={index}>
                                    <li onClick={() => { getProduct(x.subcatid) }}>
                                        <img src={x.pic} alt={x.pic} /> <span>{x.subcatname}</span>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </aside>
                <aside className="sidebar-right">
                    {
                        productdata.map((x, index) => {
                            return (
                                <div key={index} className="items">
                                    <img src={x.pic} alt={x.pic} />
                                    <h5>{x.productname}</h5>
                                    <p>₹ <del> {x.available_units[0].price}</del> <strong>{x.available_units[0].offerprice}</strong></p>
                                    <button onClick={addToCart} className="">Add</button>
                                </div>
                            )
                        })
                    }

                </aside>
            </section>
            <section className="sub-cat-container-2">

            </section>

        </>
    )
}

export default SubCategory