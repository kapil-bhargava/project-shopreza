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
    const [mobile, setMobile] = useState("");
    const [cookie, createcookie, removecookie] = useCookies();
    const jump = useNavigate();
    // const [address, setAddress] = useState("");


    const openAddCustomer = () => {
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }
    const closeAddCustomer = () => {
        setEditMode(false)
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
    }

    const [username, setUsername] = useState("");
    const [userGender, setUserGender] = useState("");
    const [address, setAddress] = useState("");


    const addCustomer = async () => {
        alert(userGender);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                gender: userGender,
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

    // const re =  fetch(process.env.REACT_APP_URL + "/signupapi.php", {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ name: username, mobile: usermobile, password: userpassword, gender: userGender })
    //   });
    //   const data =  re.json();
    //   // console.log(data);
    //   if (data.response === "Saved") {

    //     loginPopup.current.classList.add('active-popup');
    //     signupPopup.current.classList.remove('active-popup');
    //   }
    //   else {
    //     alert(data.response)
    //   }

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
    const [editMode, setEditMode] = useState(false);

    // opening edit modal and getting single customer data 
    const openEditCustomer = async (mob) => {
        setEditMode(true);
        alert(mob)
        loaderWaiting.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: mob
                })
            })
            const data = await re.json();
            console.log(data);
            loaderWaiting.current.style.display = "none";
            setUsername(data[0].name);
            setUserGender(data[0].gender);
            setAddress(data[0].address);
            openAddCustomer();
        }
        catch (error) {
            alert(error);
            loaderWaiting.current.style.display = "none";
        }
    }

    // deleting the customer 
    const deleteCustomer = async (mob) => {
        alert(mob);
        loaderWaiting.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mob: mob
                })
            })
            const data = await re.json();
            console.log(data);
            loaderWaiting.current.style.display = "none";
            getSignUpData();
        }
        catch (error) {
            alert(error);
            loaderWaiting.current.style.display = "none";
        }
    }

    const update = () => {
        alert("update")
    }
    // // updating the customer data
    // const updateCustomer = async () => {
    //     loaderWaiting.current.style.display = "block";
    //     try {
    //         const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 id: customerId,
    //                 name: username,
    //                 gender: userGender,
    //                 // address: address
    //             })
    //         })
    //         const data = await re.json();
    //         console.log(data);
    //         loaderWaiting.current.style.display = "none";
    //         getSignUpData();
    //         closeAddCustomer();
    //     }
    //     catch (error) {
    //         alert(error);
    //         loaderWaiting.current.style.display = "none";
    //     }
    // }



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
                <div ref={customerFormBg} className="c-bg"></div>
                {/* =========   Customer Form Modal ===== */}
                <div ref={customerForm} className="add-customer-form">
                    <div className="cross-entity">
                        <i className="fas fa-times" onClick={closeAddCustomer}></i>
                    </div>
                    <h2>
                        {
                            editMode ? "Edit Customer" : "Add New Customer"
                        }
                    </h2>
                    <div className="form-group">
                        <label>Name</label>
                        <input value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Customer Name' type="text" id="customer-name" name="customer-name" required />
                    </div>
                    <div className="form-group">
                        <label>Mobile</label>
                        <input value={mobile} onChange={(e) => { setMobile(e.target.value) }} placeholder='Customer Mobile' type="number" id="customer-name" name="customer-name" required />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <input value={userGender} onChange={(e) => { setUserGender(e.target.value) }} placeholder='Customer Gender' type="text" id="customer-name" name="customer-name" required />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder='Customer Address' type="text" id="customer-name" name="customer-name" required ></textarea>
                    </div>
                    <div className="form-group">
                        <button onClick={
                            editMode ? update : addCustomer
                        }>
                            {
                                editMode ? "Update" : "Add"
                            }
                        </button>
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
                                <th>#</th>
                                <th>#</th>

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
                                            <td>
                                                <i onClick={() => { openEditCustomer(x.mobile) }} className="fa fa-edit"></i>
                                            </td>
                                            <td>
                                                <i onClick={() => { deleteCustomer(x.mobile) }} className="fa fa-trash"></i>
                                            </td>

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