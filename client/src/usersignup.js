import React from 'react'
import Header from './common/header'
import { Link } from 'react-router-dom'

const Usersignup = () => {
  return (
    <>
      <div className="login-container">
        <section className='login-box'>
          <h3>Signup</h3>
          <label >Name</label> <br />
          <input type="text" placeholder="Name" /> <br /> <br />
          <label >Email</label> <br />
          <input type="text" placeholder="Email" /> <br /> <br />
          <label >Password</label> <br />
          <input type="text" placeholder="Password" /> <br /> <br />
          <label >Confirm Password</label> <br />
          <input type="password" placeholder="Confirm password" /> <br /> <br />
          <button>Signup</button> <br /> <br />
          <p>Already account? <Link to="/userlogin">Login</Link></p>
        </section>
      </div>
    </>
  )
}

export default Usersignup