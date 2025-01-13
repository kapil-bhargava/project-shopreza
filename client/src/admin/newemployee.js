import React, { useState } from 'react'
import SideBar from './admincommon'
import { useNavigate } from 'react-router-dom';

const Newemployee = () => {
    const jump = useNavigate()
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [adhar, setAdhar] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [address, setAddress] = useState();
    const [father, setFather] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [altMobile, setAltMobile] = useState();

    // Employee details form function 
    const submit = async (state) => {
        // validation
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // submit data to the server
        const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobileno: mobile,  //mobile not updated
                name: name,
                adharno: adhar,
                email: email,
                gender: gender,
                address,
                fahername: father,
                password: password,
                othercontactno: altMobile
            })
        })
        const data = await re.json();
        // if(data.response === "Saved") {
        //     alert("Employee saved successfully");
        // } else {
        //     alert("Failed to save employee");
        // }
        jump("/employee")
    }

    return (
        <>
            <SideBar />
            <div className="new-employee-main">
                <div className="employee-form-container">
                    <h3>New Employee Details</h3>
                    <form>
                        <div className="form-group">
                            <div className="input-pair">
                                <div>
                                    <label htmlFor="employee-name">Name</label>
                                    <input
                                        placeholder="Employee Name"
                                        type="text"
                                        id="employee-name"
                                        name="employee-name"
                                        onChange={(e) => { setName(e.target.value) }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="employee-aadhar">Aadhar</label>
                                    <input
                                        placeholder="Employee Aadhar"
                                        type="text"
                                        id="employee-aadhar"
                                        name="employee-aadhar"
                                        onChange={(e) => { setAdhar(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-pair">
                                <div>
                                    <label>Employee Type</label>
                                    <input
                                        type="text"
                                        disabled
                                        value="9090909099"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="employee-alt-phone">Alternate Mobile No</label>
                                    <input
                                        placeholder="Alternate Mobile Number"
                                        type="number"
                                        id="employee-alt-phone"
                                        name="employee-alt-phone"
                                        onChange={(e) => { setAltMobile(e.target.value) }}
                                    />
                                </div>
                            </div>

                            <div className="input-pair">
                                <div>
                                    <label htmlFor="employee-email">Email</label>
                                    <input
                                        placeholder="Employee Email"
                                        type="email"
                                        id="employee-email"
                                        name="employee-email"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="employee-gender">Gender</label>
                                    <select onChange={(e) => { setGender(e.target.value) }}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>


                            </div>

                            <div className="input-pair">
                                {/* <div>
                                    <label htmlFor="employee-photo">Photo</label>
                                    <input
                                        type="file"
                                        id="employee-photo"
                                        name="employee-photo"
                                        accept="image/*"
                                    />
                                </div> */}
                                <div>
                                    <label htmlFor="employee-address">Address</label>
                                    <textarea
                                        id="employee-address"
                                        name="employee-address"
                                        placeholder="Enter Address"
                                        rows="2"
                                        onChange={(e) => { setAddress(e.target.value) }}
                                    ></textarea>
                                </div>


                            </div>

                            <div className="input-pair">
                                <div>
                                    <label htmlFor="father-name">Father Name</label>
                                    <input
                                        placeholder="Father's Name"
                                        type="text"
                                        id="father-name"
                                        name="father-name"
                                        onChange={(e) => { setFather(e.target.value) }}
                                    />
                                </div>

                                {/* <div>
                                    <label htmlFor="ref-code">Referral Code</label>
                                    <input
                                        placeholder="Referral Code"
                                        type="text"
                                        id="ref-code"
                                        name="ref-code"
                                    />
                                </div> */}
                            </div>
                            <div className="input-pair">

                                <div>
                                    <label htmlFor="employee-password">Password</label>
                                    <input
                                        type="password"
                                        id="employee-password"
                                        name="employee-password"
                                        placeholder="Enter Password"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="employee-password">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="employee-password"
                                        name="employee-password"
                                        placeholder="Enter Password"
                                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-pair">
                                {/* <div>
                                    <label htmlFor="employee-status">Status</label>
                                    <input
                                        type="text"
                                        id="employee-status"
                                        name="employee-status"
                                        placeholder="Status"
                                    />
                                </div> */}

                                <div>
                                    <label>Employee Type</label>
                                    <input
                                        type="text"
                                        disabled
                                        value="Manager"
                                    />

                                </div>
                                {/* <div>
                                    <label htmlFor="employee-type">Employee Type</label>
                                    <select id="employee-type" name="employee-type">
                                        <option value="distributor">Distributor</option>
                                        <option value="manager">Manager</option>
                                        <option value="delivery-agent">Delivery Agent</option>
                                    </select>
                                </div> */}
                            </div>
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Newemployee