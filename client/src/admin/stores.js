import React, { useEffect, useRef, useState } from 'react'
import SideBar from './admincommon'
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebars/Sidebar';

const Store = () => {
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const jump = useNavigate();
    const [storeData, setstoreData] = useState([]);
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const [storeId, setStoreId] = useState();

    const [isEditMode, setIsEditMode] = useState(false);

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
        loaderLoading.current.style.display = "block"
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
        const data = await re.json();
        loaderLoading.current.style.display = "none"
        getStores();
        setStoreName('')
        setStoreAddress('')
        setLongitude('')
        setLatitude('')
    }

    // getting store 
    const getStores = async () => {
        loaderLoading.current.style.display = "block"
        const re = await fetch(`${process.env.REACT_APP_URL}/storeapi.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none"
        setstoreData(data);
        // getStores();
    }

    // delete store 
    const deleteStore = async (storeid) => {
        loaderLoading.current.style.display = "block"
        if (window.confirm('Are you sure you want to delete this store ?')) {
            const re = await fetch(`${process.env.REACT_APP_URL}/storeapi.php`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storeid: storeid
                })
            })
            const data = await re.json();
            loaderLoading.current.style.display = "none"
            // console.log(data)
            getStores();
        }
    }

    // getting single store data 
    const getSingleStore = async (storeid) => {
        loaderLoading.current.style.display = "block"
        setStoreId(storeid)
        setIsEditMode(true);
        const re = await fetch(`${process.env.REACT_APP_URL}/storeapi.php`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeid: storeid
            })
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none"
        // console.log(data)
        setStoreName(data.storename)
        setStoreAddress(data.address)
        setLongitude(data.longtude)
        setLatitude(data.latitude)
        addEmployee()
    }

    // updating store 
    const updateStore = async () => {
        loaderLoading.current.style.display = "block"
        const re = await fetch(`${process.env.REACT_APP_URL}/storeapi.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeid: storeData[0].storeid,
                storename: storeName,
                address: storeAddress,
                longitude: longitude,
                latitude: latitude
            })
        });
        const data = await re.json();
        // console.log(data)
        loaderLoading.current.style.display = "none"
        getStores();
        setIsEditMode(false);
    }


    useEffect(() => {
        getStores();
    }, [])


    return (
        <>
            <Sidebar />
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
                                <th>Action</th>
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
                                            <td>
                                                <i onClick={() => { getSingleStore(x.storeid) }} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                                <i onClick={() => { deleteStore(x.storeid) }} className="fa fa-trash text-danger"></i>
                                            </td>
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
                <h2> {isEditMode ? "Update Store" : "Add Store"}</h2>
                <div className="form-group">
                    <label>Store Name</label>
                    <input value={storeName} onChange={(e) => { setStoreName(e.target.value) }} placeholder='Enter Store Name' type="text" />
                </div>
                <div className="form-group">
                    <label>Store Address</label>
                    <input value={storeAddress} onChange={(e) => { setStoreAddress(e.target.value) }} placeholder='Enter Store Address' type="text" />

                </div>
                <div className="form-group">
                    <label>Latitute</label>
                    <input value={latitude} onChange={(e) => { setLatitude(e.target.value) }} placeholder='Latitute' type="text" />
                </div>
                <div className="form-group">
                    <label>Longitude</label>
                    <input value={longitude} onChange={(e) => { setLongitude(e.target.value) }} placeholder='Longitute' type="text" />
                </div>
                <div className="form-group">
                    <button onClick={isEditMode ? updateStore : addStore}>
                        {isEditMode ? "Update Store" : "Add Store"}
                    </button>

                </div>
            </div>
            <div ref={employeeFormBg} onClick={closeAddEmployee} className="c-bg"></div>


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

export default Store