import React, { useEffect, useRef, useState } from 'react'
import Header from './common/common'
import { useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from 'react-redux';

const SubCategory = () => {
    const mynum = useSelector((state) => state.cartitem);
    const dispatch = useDispatch();

    const { cid } = useParams()
    const [subcatdata, setsubcatdata] = useState([]);
    const [productdata, setproductdata] = useState([]);
    const [aitem, setaitem] = useState([]);
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
    const unitOptionsBgDiv = useRef();
    const unitOptionsDiv = useRef();
    const mobileCart = useRef();
    const headerRef = useRef();

    const [nameError, setNameError] = useState();
    const [mobileError, setMobileError] = useState();
    const [passwordError, setPasswordError] = useState();

    const [spid,setspid]=useState();


    // updating cart count 
    const handleButtonClick = async (ctype, cartid, x) => {
        const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ctype: ctype, cartid: cartid, mobile:cookie.sp, storeid:"1" })
        });
        const data = await re.json();
        if (ctype === "plus") {
            aitem[x].cartqty = parseInt(aitem[x].cartqty) + 1;
        } else {
            aitem[x].cartqty = parseInt(aitem[x].cartqty) - 1;
        }
        console.log(aitem);
       
        dispatch({ type: 'INC', cdata: data.cdata });
        showUnitOptions(spid);

    };
    
    const handleButtonClick1 = async (ctype, cartid, x) => {
        
        const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ctype: ctype, cartid: cartid, mobile:cookie.sp, storeid:"1" })
        });
        const data = await re.json();
        if (ctype === "plus") {
            productdata[x].cartqty = parseInt(productdata[x].cartqty) + 1;
        } else {
            productdata[x].cartqty = parseInt(productdata[x].cartqty) - 1;
        }
        console.log(data);
