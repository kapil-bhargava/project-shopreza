import React, { useRef, useState } from 'react'
import { useCookies } from 'react-cookie';

const Userlogin = (props) => {

    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie_username, createcookie_username, removecookie_username] = useCookies();
    const [usermobile, setusermobile] = useState("")
    const signupPopup = useRef()
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    // useStates for signUp data 

    const [mobileError, setMobileError] = useState("");
    const [username, setusername] = useState()


    //login Validation function 
    const loginValidation = async () => {
        if (!usermobile) {
            setMobileError("Mobile is required");
        }
        else {
            loaderWaiting.current.style.display = "block"
            const re = await fetch(process.env.REACT_APP_URL + "/validateapi.php?mob=" + usermobile, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await re.json();
            console.log(data);
            if(data[0].status === "Done") {
                openSignup();
            }
            loaderWaiting.current.style.display = "none"
           
        }
    }



    // for login up back button 
    const goBack = () => {
        props.ref.current.classList.remove("active-popup");
        signupPopup.current.classList.add("active-popup");
    }

    // opening login and signup popups 
    const openSignup = () => {
        props.ref.current.classList.remove("active-popup");
        signupPopup.current.classList.add("active-popup");
    }
    

    const login = () => {
        if (cookie.sp == null) {
            loginValidation()
        }
        else {
            alert("Already logged in")
        }

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


    const closePopup = () => {
        if (cookie.sp !== undefined) {
            // alert("If Cookie: " + cookie.sp)
            props.ref.current.classList.remove("active-popup");
            signupPopup.current.classList.remove("active-popup");
            props.ref1.current.classList.remove("active-popupBg");
        }
        else {
            // alert("Else Cookie: " + cookie.sp)
            signupPopup.current.classList.add("effected-popup");
            props.ref.current.classList.add("effected-popup");
            setTimeout(() => {
                props.ref.current.classList.remove("effected-popup");
                signupPopup.current.classList.remove("effected-popup");
            }, 1000)

        }
    }

    const [OTP, setOTP] = useState("");

    const verifyOTP = async () => {
        if (OTP.length === 4) {
            const re = await fetch(process.env.REACT_APP_URL + "/validateapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mobile: usermobile, otp: OTP })
            });
            const data = await re.json();
            console.log(data);
            if (data.response === "Valid") {
                createcookie("sp", usermobile, {
                    path: "/",
                    maxAge: 3600 * 24 * 30 * 12 * 10, 
                    secure: true, 
                });
                createcookie("storeid", data.storeid, {
                    path: "/", 
                    maxAge: 3600 * 24 * 30 * 12 * 10, 
                    secure: true, 
                });
                createcookie("address", data.address, {
                    path: "/", 
                    maxAge: 3600 * 24 * 30 * 12 * 10,
                    secure: true,
                });
                createcookie_username("username", data.name,{
                    path: "/", // Cookie is available on all routes
                    maxAge: 3600 * 24 * 30 * 12 * 10, // 10 years in seconds
                    secure: true, // Use for HTTPS
                });
                window.location.reload();
                props.ref.current.classList.remove("active-popup");
                props.ref1.current.classList.remove("active-popupBg");
            }
            else {
                alert("Invalid Mobile or Password")
            }
        }
    }


    return (
        <>

            <section ref={props.ref} className="login-popup-container">
                <i onClick={goBack} className="fa-solid fa-arrow-left"></i>
                <h4>Login</h4>
                <label  >Enter Registered Mobile Number</label>
                <input value={usermobile} onChange={mobileChange} placeholder='9158XXXX45' type="number" />
                {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>}
                <br />
                <button className="btn btn-success" onClick={login}>Go</button> <br />
            </section>
            <div onClick={closePopup} ref={props.ref1} className="popup-bg"></div>

            {/* sign up popup  */}
            <section ref={signupPopup} className="sp login-popup-container ">
                <h4>OTP</h4>
                <label  >Enter OTP</label>
                <input value={username} onChange={(e) => { setOTP(e.target.value) }} placeholder='Enter OTP' type="number" />
                <button className="btn btn-warning" onClick={verifyOTP}>Verify</button> <br />
            </section>


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
export default Userlogin