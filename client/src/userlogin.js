import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Userlogin = () => {

    const [usermobile, setusermobile] = useState("");
    const [error, setError] = useState("");
    const handleChange = (e) => {
        const value = e.target.value;
        const regex = /^[6-9]\d{9}$/; // Indian mobile numbers start with 6-9 and have 10 digits

        // Allow only digits
        if (!/^\d*$/.test(value)) {
            setError("Only numeric values are allowed");
            return;
        }

        // Validate length and pattern
        if (value.length > 10) {
            setError("Mobile number must not exceed 10 digits");
        } else if (value && !regex.test(value)) {
            setError("Invalid mobile number");
        } else {
            setError(""); // Clear error if valid
        }

        setusermobile(value);
    };
    return (
        <>
            <div className="login-container">
                <section className='login-box'>
                    <h3>Login</h3>
                    <label >Mobile</label> <br />
                    <input maxLength={10} value={usermobile}  onChange={handleChange} type="number" placeholder="967XXXX678" /> <br />{error && <span style={{ color: "red" }}>{error}</span>} <br />
                    <label >Password</label> <br />
                    <input type="password" placeholder="Password" /> <br /> <br />
                    <button>Login</button> <br /> <br />
                    <p>Don't have an account? <Link to="/usersignup">Signup</Link></p>
                </section>
            </div>
        </>
    )
}

export default Userlogin