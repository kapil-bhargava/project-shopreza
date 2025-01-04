import React, { useEffect, useRef, useState } from 'react'
import Header from './common/common'
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
    const popupBg = useRef()
    const signupPopup = useRef()
    const otpPopup = useRef()
    const loaderWaiting = useRef()
    const loaderLoading = useRef()
    const audio = useRef()
    const animatedImg = useRef();

    const [nameError, setNameError] = useState();
    const [mobileError, setMobileError] = useState();
    const [passwordError, setPasswordError] = useState();


    const opencart = () => {
        document.getElementById("cc").style.display = "block"
    }

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
        const re = await fetch(`${process.env.REACT_APP_URL}/productapi.php?scid=${scid}`, {
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
        if (!usermobile && !userpassword) {
            setMobileError("Mobile is required");
            setPasswordError("Password is required");
        }
        else if (!userpassword) {
            setPasswordError("Password is required");
        }
        else if (!username) {
            setMobileError("Mobile is required");
        }
        else {
            loaderWaiting.current.style.display = "block"
            const re = await fetch(process.env.REACT_APP_URL + "/validateapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mobile: usermobile, password: userpassword })
            });
            const data = await re.json();
            loaderWaiting.current.style.display = "none"
            if (data.response === "Valid") {
                createcookie("sp", usermobile, {
                    path: "/", // Cookie is available on all routes
                    maxAge: 3600 * 24 * 30 * 12 * 10, // 10 years in seconds
                    secure: true, // Use for HTTPS
                });

                loginPopup.current.style.display = "none";
                otpPopup.current.style.display = "none";
                window.location.reload();
            }
            else {
                alert("Invalid Mobile or Password")
            }
        }
    }
    // adding to the cart 
    const addToCart = async (x) => {
        if (cookie["sp"] == null) {
            loginPopup.current.classList.add("active-popup");
            popupBg.current.classList.add("active-popupBg");
        }
        else {
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ unitid: x, mobile: cookie.sp, storeid: "1" })
            });
            const data = await re.json();
            audio.current.play()
            animatedImg.current.classList.add("active-animated-img");
            setTimeout(() => {
                animatedImg.current.classList.remove("active-animated-img");
            }, 500)
            loaderLoading.current.style.display = "none";
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


    // signUp onChange functions 
    const nameChange = (e) => {
        const nameValue = e.target.value;
        const regex = /^[A-zA-Z\s]{2,50}$/;
        if (nameValue && !regex.test(nameValue)) {
            setNameError(
                "Name must only contain letters and spaces"
            );
        } else {
            setNameError(""); // Clear error if valid
        }
        setusername(nameValue);
    }
    const mobileChange = (e) => {
        const mobileValue = e.target.value;
        const regex = /^[6-9]\d{9}$/;
        if (!/^\d*$/.test(mobileValue)) {
            setMobileError("Only numeric values are allowed");
            return;
        }
        if (mobileValue.length > 10) {
            setMobileError("Mobile number must not exceed 10 digits");
        } else if (mobileValue && !regex.test(mobileValue)) {
            setMobileError("Invalid mobile number");
        } else {
            setMobileError(""); // Clear error if valid
        }

        setusermobile(mobileValue);
    }
    const signUpPassword = (e) => {
        setuserpassword(e.target.value)
    }

    // for login up back button 
    const goBack = () => {
        popupBg.current.classList.remove("active-popupBg");
        loginPopup.current.classList.remove("active-popup");
        signupPopup.current.classList.remove("active-popup");

    }
    // for sign up back button 
    const goBackToLogin = () => {
        // popupBg.current.classList.remove("active-popupBg");
        loginPopup.current.classList.add("active-popup");
        signupPopup.current.classList.remove("active-popup");

    }

    // fetching sign up api 
    const signUp = async () => {
        if (!username && !usermobile && !userpassword) {
            setNameError("Name is required");
            setMobileError("Mobile is required");
            setPasswordError("Password is required");
        }
        else if (!usermobile && !userpassword) {
            setMobileError("Mobile is required");
            setPasswordError("Password is required");
        }
        else if (!usermobile && !username) {
            setMobileError("Mobile is required");
            setNameError("Name is required");
        }
        else if (!username && !userpassword) {
            setPasswordError("Password is required");
            setNameError("Name is required");
        }
        else if (!username && !usermobile) {
            setMobileError("Mobile is required");
            setNameError("Name is required");
        }
        else if (!username) {
            setNameError("Name is required");
        }
        else if (!usermobile) {
            setMobileError("Mobile is required");
        }
        else if (!userpassword) {
            setPasswordError("Password is required");
        }
        else {
            const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, mobile: usermobile, password: userpassword })
            });
            const data = await re.json();
            // alert(data.response)
            if (data.response === "Saved") {
                otpPopup.current.style.display = "block";
                loginPopup.current.style.display = "none";
                signupPopup.current.style.display = "none";
            }
            else {
                alert("Already Registered")
            }
        }

    }

    // otp otpVerification
    const otpVerification = async () => {
        const re = await fetch(process.env.REACT_APP_URL + "/verifyotpapi.php", {
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
    }, [])
    return (
        <>



            {/* Header */}
            <Header loginPopup={loginPopup} popupBg={popupBg} />
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
                                    <div className="product-pic-div">
                                        <img src={x.pic} alt={x.pic} />
                                        <img ref={animatedImg} src={x.pic} className='animated-img' />

                                    </div>
                                    <h5>{x.productname}</h5>
                                    <p>₹ <del> {x.available_units[0].price}</del> <strong>{x.available_units[0].offerprice}</strong></p>
                                    <button onClick={() => { addToCart(x.available_units[0].unitid) }}>Add <span className="add-btn-badge">3</span> </button>
                                </div>
                            )
                        })
                    }

                </aside>
            </section>

            {/* mobile cart  */}
            <div className="mobile-cart-main-section">
                <div className="mobile-cart">
                    <h3>Cart</h3>
                    {/* <p>You have no items in your cart</p> */}
                    <button onClick={opencart} className="btn btn-success"></button>
                </div>
            </div>


            <section className="sub-cat-container-2">

            </section>


            {/* i have to setup these codes somewhere */}

            {/* popup background */}
            <div ref={popupBg} className="popup-bg"></div>
            {/* audio  */}
            <audio ref={audio} src={require("./sounds/cash-sound.mp3")}></audio>
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
                <i onClick={goBack} className="fa-solid fa-arrow-left"></i>
                <h4>Login</h4>
                <label  >Enter Mobile Number</label>
                <input value={usermobile} onChange={mobileChange} placeholder='9158XXXX45' type="number" /> <br />
                {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>}
                <br />
                <label  >Enter Password</label>
                <input onChange={(e) => { setuserpassword(e.target.value) }} placeholder='Password' type="password" /> <br />
                {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>}
                <br />

                <button className="btn btn-success" onClick={login}>Login</button> <br />
                <p>Not have an account ? <span onClick={openSignup}>Signup</span></p>
            </section>

            {/* signup popup */}
            <section ref={signupPopup} className="login-popup-container sp">
                <i onClick={goBackToLogin} className="fa-solid fa-arrow-left"></i>
                <h4>SignUp</h4>
                <label  >Enter Name</label>
                <input value={username} onChange={nameChange} placeholder='Your Name' type="name" /> <br />
                {nameError && <span style={{ color: "red", fontSize: "12px" }}>{nameError}</span>}
                <br />
                <label  >Enter Mobile Number</label>
                <input value={usermobile} onChange={mobileChange} placeholder='915468XXXX' type="number" /> <br />
                {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>}
                <br />
                <label  >Enter Password</label>
                <input onChange={signUpPassword} placeholder='Password' type="password" /> <br />
                {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>}
                <br />

                <button className="btn btn-warning" onClick={signUp}>SignUp</button> <br />
                <p>Already have an account ? <span onClick={openLogin}>Login</span></p>
            </section>

            {/* otp popup  */}
            <section ref={otpPopup} className="login-popup-container otp">
                <p>Enter the OTP sent on <strong>{usermobile}</strong></p>
                <label  >Enter OTP</label>
                <input onChange={(e) => { setOtp(e.target.value) }} placeholder='Enter OTP' type="number" /> <br /> <br />
                <button className="btn btn-primary" onClick={otpVerification}>Verify</button> <br />
            </section>

        </>
    )
}

export default SubCategory