import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Customer = () => {
    const [signUpData, setSignUpData] = useState([]);
    const customerForm = useRef();
    const customerFormBg = useRef();
    const [mobile, setMobile] = useState();
    const [cookie, createcookie, removecookie] = useCookies();
    const jump = useNavigate();
    // const [address, setAddress] = useState();


    const openAddCustomer = () => {
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }
    const closeAddCustomer = () => {
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
    }

    const addCustomer = async () => {
        alert(cookie.empCookie);
        const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: mobile,
                empmobile: cookie.empCookie
                // address
            })
        })
        const data = await re.json();
        if (data.response === "Saved") {
            closeAddCustomer();
            getSignUpData();
        } else {
            alert(data.response);
        }
    }

    const getSignUpData = async () => {
        var et="";
        if(cookie.adminCookie!=null){
                et="admin";
        }
        else{
            et="emp&mobile="+cookie.empCookie;
        }
        const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php?etype="+et, {
        // const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        // console.log(re)
        const data = await re.json();
        console.log(data)
        setSignUpData(data)
    }
    useEffect(() => {
        getSignUpData();
        if(cookie["empCookie"]==null && cookie["adminCookie"]==null){
            jump("/emplogin")
        }
    }, [])

    return (
        <>
            {/* <div className="sidebar-main"> */}
            
           {cookie.adminCookie!=null?<SideBar />:<SideBarEmp />} 
            <div className="add-c-div">
                <button tpe="submit" onClick={openAddCustomer}>Add Customer</button>
            </div>
            <div ref={customerFormBg} onClick={closeAddCustomer} className="c-bg"></div>
            <div ref={customerForm} className="add-customer-form">
                <h2>Add New Customer</h2>
                    <div className="form-group">
                        <label>Customer Mobile</label>
                        <input onChange={(e) => { setMobile(e.target.value) }} placeholder='Customer Mobile' type="text" id="customer-name" name="customer-name" required />
                    </div>
                    {/* <div className="form-group">
                        <label for="customer-email">Mobile</label>
                        <input onChange={(e) => { setName(e.target.value) }} placeholder='Customer Mobile' type="email" id="customer-email" name="customer-email" required />
                    </div> */}
                    {/* <div className="form-group">
                        <label for="customer-phone">Address</label>
                        <input onChange={(e) => { setName(e.target.value) }} placeholder='Customer Address' type="tel" id="customer-phone" name="customer-phone" />
                    </div> */}
                    <div className="form-group">
                        <button onClick={addCustomer}>Add Customer</button>
                    </div>
            </div>
            <div className="table-responsive table-customer">
                <table>
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Status</th>
                            <th>Ref Code</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            signUpData.map((x, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td> <img src={x.pic} alt={x.pic} /> {x.name}</td>
                                        {/* <td></td> */}
                                        <td>{x.mobile}</td>
                                        <td>{x.status}</td>
                                        <td>{x.vcode}</td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* </div> */}
        </>
    )
}

export default Customer