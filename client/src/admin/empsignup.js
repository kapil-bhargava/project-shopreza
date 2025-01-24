import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Empsignup = () => {
const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [mobile, setmobile] = useState();
    const jump = useNavigate();

    const signup = async () => {
        const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobileno: mobile
            })
        });
        const data = await re.json();
        if (data !== null) {
            jump("/newemployee")
        }
        else{
            alert("Number not registered!");
        }
        // console.log(data);
    }

    return (
        <>
            <section className="signup-popup-container active-popup">
                {/* <i onClick={goBack} className="fa-solid fa-arrow-left"></i> */}
                <h4>Please Signup</h4> <br />
                <label  >Enter Mobile Number</label>
                <input onChange={(e) => { setmobile(e.target.value) }} placeholder='9158XXXX45' type="number" /> <br /> <br />
                {/* {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>} */}
                <button className="btn btn-success" onClick={signup} >Signup</button> <br />
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

export default Empsignup