import React, { useEffect, useRef, useState } from 'react'
import SideBar from './admincommon'
import { useNavigate } from 'react-router-dom';

const Store = () => {
    const jump = useNavigate();
    const [storeData, setstoreData] = useState([]);
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

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

    // adding new store 
    const addStore = async () => {
        const re = await fetch(`${process.env.REACT_APP_URL}/storeapi.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storename: storeName,
                address: storeAddress,
                longitude: longitude,
                latitude: latitude
            })
        });
        alert("j")
        const data = await re.json();
        console.log(data)

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
        setstoreData(data);
        getStores()
    }

    useEffect(() => {
        getStores();
    }, [])


    return (
        <>
            <SideBar />
            <div className="new-employee-main">
                <div className="add-c-div">
                    {/* <Link to="/newemployee"> */}
                    <button tpe="submit" onClick={addEmployee}>Add Store</button>
                    {/* </Link> */}
                </div>

                <div className="table-responsive table-employee">
                    <table>
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Store Id</th>
                                <th>Store Name</th>
                                <th>Store Address</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                storeData.map((x, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{x.storeid}</td>
                                            <td>{x.storename}</td>
                                            <td>{x.address}</td>
                                            <td>{x.latitude}</td>
                                            <td>{x.longtude}</td>
                                            <td>{x.status}</td>
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
                <h2>Add New Store</h2>
                {/* <form> */}
                <div className="form-group">
                    <label>Store Name</label>
                    <input onChange={(e) => { setStoreName(e.target.value) }} placeholder='Enter Store Name' type="text" />
                </div>
                <div className="form-group">
                    <label>Store Address</label>
                    <input onChange={(e) => { setStoreAddress(e.target.value) }} placeholder='Enter Store Address' type="text" />

                </div>
                <div className="form-group">
                    <label>Latitute</label>
                    <input onChange={(e) => { setLatitude(e.target.value) }} placeholder='Latitute' type="text" />
                </div>
                <div className="form-group">
                    <label>Longitude</label>
                    <input onChange={(e) => { setLongitude(e.target.value) }} placeholder='Longitute' type="text" />
                </div>
                <div className="form-group">
                    <button onClick={addStore}>Add Store</button>
                </div>
                {/* </form> */}
            </div>
            <div ref={employeeFormBg} onClick={closeAddEmployee} className="c-bg"></div>

        </>
    )
}

export default Store