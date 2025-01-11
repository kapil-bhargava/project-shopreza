import React, { useEffect, useRef, useState } from 'react'
import SideBar from './admincommon'
import { Link, useNavigate } from 'react-router-dom';

const Employee = () => {
    const jump = useNavigate();
    const [signUpData, setSignUpData] = useState([]);

    const employeeForm = useRef();
    const employeeFormBg = useRef();

    const closeAddEmployee = () => {
        employeeForm.current.style.display = "none";
        employeeFormBg.current.style.display = "none";
    }
    const addEmployee = () => {
        employeeForm.current.style.display = "block";
        employeeFormBg.current.style.display = "block";
    }
    const signupEmployee = () => {
        jump("/newemployee")
    }

    // const getSignUpData = async () => {
    //     const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     const data = await re.json();
    //     setSignUpData(data)
    // }

    // useEffect(() => {
    //     getSignUpData();
    // }, [])

    return (
        <>
            {/* <div className="sidebar-main"> */}
            <SideBar />
            <div className="new-employee-main">
                <div className="add-c-div">
                    {/* <Link to="/newemployee"> */}
                    <button tpe="submit" onClick={addEmployee}>Add Employee</button>
                    {/* </Link> */}
                </div>

                <div className="table-responsive table-employee">
                    <table>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Photo</th>
                                <th>Employee Name</th>
                                <th>Address</th>
                                <th>Mobile No</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Father Name</th>
                                <th>Status</th>
                                <th>Employee Type</th>
                                <th>Referral Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                employeeData.map((employee, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={employee.photo} alt="Employee Photo" /></td>
                            <td>{employee.name}</td>
                            <td>{employee.address}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.email}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.fatherName}</td>
                            <td>{employee.status}</td>
                            <td>{employee.type}</td>
                            <td>{employee.refCode}</td>
                        </tr>
                    );
                })
            } */}

                            <tr>
                                <td>S. No.</td>
                                <td>Photo</td>
                                <td>Employee Name</td>
                                <td>Address</td>
                                <td>Mobile No</td>
                                <td>Email</td>
                                <td>Gender</td>
                                <td>Fatder Name</td>
                                <td>Status</td>
                                <td>Employee Type</td>
                                <td>Referral Code</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            sign up form for employee
            <div ref={employeeForm} className="add-customer-form">
                <h2>Add New Employee</h2>
                <form>
                    <div className="form-group">
                        <label>Mobile</label>
                        <input placeholder='Enter Mobile' type="number" id="customer-name" name="customer-name" required />
                    </div>
                    <div className="form-group">
                        <div>
                            <label htmlFor="employee-type">Employee Type</label>
                            <select id="employee-type" name="employee-type" className='employee-type-signup'>
                                <option value="distributor">Distributor</option>
                                <option value="manager">Manager</option>
                                <option value="delivery-agent">Delivery Agent</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="customer-phone">Store id</label>
                        <input placeholder='Store Id' type="tel" id="customer-phone" name="customer-phone" />
                    </div>
                    <div className="form-group">
                        <button onClick={signupEmployee}>Sigup</button>
                    </div>
                </form>
            </div>
            <div ref={employeeFormBg} onClick={closeAddEmployee} className="c-bg"></div>

            {/* </div> */}
        </>
    )
}

export default Employee