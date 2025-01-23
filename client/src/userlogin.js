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
                body: JSON.stringify({ mobile: usermobile, password: userpassword, storeid: "1" })
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
                createcookie2("sp2", data.storeid, {
                    path: "/", // Cookie is available on all routes
                    maxAge: 3600 * 24 * 30 * 12 * 10, // 10 years in seconds
                    secure: true, // Use for HTTPS
                });

                // createcookie2("sp2", storeid)
                loginPopup.current.classList.remove('active-popup');
                popupBg.current.classList.remove("active-popupBg");
                // loginPopup.current.classList.remove('active-popup');              

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
            <div ref={props.ref} className="popup-bg"></div>

        </>
    )
}
export default Userlogin