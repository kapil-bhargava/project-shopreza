import React, { useEffect, useRef, useState } from 'react'
import SideBar from './admincommon'
import { useNavigate, useParams } from 'react-router-dom';

const Newemployee = () => {
    const { mob } = useParams();
    const signupref = useRef();
    const form = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();


    const jump = useNavigate();
    const [name, setName] = useState();
    const [status, setStatus] = useState();
    const [storeId, setStoreId] = useState();
    const [empType, setEmpType] = useState();
    const [mobile, setMobile] = useState();
    const [adhar, setAdhar] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState("Male");
    const [address, setAddress] = useState();
    const [father, setFather] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [altMobile, setAltMobile] = useState();

    useEffect(() => {
        signup();
    }, []);

    const signup = async () => {
        loaderLoading.current.style.display = "block";
        const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobileno: mob
            })
        });
        const data = await re.json();
        //signupref.current.style.display = 'none';
        loaderLoading.current.style.display = "none";
        form.current.style.display = "block";
        setMobile(data[0].mobileno);
        setEmpType(data[0].emptype)
        setStatus(data[0].status)
        setStoreId(data[0].storeid)
        // console.log(data);


        // console.log(data);
    }

    // Employee details form function 
    const submit = async (state) => {
        // validation
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // submit data to the server
        loaderLoading.current.style.display = "block";
        const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobileno: mobile,
                name: name,
                aadharno: adhar,
                email: email,
                gender: gender,
                address: address,
                fathername: father,
                emptype: empType,
                password: password,
                storeid: storeId,
                status: status,
                othercontactno: altMobile
            })
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none";
        // console.log(data);
        if (data.response === "Saved") {
            alert("Employee saved successfully");
            jump("/emplogin")
        } else {
            alert("Failed to save employee");
        }
        // jump("/employee")
    }

    return (
        <>

            {/* signup  */}
            {/* <section ref={signupref} className="signup-popup-container active-popup">
                <i onClick={goBack} className="fa-solid fa-arrow-left"></i>
                <h4>Please Signup</h4> <br />
                <label  >Enter Mobile Number</label>
                <input onChange={(e) => { setMobile(e.target.value) }} placeholder='9158XXXX45' type="number" /> <br /> <br />
                {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>}
                <button className="btn btn-success" onClick={signup} >Signup</button> <br />
            </section> */}

            {/* employee form  */}
            <div ref={form} className="new-employee">
                <div className="employee-form-container">
                    <h3>New Employee Details</h3>
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
                                <label>Employee Number</label>
                                <input
                                    type="text"
                                    disabled
                                    value={mobile}
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
                        </div>
                        <div className="input-pair">

                            <div>
                                <label htmlFor="employee-password">Password</label>
                                <input
                                    type="password"
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
                                    name="employee-password"
                                    placeholder="Enter Password"
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-pair">
                            <div>
                                <label>Employee Status</label>
                                <select onChange={(e) => { setEmpType(e.target.value) }} disabled >
                                    <option value="active">{status}</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="employee-type">Employee Type</label>
                                <select onChange={(e) => { setEmpType(e.target.value) }} disabled id="employee-type" name="employee-type">
                                    <option value="distributor">{empType}</option>
                                    <option value="manager">Manager</option>
                                    <option value="delivery-agent">Delivery Agent</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button type="submit" onClick={submit}>Submit</button>
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

export default Newemployee