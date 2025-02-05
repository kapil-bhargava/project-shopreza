import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarDeliveryboy, SideBarEmp, SideBarManager } from './admincommon'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Adminsidebar from './sidebars/Adminsidebar';
import Deliveryboysidebar from './sidebars/Deliveryboysidebar';
import Managersidebar from './sidebars/Managersidebar';
import Distributorsidebar from './sidebars/Distributorsidebar';
import Sidebar from './sidebars/Sidebar';

const Customer = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderLoading = useRef();
    const loaderWaiting = useRef();

    const [signUpData, setSignUpData] = useState([]);
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
        console.log("umobile  "+mobile)
        console.log("storeid  "+cookie.storeid)
        console.log("utype  "+cookie.utype)
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: mobile,
                storeid: cookie.storeid,
                remark: cookie.uname
                // address
            })
        })
        const data = await re.json();
        console.log(data);
        loaderLoading.current.style.display = "none";
        if (data.response === "Saved") {
            closeAddCustomer();
            getSignUpData();
        } else {
            alert(data.response);
        }
    }

    const getSignUpData = async () => {
        var et = "";
            et = cookie.storeid;
        loaderLoading.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php?storeid=" + et, {
                // const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            console.log(data)
            loaderLoading.current.style.display = "none";
            setSignUpData(data)
        }
        catch (error) {
            alert(error);
            loaderLoading.current.style.display = "none"
        }
    }


    useEffect(() => {

        
            getSignUpData();
        
    }, [])

    return (
        <>

            <Sidebar />

            <div className="new-employee-main">
                <div className="add-c-div">
                    <button onClick={openAddCustomer}>Add Customer</button>
                </div>
                <div ref={customerFormBg} onClick={closeAddCustomer} className="c-bg"></div>
                <div ref={customerForm} className="add-customer-form">
                    <h2>Add New Customer</h2>
                    <div className="form-group">
                        <label>Customer Mobile</label>
                        <input onChange={(e) => { setMobile(e.target.value) }} placeholder='Customer Mobile' type="text" id="customer-name" name="customer-name" required />
                    </div>
                    <div className="form-group">
                        <button onClick={addCustomer}>Add Customer</button>
                    </div>
                </div>
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Remark</th>

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
                                            <td>{x.address}</td>
                                            <td>{x.status}</td>
                                            <td>{x.remark}</td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>


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

export default Customer