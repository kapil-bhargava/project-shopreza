import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './sidebars/Sidebar';
import { useCookies } from 'react-cookie';
import Validate from '../Validate';

const Employee = () => {

//    var et=["Manager","Distribut0r","Delivery"]

    const editForm = useRef();
    const editFormBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [name, setName] = useState("");
    const [empType, setEmpType] = useState("");
    const [mobile, setMobile] = useState("");
    const [adhar, setAdhar] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [father, setFather] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    var st = ["active", "inactive"];
    var type = ["Delivery Agent", "Manager", "Distributor"]
    const [confirmPassword, setConfirmPassword] = useState("");
    const [altMobile, setAltMobile] = useState("");

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
        employeeForm.current.style.display = "none";
        employeeFormBg.current.style.display = "none";
    }
    const openEmployeeForm = () => {
        employeeForm.current.style.display = "block";
        employeeFormBg.current.style.display = "block";
    }


    // adding new employee 
    const addEmployee = async () => {
        try {
            loaderLoading.current.style.display = "block"
            const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php`, {
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
            // loaderLoading.current.style.display = "none"
        }
    }

    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();
    // get all employee data 
    const getEmployees = async (ett) => {
        setEmpType(ett);
        var url = ett +"&storeid="+ cookie2.storeid;       
        try {
            loaderLoading.current.style.display = "block"
            const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php?etype=${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            console.log(data)
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
        setFather(data[0].fathername);
        setAltMobile(data[0].othercontactno);
        setEmpMobile(mobile);
        setStatus(data[0].status);
        setStoreId(data[0].storeid);
        editForm.current.style.display = "block";
        editFormBg.current.style.display = "block";
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
        setFather('');
        setAltMobile('');
        setEmpMobile('');
        setStatus('');
        setStoreId('');
        editForm.current.style.display = "none";
        editFormBg.current.style.display = "none";
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
                fathername: father,
                othercontactno: altMobile,
                emptype: empType,
                status: status,
                storeid: storeId
            })
        })
        const data = await re.json();
        if (data.response === "Saved") {
            alert("Employee updated successfully");
            editForm.current.style.display = "none";
            getEmployees();
            emptyFields();

        }
        else {
            alert("Failed to update employee");
        }
    }


    useEffect(() => {
       // Validate();
        getStores();
        // getEmployees();

    }, [])

    return (
        <>
        
            {/* <div className="sidebar-main"> */}
            <Sidebar />
            <div className="new-employee-main">
                <div className="add-c-div justify-content-between align-items-center">
                    <div className="form-group">
                        {/* <label className='bg-danger'>Select Employee Type</label> */}
                        {cookie.emptype=="manager"?
                        <select onChange={(e) => { getEmployees(e.target.value) }} id="employee-type" name="employee-type" className='employee-type-signup'>
                        <option value="Distributor">Distributor</option>
                        <option value="Delivery Agent">Delivery Agent</option>
                    </select>
                        :
                        <select onChange={(e) => { getEmployees(e.target.value) }} id="employee-type" name="employee-type" className='employee-type-signup'>
                            <option value="Distributor">Distributor</option>
                            <option value="Manager">Manager</option>
                            <option value="Delivery Agent">Delivery Agent</option>
                        </select>
                        }
                        
                    </div>
                    {/* <Link to="/newemployee"> */}
                    <button tpe="submit" onClick={openEmployeeForm}>Add Employee</button>
                    {/* </Link> */}
                    <h1>{cookie.emptype}</h1>

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
            <div ref={employeeForm} className="add-customer-form">
                <h2>Add New Employee</h2>
                <div className="form-group">
                    <label>Mobile</label>
                    <input onChange={(e) => { setEmpMobile(e.target.value) }} placeholder='Enter Mobile' type="number" required />
                </div>
                <div className="form-group">
                    <div>
                        <label>Employee Type</label>
                        <select onChange={(e) => { setEmpType(e.target.value) }} id="employee-type" name="employee-type" className='employee-type-signup'>
                            <option style={{ textAlign: 'center' }} value="distributor">-- Select Employee Type --</option>
                            <option value="Distributor">Distributor</option>
                            <option value="Manager">Manager</option>
                            <option value="Delivery Agent">Delivery Agent</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <label>Assign Store</label>
                        <select onChange={(e) => { setStoreId(e.target.value) }} className='employee-type-signup'>
                            <option style={{ textAlign: 'center' }} value="distributor">-- Select Store --</option>
                            {
                                stores.map((store, index) => {
                                    return (
                                        <option key={index} value={store.storeid}>{store.storename}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <button onClick={addEmployee}>Add</button>
                </div>
            </div>
            <div ref={employeeFormBg} onClick={closeAddEmployee} className="c-bg"></div>

            {/* </div> */}

            {/* edit employee form  */}
            <div onClick={emptyFields} className="edit-form-bg" ref={editFormBg}></div>
            <div ref={editForm} className="employee-form-container edit-form">
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
                            <label>Employee Number</label>
                            <input
                                type="text"
                                value={mobile}
                                onChange={(e) => { setMobile(e.target.value) }}
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-alt-phone">Alternate Mobile No</label>
                            <input
                                placeholder="Alternate Mobile Number"
                                type="number"
                                id="employee-alt-phone"
                                value={altMobile}
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
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div>
                            <label htmlFor="employee-gender">Gender</label>
                            <select onChange={(e) => { setGender(e.target.value) }}>
                                <option value={gender}>{gender}</option>
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
                            <label htmlFor="father-name">Father Name</label>
                            <input
                                placeholder="Father's Name"
                                type="text"
                                id="father-name"
                                name="father-name"
                                value={father}
                                onChange={(e) => { setFather(e.target.value) }}
                            />
                        </div>

                        <div>
                            <label>Assign Store</label>
                            <select onChange={(e) => { setStoreId(e.target.value) }}>
                                {/* <option value={store}></option> */}
                                {
                                    stores.map((store, index) => {
                                        return (
                                            <option key={index} value={store.storeid}>{store.storename}</option>
                                        )
                                    })
                                }
                            </select>

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

export default Employee