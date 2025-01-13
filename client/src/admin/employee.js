import React, { useEffect, useRef, useState } from 'react'
import SideBar from './admincommon'
import { Link, useNavigate } from 'react-router-dom';

const Employee = () => {
    const jump = useNavigate();
    const [signUpData, setSignUpData] = useState([]);

    const [stores, setStores] = useState([]);
    const [empData, setEmpData] = useState([]);

    const [empMobile, setEmpMobile] = useState();
    const [storeId, setStoreId] = useState();
    const [empType, setEmpType] = useState();

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
        console.log(data);
        closeAddEmployee();
        // getEmployees();
    }

    // const signupEmployee = () => {
    //     jump("/newemployee")
    // }

    // get all employee data 
    const getEmployees = async () => {
        const re = await fetch(`${process.env.REACT_APP_URL}/empsignupapi.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        console.table(data);
        setEmpData(data);
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
        console.log(data);
        setStores(data);
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

    useEffect(() => {
        // getStores();
        getEmployees();
    }, [])

    return (
        <>
            {/* <div className="sidebar-main"> */}
            <SideBar />
            <div className="new-employee-main">
                <div className="add-c-div">
                    {/* <Link to="/newemployee"> */}
                    <button tpe="submit" onClick={openEmployeeForm}>Add Employee</button>
                    {/* </Link> */}
                </div>

                <div className="table-responsive table-employee">
                    <table>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Emp Store Id</th>
                                {/* <th>Photo</th> */}
                                {/* <th>Employee Name</th> */}
                                {/* <th>Address</th> */}
                                <th>Mobile No</th>
                                {/* <th>Email</th> */}
                                {/* <th>Gender</th> */}
                                {/* <th>Father Name</th> */}
                                {/* <th>Status</th> */}
                                <th>Employee Type</th>
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
                            {/* <td>{employee.name}</td> */}
                            {/* <td>{employee.name}</td> */}
                            {/* <td>{employee.address}</td> */}
                            {/* <td>{employee.mobile}</td> */}
                            {/* <td>{employee.email}</td> */}
                            {/* <td>{employee.gender}</td> */}
                            {/* <td>{employee.fatherName}</td> */}
                            {/* <td>{employee.status}</td> */}
                            {/* <td>{employee.type}</td> */}
                            {/* <td>{employee.refCode}</td> */}
                        </tr>
                    );
                })
            }

                            {/* <tr>
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
                            </tr> */}
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
                        <input onChange={(e) => { setEmpMobile(e.target.value) }} placeholder='Enter Mobile' type="number" required />
                    </div>
                    <div className="form-group">
                        <div>
                            <label htmlFor="employee-type">Employee Type</label>
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
                            <label htmlFor="employee-type">Assign Store</label>
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
                </form>
            </div>
            <div ref={employeeFormBg} onClick={closeAddEmployee} className="c-bg"></div>

            {/* </div> */}
        </>
    )
}

export default Employee