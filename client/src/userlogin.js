import React from 'react'
import { Link } from 'react-router-dom'

const Userlogin = () => {
    return (
        <>
            <div className="login-container">
                <section className='login-box'>
                    <h3>Login</h3>
                    <label >Email</label> <br />
                    <input type="text" placeholder="Username" /> <br /> <br />
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