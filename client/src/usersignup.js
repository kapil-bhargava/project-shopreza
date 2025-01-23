import React, { useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

const Usersignup = () => {

  const [username, setusername] = useState()
  const [usermobile, setusermobile] = useState()
  const [userpassword, setuserpassword] = useState()
  const [confirmuserpassword, setconfirmuserpassword] = useState()
  // const [confirmuserpassword, setconfirmuserpassword] = useState(
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState();
  const [signUpPassword, setSignUpPassword] = useState();
  const loginPopup = useRef()
  const popupBg = useRef()
  const signupPopup = useRef()
  const [userGender, setUserGender] = useState();

  const [nameError, setNameError] = useState();
  const [mobileError, setMobileError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [confirmPasswordError, setconfirmPasswordError] = useState();

  const [spid, setspid] = useState();

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
  const openLogin = ()=>{

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
        body: JSON.stringify({ name: username, mobile: usermobile, password: userpassword, gender: userGender })
      });
      const data = await re.json();
      // console.log(data);
      if (data.response === "Saved") {

        loginPopup.current.classList.add('active-popup');
        signupPopup.current.classList.remove('active-popup');
      }
      else {
        alert(data.response)
      }
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
    setuserpassword(e.target.value)
  }
 

  return (
    <>
      <section ref={signupPopup} className="login-popup-container sp">
        {/* <i onClick={goBackToLogin} className="fa-solid fa-arrow-left"></i> */}
        <h4>SignUp</h4>
        <label  >Enter Name</label>
        <input value={username} onChange={nameChange} placeholder='Your Name' type="name" /> <br />
        {nameError && <span style={{ color: "red", fontSize: "12px" }}>{nameError}</span>}
        <br />
        <label  >Enter Mobile Number</label>
        <input value={usermobile} onChange={mobileChange} placeholder='915468XXXX' type="number" /> <br />
        {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>}
        <br />
        <label>Gender</label>
        <select onChange={(e) => { setUserGender(e.target.value) }} className='employee-type-signup'>
          <option style={{ textAlign: 'center' }} value="female">-- Select Gender --</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <label  >Enter Password</label>
        <input onChange={signUpPassword} placeholder='Password' type="password" /> <br />
        {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>}
        <br />
        <label  >Confirm Password</label>
        <input onChange={signUpConfirmPassword} placeholder='Password' type="password" /> <br />
        {confirmPasswordError && <span style={{ color: "red", fontSize: "12px" }}>{confirmPasswordError}</span>}
        <br />

        <button className="btn btn-warning" onClick={signUp}>SignUp</button> <br />
        <p>Already have an account ? <span onClick={openLogin}>Login</span></p>
      </section>
      <div ref={popupBg} className="popup-bg"></div>
    </>
  )
}

export default Usersignup