import React, { useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Deliveryboylogin = () => {
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const [mobile, setmobile] = useState();
    const [password, setpassword] = useState();
    const jump = useNavigate();
    const [cookie, createcookie, removecookie] = useCookies();

    const login = async () => {
        // console.log(mobile, password)
        const re = await fetch(`${process.env.REACT_APP_URL}/validateempapi.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile: mobile, password: password }),
        })
        const data = await re.json();
        // console.log(data);
        if (data.response === "Valid") {
            createcookie('deliveryboyCookie', mobile);
            jump("/customers")
        }
        else {
            alert("Invalid User")
        }
    }

    const signup = () => {
        jump("/empsignup")
    }

    return (
        <>
            <section className="login-popup-container active-popup">
                {/* <i onClick={goBack} className="fa-solid fa-arrow-left"></i> */}
                <h4>Delivery Boy Login</h4> <br />
                <label  >Enter Mobile Number</label>
                <input onChange={(e) => { setmobile(e.target.value) }} placeholder='9158XXXX45' type="number" /> <br />
                {/* {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>} */}
                <br />
                <label  >Enter Password</label>
                <input onChange={(e) => { setpassword(e.target.value) }} placeholder='Password' type="password" /> <br />
                {/* {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>} */}
                <br />

                <button className="btn btn-success" onClick={login} >Login</button> <br />
                <p>Not have an account ? <span onClick={signup}>Signup</span></p>
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

export default Deliveryboylogin