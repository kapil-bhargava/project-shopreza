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
    const [unitId, setunitId] = useState();
    const loginPopup = useRef()
    const signupPopup = useRef()
    const otpPopup = useRef()
    const loaderWaiting = useRef()
    const loaderLoading = useRef()


    const sub = async () => {
        loaderLoading.current.style.display = "block"
        const re = await fetch(`${process.env.REACT_APP_URL}/subcategoryapi.php?cid=${cid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await re.json()
        loaderLoading.current.style.display = "none"
        setsubcatdata(data)
    }


    const getProduct = async (scid) => {
        loaderLoading.current.style.display = "block"
        const re = await fetch(`https://zninfotech.com/mywork/webapi/productapi.php?scid=${scid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await re.json()

        if (data.length > 0 && data[0].available_units.length > 0) {
            setunitId(data[0].available_units[0].unitid); // Set the unit ID from the first available unit of the first product
        } else {
            console.warn("No available units found in the first product.");
            setunitId(null); // Set a default value or handle accordingly
        }
        loaderLoading.current.style.display = "none";
        setproductdata(data)
    }

    //login Validation function 
    const loginValidation = async () => {
        loaderWaiting.current.style.display = "block"
        const re = await fetch("https://zninfotech.com/mywork/webapi/validateapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${cookie["sp"]}`
            },
            body: JSON.stringify({ mobile: usermobile, password: userpassword })
        });
        const data = await re.json();
        loaderWaiting.current.style.display = "none"
        if (data.response === "Valid") {
            createcookie("sp", usermobile);
            loginPopup.current.style.display = "none";
            otpPopup.current.style.display = "none";
            window.location.reload();
        }
        else {
            alert("Invalid Mobile or Password")
        }
    }
    // adding to the cart 
    const addToCart = async (x) => {
        if (cookie["sp"] == null) {
            loginPopup.current.classList.add("active-popup");
        }
        else {
            loaderLoading.current.style.display = "block";
            const re = await fetch("https://zninfotech.com/mywork/webapi/cartapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization': `Bearer ${cookie["sp"]}`
                },
                body: JSON.stringify({ unitid: x, mobile: cookie.sp, storeid: "1" })
            });
            const data = await re.json();
            loaderLoading.current.style.display = "none";
            alert(data.response)
        }
    }

    // opening login and signup popups 
    const openSignup = () => {
        loginPopup.current.classList.remove("active-popup");
        signupPopup.current.classList.add("active-popup");
        // loginPopup.current.style.display = "none";
    }
    const openLogin = () => {
        loginPopup.current.classList.add("active-popup");
        signupPopup.current.classList.remove("active-popup");
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
        // alert(data.response)
        if(data.response==="Saved"){
            otpPopup.current.style.display = "block";
            loginPopup.current.style.display = "none";
            signupPopup.current.style.display = "none";
        }
        else{
            alert("Already Registered")
        }

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
            loginValidation()
        }
        else {
            alert("Already logged in")
        }

    }


    useEffect(() => {
        sub()
        // alert(cookie.sp);
        //   console.log(cookie["usermobile"])
    }, [])
    return (
        <>
            {/* loader  */}
            <div ref={loaderLoading} className="loading">
                <p>Loading....</p>
            </div>

            {/* wait  */}
            <div ref={loaderWaiting} className="loading">
                <p>Please wait....</p>
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
                                    <button onClick={()=>{addToCart(x.available_units[0].unitid)}} className="">Add</button>
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