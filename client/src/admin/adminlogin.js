import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [stores, setStores] = useState([]);
    const [storeId, setStoreId] = useState();
    const [adminName, setAdminName] = useState();
    const [adminPassword, setAdminPassword] = useState();

    const jump = useNavigate();
    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();


    // getting store 
    const getStores = async () => {
        loaderWaiting.current.style.display = "block"
        const re = await fetch(`${process.env.REACT_APP_URL}/storeapi.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        setStores(data);
        loaderWaiting.current.style.display = "none"
        // console.log(data);
    }

    const login = async () => {
        const re = await fetch(`${process.env.REACT_APP_URL}/validateadminapi.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uname: adminName, password: adminPassword }),
        })
        const data = await re.json();
        // console.log(data);
        if (data.response === "Valid") {
            createcookie('adminCookie', adminName);
            createcookie2('adminCookie2', storeId);

            jump("/dashboard")
        }
        else {
            alert("Invalid User")
        }
    }

    useEffect(() => {
        getStores();
        // if(cookie["adminCookie"]!=null){
        //     jump("/dashboard")
        // }
    }, [])


    return (
        <>
            <section className="login-popup-container active-popup">
                {/* <i onClick={goBack} className="fa-solid fa-arrow-left"></i> */}
                <h4>Admin Login</h4>
                <label  >Enter User Name</label>
                <input onChange={(e) => { setAdminName(e.target.value) }} placeholder='username' type="text" /> <br />
                {/* {mobileError && <span style={{ color: "red", fontSize: "12px" }}>{mobileError}</span>} */}
                <label  >Enter Password</label>
                <input onChange={(e) => { setAdminPassword(e.target.value) }} placeholder='password' type="text" /> <br />
                {/* {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>} */}
                <div className="form-group">
                    <label>Store</label>
                    <select onChange={(e) => { setStoreId(e.target.value) }}>
                        <option value="">Select Store</option>
                        {stores.map((store, index) => {
                            return (
                                <option key={index} value={store.storeid}>{store.storename}</option>
                            )
                        })}
                    </select>
                </div>

                <button className="btn btn-success" onClick={login} >Login</button>
            </section>

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

export default AdminLogin