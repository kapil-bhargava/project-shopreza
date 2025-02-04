import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebars/Sidebar';
import { useCookies } from 'react-cookie';
import Validate from '../../Validate';

const Delboy = () => {
    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();

    const form = useRef();
    const formBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [editMode, setEditMode] = useState(false);

    // Employee form fields
    const [name, setName] = useState("");
    const [empType, setEmpType] = useState("");
    const [mobile, setMobile] = useState("");
    const [adhar, setAdhar] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [address, setAddress] = useState("");
    const [joinDate, setJoindate] = useState("");
    const [dob, setDOB] = useState("");
    const [pan, setPan] = useState("");
    const [boyId, setBoyId] = useState("");
    const [empData, setEmpData] = useState([]);


    const [stores, setStores] = useState([]);

    const [storeId, setStoreId] = useState("");

    const closeAddEmployee = () => {
        form.current.style.display = "none";
        formBg.current.style.display = "none";
        setEditMode(false);
        // emptyFields();
    }
    const openEmployeeForm = () => {
        form.current.style.display = "block";
        formBg.current.style.display = "block";

    }

    // save employee form 
    const saveDelBoy = async () => {
        const re = await fetch(`${process.env.REACT_APP_URL}/delboyapi.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // storeid: cookie.empStoreId,
                storeid: cookie2.adminCookie2,
                mobile: mobile,
                name: name,
                aadharno: adhar,
                email: email,
                gender: gender,
                address: address,
                joindate: joinDate,
                panno: pan,
                dob: dob
            })
        })
        const data = await re.json();
        if (data.response === "Saved") {
            alert(data.Response);
            getEmployees();
            closeAddEmployee();
         

        }
        else {
            alert(data.Response);
        }
    }

    // adding new employee 
    const updateDelBoy = async () => {
        try {
            loaderLoading.current.style.display = "block"
            const re = await fetch(`${process.env.REACT_APP_URL}/delboyapi.php`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    boyid: boyId,
                    mobile: mobile,
                    name: name,
                    aadharno: adhar,
                    email: email,
                    gender: gender,
                    address: address,
                    joindate: joinDate,
                    panno: pan,
                    dob: dob
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
    // const getEmployees = async () => {
        
    //     // var et = "";
    //     var et = "storeid="+cookie.empStoreId;
    //     alert(et);

    //     // if(cookie.adminCookie!==null){
    //     //     et = "admin&storeid="+cookie2.adminCookie2;
    //     // }
    //     // else{
    //     //     et = "etype=manager&mobile="+cookie.empCookie;
    //     // }
    //     // alert(et);
    //     try {
    //         loaderLoading.current.style.display = "block"
    //         const re = await fetch(`${process.env.REACT_APP_URL}/delboyapi.php?${et}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         const data = await re.json();
    //         // console.log(data);
    //         loaderLoading.current.style.display = "none"
    //         setEmpData(data);
    //     }
    //     catch (error) {
    //         console.error(error);
    //         loaderLoading.current.style.display = "none"
    //     }
    // }

    const getEmployees = async () => {
        var et = "etype=Delivery Agent&storeid="+cookie2.adminCookie2;
        // var et = "etype=Delivery Agent&storeid="+cookie.empStoreId;

        alert(et);
        try {
            loaderLoading.current.style.display = "block"
            const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php?${et}&`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            console.log(data);
            loaderLoading.current.style.display = "none"
            setEmpData(data);
        }
        catch (error) {
            console.error(error);
            loaderLoading.current.style.display = "none"
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
    const getSingleEmp = async (boyid) => {
        setEditMode(true);
        setBoyId(boyid);
        loaderLoading.current.style.display = "block";
        const re = await fetch(`${process.env.REACT_APP_URL}/delboyapi.php`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                boyid: boyid
            })
        })
        const data = await re.json();
        console.log(data);
        loaderLoading.current.style.display = "none";
        setName(data[0].name);
        setMobile(data[0].mobile);
        setAdhar(data[0].aadharno);
        setEmail(data[0].email);
        setGender(data[0].gender);
        setAddress(data[0].address);
        setJoindate(data[0].joindate);
        setPan(data[0].panno);
        setDOB(data[0].dob);
        openEmployeeForm();
    }

    // delete employee 
    const deleteEmp = async (boyid) => {
        alert(boyid)
        if (window.confirm('Are you sure you want to delete this Employee ?')) {
            const re = await fetch(`${process.env.REACT_APP_URL}/delboyapi.php`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    boyid: boyid
                })
            })
            const data = await re.json();
            console.log(data);
            // emptyFields();
            getEmployees();
        }
    }


    const emptyFields = () => {
        setName('');
        setDOB('');
        setMobile('');
        setAdhar('');
        setEmail('');
        setGender('Male');
        setAddress('');
        setJoindate('');
        setPan('');
        setStoreId('');
        closeAddEmployee();
    }




    useEffect(() => {
        //getStores();
      //  getEmployees();

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
                                <th>Address</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>DOB</th>
                                <th>Adhar No.</th>
                                <th>PAN No.</th>
                                <th>Join Date</th>
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
                                            <td>{employee.address}</td>
                                            <td>{employee.mobile}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.dob}</td>
                                            <td>{employee.aadharno}</td>
                                            <td>{employee.panno}</td>
                                            <td>{employee.joindate}</td>
                                            <td>
                                                <i onClick={() => { getSingleEmp(employee.boyid) }} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                                <i onClick={() => { deleteEmp(employee.boyid) }} className="fa fa-trash text-danger"></i>
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


            {/* edit employee form  */}
            <div onClick={emptyFields} className="edit-form-bg" ref={formBg}></div>
            <div ref={form} className="employee-form-container edit-form">
                <h3>
                    {
                        editMode ? "Edit Employee" : "Add New Employee"
                    }
                </h3>
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
                                type="text"
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
                                {/* <option value={(gender).toLocaleLowerCase()==="male" ? "male" : "female"}>{gender==="male" ? gender : "female"}</option> */}
                                {/* <option value={gender==="female" ? gender : "male"}>{gender}</option> */}
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
                </div>

                <button type="submit" onClick={
                    editMode ? updateDelBoy : saveDelBoy
                }>
                    {
                        editMode ? "Update Employee" : "Add Employee"
                    }
                </button>
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