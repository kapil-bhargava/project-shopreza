import React, { useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

const Userlogin = (props) => {

    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();
    const [cookieAdd, createcookieAdd, removecookieAdd] = useCookies();
    const [usermobile, setusermobile] = useState("")
    const loginPopup = useRef()
    const popupBg = useRef()
    const signupPopup = useRef()
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const [confirmuserpassword, setconfirmuserpassword] = useState("");
    const [userpassword, setuserpassword] = useState("");

    const [spid, setspid] = useState("");
    const [error, setError] = useState("");

    // useStates for signUp data 

    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setconfirmPasswordError] = useState("");
    const [username, setusername] = useState()
    const [userGender, setUserGender] = useState();
    const [address, setAddress] = useState("");


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
            
            setAddress(data.address);
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
                createcookie("address", data.address)
                // window.location.reload();
                
                closePopup();

            }
            else {
                alert("Invalid Mobile or Password")
            }
        }
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


    // for login up back button 
    const goBack = () => {
        props.ref.current.classList.remove("active-popup");
        signupPopup.current.classList.add("active-popup");
    }
    // for sign up back button 
    const goBackToLogin = () => {
        props.ref.current.classList.add("active-popup");
        signupPopup.current.classList.remove("active-popup");

    }

    // opening login and signup popups 
    const openSignup = () => {
        props.ref.current.classList.remove("active-popup");
        signupPopup.current.classList.add("active-popup");
    }
    const openLogin = () => {
        props.ref.current.classList.add("active-popup");
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
        else if (userpassword !== confirmuserpassword) {
            setconfirmPasswordError("Password do not match");
        }
        else {
            alert(userGender)
            const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, mobile: usermobile, password: userpassword, gender: userGender, address: address})
            });
            const data = await re.json();
            console.log(data);
            if (data.response === "Saved") {

                props.ref.current.classList.add('active-popup');
                signupPopup.current.classList.remove('active-popup');
            }
            else {
                alert(data.response)
            }
        }

    }




    const login = () => {
        if (cookie["sp"] == null) {
            loginValidation()
        }
        else {
            alert("Already logged in")
        }

    }
    // const goBack = () => {
    //     loginPopup.current.style.display = "none";
    // }

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
        signupPopup.current.classList.remove("active-popup");
        props.ref1.current.classList.remove("active-popupBg");
    }


    

    return (
        <>
            <section ref={props.ref} className="login-popup-container">
                <i onClick={goBack} className="fa-solid fa-arrow-left"></i>
                <h4>Login</h4>
                <label  >Enter Mobile Number</label>
                <input value={usermobile} onChange={mobileChange} placeholder='9158XXXX45' type="number" /> 
                {/* {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>} */}
                {/* <br /> */}
                <label  >Enter Password</label>
                <input onChange={(e) => { setuserpassword(e.target.value) }} placeholder='Password' type="password" />
                {/* {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>} */}
                {/* <br /> */}

                <button className="btn btn-success" onClick={login}>Login</button> <br />
                <p>Not have an account ? <span onClick={openSignup}>Signup</span></p>
            </section>
            <div onClick={closePopup} ref={props.ref1} className="popup-bg"></div>

            {/* sign up popup  */}
            <section ref={signupPopup} className="login-popup-container sp">
                <i onClick={goBackToLogin} className="fa-solid fa-arrow-left"></i>
                <h4>SignUp</h4>
                <label  >Enter Name</label>
                <input value={username} onChange={nameChange} placeholder='Your Name' type="name" /> 
                {nameError && <span style={{ color: "red", fontSize: "12px" }}>{nameError}</span>}
                <br />
                <label  >Enter Mobile Number</label>
                <input value={usermobile} onChange={mobileChange} placeholder='915468XXXX' type="number" /> 
                {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>}
                {/* <br /> */}
                <label  >Enter Address</label>
                <textarea value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder='Address here'></textarea> 
                {/* <label>Gender</label> */}
                <select onChange={(e) => { setUserGender(e.target.value) }} className='employee-type-signup'>
                    <option value="female">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
                <label  >Enter Password</label>
                <input onChange={signUpPassword} placeholder='Password' type="password" />
                {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>}
                <br />
                <label  >Confirm Password</label>
                <input onChange={signUpConfirmPassword} placeholder='Password' type="password" /> 
                {confirmPasswordError && <span style={{ color: "red", fontSize: "12px" }}>{confirmPasswordError}</span>}
                <br />

                <button className="btn btn-warning" onClick={signUp}>SignUp</button> <br />
                <p>Already have an account ? <span onClick={openLogin}>Login</span></p>
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