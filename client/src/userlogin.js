import React, { useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

const Userlogin = (props) => {

    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();
    const [usermobile, setusermobile] = useState()
    const loginPopup = useRef()
    const popupBg = useRef()
    const signupPopup = useRef()
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const [confirmuserpassword, setconfirmuserpassword] = useState();
    const [userpassword, setuserpassword] = useState();

    const [mobileError, setMobileError] = useState();
    const [passwordError, setPasswordError] = useState();

    const [spid, setspid] = useState();

    const [error, setError] = useState("");


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
                createcookie2("sp2", data.storeid, {
                    path: "/", // Cookie is available on all routes
                    maxAge: 3600 * 24 * 30 * 12 * 10, // 10 years in seconds
                    secure: true, // Use for HTTPS
                });
                window.location.reload();

                closePopup();

            }
            else {
                alert("Invalid Mobile or Password")
            }
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




    const login = () => {
        if (cookie["sp"] == null) {
            loginValidation()
        }
        else {
            alert("Already logged in")
        }

    }
    const goBack = () => {
        loginPopup.current.style.display = "none";
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
    const signUpConfirmPassword = (e) => {
        setconfirmuserpassword(e.target.value)
    }

    const closePopup = () => {
        props.ref.current.classList.remove("active-popup");
        props.ref1.current.classList.remove("active-popupBg");
    }

    return (
        <>
            <section ref={props.ref} className="login-popup-container ">
                <i onClick={goBack} className="fa-solid fa-arrow-left"></i>
                <h4>Login</h4>
                <label  >Enter Mobile Number</label>
                <input value={usermobile} onChange={mobileChange} placeholder='9158XXXX45' type="number" /> <br />
                {/* {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>} */}
                <br />
                <label  >Enter Password</label>
                <input onChange={(e) => { setuserpassword(e.target.value) }} placeholder='Password' type="password" /> <br />
                {/* {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>} */}
                <br />

                <button className="btn btn-success" onClick={login}>Login</button> <br />
                <p>Not have an account ? <span onClick={openSignup}>Signup</span></p>
            </section>
            <div onClick={closePopup} ref={props.ref1} className="popup-bg"></div>


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