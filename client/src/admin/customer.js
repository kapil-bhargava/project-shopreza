import React, { useEffect, useRef, useState } from 'react'
import SideBar from './admincommon'

const Customer = () => {
    const [signUpData, setSignUpData] = useState([]);
    const customerForm = useRef();
    const customerFormBg = useRef();
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    // const [address, setAddress] = useState();


    const addCustomer = () => {
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }
    const closeAddCustomer = () => {
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
    }

    const getSignUpData = async () => {
        const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        setSignUpData(data)
    }

    useEffect(() => {
        getSignUpData();
    }, [])

    return (
        <>
            {/* <div className="sidebar-main"> */}
            <SideBar />
            <div className="add-c-div">
                <button tpe="submit" onClick={addCustomer}>Add Customer</button>
            </div>
            <div ref={customerFormBg} onClick={closeAddCustomer} className="c-bg"></div>
            <div ref={customerForm} className="add-customer-form">
                <h2>Add New Customer</h2>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input onChange={(e) => { setName(e.target.value) }} placeholder='Customer Name' type="text" id="customer-name" name="customer-name" required />
                    </div>
                    <div className="form-group">
                        <label for="customer-email">Mobile</label>
                        <input onChange={(e) => { setName(e.target.value) }} placeholder='Customer Mobile' type="email" id="customer-email" name="customer-email" required />
                    </div>
                    {/* <div className="form-group">
                        <label for="customer-phone">Address</label>
                        <input onChange={(e) => { setName(e.target.value) }} placeholder='Customer Address' type="tel" id="customer-phone" name="customer-phone" />
                    </div> */}
                    <div className="form-group">
                        <button type="submit">Add Customer</button>
                    </div>
                </form>
            </div>
            <div className="table-responsive table-customer">
                <table>
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>Pic</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Verification Code</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            signUpData.map((x, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td> <img src={x.pic} alt={x.pic} /></td>
                                        <td>{x.name}</td>
                                        <td>lat : {x.lat} <br /> lon : {x.lon}</td>
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