import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebars/Sidebar';

const Delboy = () => {

    const form = useRef();
    const formBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [name, setName] = useState("");
    const [empType, setEmpType] = useState("");
    const [mobile, setMobile] = useState("");
    const [adhar, setAdhar] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [address, setAddress] = useState("");
    const [joinDate, setJoindate] = useState("");
    const [status, setStatus] = useState("");
    const [dob, setDOB] = useState("");
    var st = ["active", "inactive"];
    var type = ["Delivery Agent", "Manager", "Distributor"]
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pan, setPan] = useState("");

    const jump = useNavigate();
    const [signUpData, setSignUpData] = useState([]);

    const [stores, setStores] = useState([]);
    const [empData, setEmpData] = useState([]);
    const [singleEmpData, setSingleEmpData] = useState([]);

    const [empMobile, setEmpMobile] = useState("");
    const [storeId, setStoreId] = useState("");

    const employeeForm = useRef();
    const employeeFormBg = useRef();

    const closeAddEmployee = () => {
        form.current.style.display = "none";
        formBg.current.style.display = "none";
    }
    const openEmployeeForm = () => {
        form.current.style.display = "block";
        formBg.current.style.display = "block";
    }


    // adding new employee 
    const addEmployee = async () => {
        try {
            loaderLoading.current.style.display = "block"
            const re = await fetch(`${process.env.REACT_APP_URL}/delboyapi.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobileno: empMobile,
                    storeid: storeId,
                    emptype: empType
                })
            })
            const data = await re.json();
            alert(data.Response);
            getEmployees();
            loaderLoading.current.style.display = "none"
            closeAddEmployee();
        }
        catch (error) {
            console.error(error);
            alert("Failed to add employee");
            loaderLoading.current.style.display = "none"
        }
    }

    // get all employee data 
    const getEmployees = async () => {
        try {
            loaderLoading.current.style.display = "block"
            const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            loaderLoading.current.style.display = "none"
            setEmpData(data);
        }
        catch (error) {
            console.error(error);
            // loaderLoading.current.style.display = "none"
        }
    }

    // getting store 
    const getStores = async () => {
        const re = await fetch(`${process.env.REACT_APP_URL}/storeapi.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        setStores(data);
    }

    // getting single Emp Data 
    const getSingleEmp = async (mobile) => {
        loaderLoading.current.style.display = "block";
        const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobileno: mobile
            })
        })
        const data = await re.json();
        // console.log(data);
        loaderLoading.current.style.display = "none";
        setName(data[0].name);
        setEmpType(data[0].emptype);
        setMobile(data[0].mobileno);
        setAdhar(data[0].aadharno);
        setEmail(data[0].email);
        setGender(data[0].gender);
        setAddress(data[0].address);
        setJoindate(data[0].fathername);
        setPan(data[0].othercontactno);
        setEmpMobile(mobile);
        setStatus(data[0].status);
        setStoreId(data[0].storeid);
        form.current.style.display = "block";
        formBg.current.style.display = "block";
    }

    // delete employee 
    const deleteEmp = async (mobile) => {
        alert(mobile)
        if (window.confirm('Are you sure you want to delete this Employee ?')) {
            const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: mobile
                })
            })
            const data = await re.json();
            // console.log(data);
            // emptyFields();
            getEmployees();
        }
    }


    const emptyFields = () => {
        setName('');
        setEmpType('');
        setMobile('');
        setAdhar('');
        setEmail('');
        setGender('');
        setAddress('');
        setJoindate('');
        setPan('');
        setEmpMobile('');
        setStatus('');
        setStoreId('');
        form.current.style.display = "none";
        formBg.current.style.display = "none";
        getEmployees();
    }


    // update employee form 
    const update = async () => {

        const re = await fetch(`${process.env.REACT_APP_URL}/validateempapi.php`, {
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
                joindate: joinDate,
                panno: setPan,
                emptype: empType,
                status: status,
                storeid: storeId
            })
        })
        const data = await re.json();
        if (data.response === "Saved") {
            alert("Employee updated successfully");
            form.current.style.display = "none";
            getEmployees();
            emptyFields();

        }
        else {
            alert("Failed to update employee");
        }
    }


    useEffect(() => {
        getStores();
        getEmployees();

    }, [])

    return (
        <>

            <Sidebar />
            {/* <div className="sidebar-main"> */}

            <div className="new-employee-main">
                <div className="add-c-div">
                    {/* <Link to="/newemployee"> */}
                    <button tpe="submit" onClick={openEmployeeForm}>Add New</button>
                    {/* </Link> */}
                </div>

                <div className="table-responsive table-employee">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Name</th>
                                <th>Store</th>
                                <th>Address</th>
                                <th>Mobile</th>
                                <th>Alt Mob</th>
                                <th>Email</th>
                                <th>Father&nbsp;Name</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Action</th>
                                {/* <th>Referral Code</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                empData.map((employee, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            {/* <td><img src={employee.photo} alt="Employee Photo" /></td> */}
                                            <td>{employee.name + "(" + employee.gender + ")"}</td>
                                            <td>{employee.storename}</td>
                                            <td>{employee.address}</td>
                                            <td>{employee.mobileno}</td>
                                            <td>{employee.othercontactno}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.fathername}</td>
                                            <td>{employee.status}</td>
                                            <td>{employee.emptype}</td>
                                            <td>
                                                <i onClick={() => { getSingleEmp(employee.mobileno) }} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                                <i onClick={() => { deleteEmp(employee.mobileno) }} className="fa fa-trash text-danger"></i>
                                            </td>
                                            {/* <td>{employee.refCode}</td> */}
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            {/* sign up form for employee */}
            <div ref={form} className="new-employee">
                <div className="employee-form-container">
                    <h3>Employee Details</h3>
                    <div className="form-group">
                        <div className="input-pair">
                            <div>
                                <label htmlFor="employee-name">Name</label>
                                <input
                                    placeholder="Employee Name"
                                    type="text"
                                    onChange={(e) => { setName(e.target.value) }}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="employee-aadhar">Aadhar</label>
                                <input
                                    placeholder="Employee Aadhar"
                                    type="text"
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
                                    type="text"
                                    onChange={(e) => { setPan(e.target.value) }}
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
                                    onChange={(e) => { setJoindate(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="input-pair">

                            {/* <div>
                                <label htmlFor="employee-password">Password</label>
                                <input
                                    type="password"
                                    name="employee-password"
                                    placeholder="Enter Password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    required
                                />
                            </div> */}
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

                    <button type="submit" onClick={addEmployee}>Add</button>
                </div>
            </div>
            <div ref={employeeFormBg} onClick={closeAddEmployee} className="c-bg"></div>

            {/* </div> */}

            {/* edit employee form  */}
            <div onClick={emptyFields} className="edit-form-bg" ref={formBg}></div>
            <div ref={form} className="employee-form-container edit-form">
                <h3>Edit Employee Details</h3>
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
                                value={name}
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
                                value={adhar}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-pair">
                        <div>
                            <label>Employee Mobile</label>
                            <input
                                type="text"
                                placeholder='Emplyee Mobile'
                                value={mobile}
                                onChange={(e) => { setMobile(e.target.value) }}
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-alt-phone">PAN No</label>
                            <input
                                placeholder="Alternate Mobile Number"
                                type="number"
                                id="employee-alt-phone"
                                value={pan}
                                name="employee-alt-phone"
                                onChange={(e) => { setPan(e.target.value) }}
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
                                value={email}
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
                                value={address}
                                onChange={(e) => { setAddress(e.target.value) }}
                            ></textarea>
                        </div>


                    </div>

                    <div className="input-pair">
                        <div>
                            <label htmlFor="father-name">DOB</label>
                            <input
                                type='date'
                                value={dob}
                                onChange={(e) => { setDOB(e.target.value) }}
                            />
                        </div>

                        <div>
                            <label>Joining date</label>
                            <input
                                type="date"
                                value={joinDate}
                                onChange={(e) => { setJoindate(e.target.value) }}
                            />
                        </div>
                    </div>

                    <div className="input-pair">
                        <div>
                            <label>Employee Status</label>
                            <select onChange={(e) => { setStatus(e.target.value) }}>
                                {st.map((x, index) => {
                                    return (
                                        x == status ? <option key={index} selected value={x}>{x}</option> : <option key={index} value={x}>{x}</option>

                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <label>Employee Type</label>
                            <select onChange={(e) => { setEmpType(e.target.value) }}>
                                {type.map((x, index) => {
                                    return (
                                        x === empType ? <option key={index} selected value={x}>{x}</option> : <option key={index} value={x}>{x}</option>

                                    )
                                })}

                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" onClick={update}>Update</button>
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

export default Delboy