//       alert(data.cdata);
        dispatch({ type: 'INC', cdata: data.cdata });
        getProduct(cid);

    };

    // unit options div close and open functions 
    const showUnitOptions = async (spid) => {
        
        setspid(spid);
        const re = await fetch(`${process.env.REACT_APP_URL}/aitemapi.php?spid=${spid}&mob=${cookie.sp}&storeid=1`, {
        // const re = await fetch(process.env.REACT_APP_URL + "/aitemapi.php?spid=1&mob=9565017342&storeid=1", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await re.json();
        console.log(data);
        setaitem(data);
        unitOptionsDiv.current.classList.add("active-unit-options-div");
        unitOptionsDiv.current.classList.add("active-unit-options-div-mobile");
    }

    const closeUnitOptions = (l) => {
        unitOptionsDiv.current.classList.remove("active-unit-options-div");
        unitOptionsDiv.current.classList.remove("active-unit-options-div-mobile");
    }

    const opencart = () => {
        document.getElementById("cc").style.display = "block"
    }

    // getting subcategory data 
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

    // getting all products 
    const getProduct = async (scid) => {
        
        loaderLoading.current.style.display = "block"
        var mob = cookie["sp"];
        const re = await fetch(`${process.env.REACT_APP_URL}/productapi.php?scid=${scid}&mob=${mob}&storeid=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await re.json()
        // console.log(data);
        console.table(data);
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
        else if (!usermobile) {
            setMobileError("Mobile is required");
        }
        else {
            alert(usermobile)
            alert(userpassword)
            loaderWaiting.current.style.display = "block"
            const re = await fetch(process.env.REACT_APP_URL + "/validateapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mobile: usermobile, password: userpassword, storeid:"1" })
            });
            const data = await re.json();
            console.log(data)
            loaderWaiting.current.style.display = "none"
            if (data.response === "Valid") {
                createcookie("sp", usermobile, {
                    path: "/", // Cookie is available on all routes
                    maxAge: 3600 * 24 * 30 * 12 * 10, // 10 years in seconds
                    secure: true, // Use for HTTPS
                });
                loginPopup.current.classList.remove('active-popup');              
                
            }
            else {
                alert("Invalid Mobile or Password")
            }
        }
    }
    // adding to the cart 
    const addToCart = async (unitId, x,au) => {
      //  alert(spid);
        if (cookie["sp"] == null) {
            loginPopup.current.classList.add("active-popup");
            popupBg.current.classList.add("active-popupBg");
        } else {
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ unitid: unitId, mobile: cookie.sp, storeid: "1" })
            });
            const data = await re.json();
           
            dispatch({ type: 'INC', cdata: data.cdata });
            alert(au);
           if(au==="yes"){ showUnitOptions(spid)};
            audio.current.play();
            mobileCart.current.classList.add("active-mobile-cart");
            animatedImg.current.classList.add("active-animated-img");
            setTimeout(() => {
                animatedImg.current.classList.remove("active-animated-img");
            }, 500);
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
                body: JSON.stringify({ name: username, mobile: usermobile, password: userpassword, lat:"101", lon:"202", storeid:"1" })
            });
            const data = await re.json();
            console.log(data);
            if (data.response === "Saved") {
                otpPopup.current.classList.add('active-popup');
                loginPopup.current.classList.remove('active-popup');
                signupPopup.current.classList.remove('active-popup');
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
            otpPopup.current.classList.remove('active-popup');
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
        sub();

    }, [])

    // useEffect(() => {
    //     alert("ss");
    //     if (aitem.length > 0) {
    //         console.log(aitem);
    //        // showUnitOptions(aitem);
    //     }

    // }, [aitem])
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

                    <div ref={unitOptionsDiv} className="unit-options-div">
                        <div onClick={closeUnitOptions} className="unit-options-div-cross-btn">
                            &times;
                        </div>
                        {aitem.map((unit, index) => (
                            <>
                                <h5></h5>
                                <div key={unit.unitid} className="options-items">
                                    <img src={unit.pic} alt={unit.unitname} />
                                    <h5>{unit.unitname}</h5>
                                    <h5>{unit.offerprice}</h5>
                                    {
                                        unit.cart === "no"
                                            ? <button className='items-options-single-btn' onClick={() => addToCart(unit.unitid, index,'yes')} >Add</button>
                                            :
                                            <span className="quantity">
                                                <button className="quantity-btn" onClick={() => { handleButtonClick("minus", unit.cartid, index) }}>-</button>
                                                <span>{unit.cartqty}</span>
                                                <button className="quantity-btn" onClick={() => { handleButtonClick("plus", unit.cartid, index) }}>+</button>
                                            </span>
                                    }
                                    {/* <button className='items-options-single-btn' onClick={() => addToCart(unit.unitid)} >Add</button> */}
                                    {/* <span className='items-options-btns'><button>-</button><span>{aitem.cartqty}</span><button>+</button></span> */}
                                </div >
                            </>
                        ))}
                    </div>
                    {productdata.map((x, index) => (
                        <div key={index} className="items">
                            <div className="product-pic-div">
                                <img src={x.pic} alt={x.productname} />
                                <img ref={animatedImg} src={x.pic} className="animated-img" />
                            </div>
                            <h5>{x.productname}</h5>
                            <p>
                                ₹ <del>{x.price}</del> <strong>{x.offerprice}</strong>
                            </p>
                            {
                                x.available_units>1?<button onClick={()=>showUnitOptions(x.spid)}>Add{' '}
                                {x.available_units > 1 && (
                                    <span className="add-btn-badge">{x.available_units}</span>
                                )}</button>:
                                (
                                    x.cart === "no"
                                    ? <button className='items-options-single-btn' onClick={() => addToCart(x.unitid, index,'yes')} >Add</button>
                                    :
                                    <span className="quantity">
                                        <button className="quantity-btn" onClick={() => { handleButtonClick1("minus", x.cartid, index) }}>-</button>
                                        <span>{x.cartqty}</span>
                                        <button className="quantity-btn" onClick={() => { handleButtonClick1("plus", x.cartid, index) }}>+</button>
                                    </span>
                                )
                            }
                            
                        </div>
                    ))}
                </aside>
            </section >

            {/* mobile cart  */}
            < div ref={mobileCart} className="mobile-cart-main-section" >
                <div className="mobile-cart">
                    <span>
                        <i className="fa fa-shopping-cart"></i>
                        {mynum}
                    </span>

                    <i onClick={opencart} className="fa-solid fa-chevron-right"></i>
                </div>
            </ div>


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
                <p>Please Enter the Verification code </p>
                {/* <strong>{usermobile}</strong> */}
                {/* <label>Enter OTP</label> */}
                <input onChange={(e) => { setOtp(e.target.value) }} placeholder='XXXX' type="number" /> <br /> <br />
                <button className="btn btn-primary" onClick={otpVerification}>Verify</button> <br />
            </section>
            {/* <button onClick={()=>{cc("INC")}}>Inc</button>
            <button onClick={()=>{cc("DEC")}}>Dec</button> */}

        </>
    )
}

export default SubCategory