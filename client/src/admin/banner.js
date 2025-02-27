import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './sidebars/Sidebar';
import { useCookies } from 'react-cookie';

const Banner = () => {
    const [cookie, createcookie, removecookie] = useCookies();
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderLoading = useRef();
    const loaderWaiting = useRef();
    const picPopup = useRef();

    const confirmPopup = useRef();
    const confirmPopupBg = useRef();
    const [isEditMode, setIsEditMode] = useState(false);
    const [del, setDel] = useState(false);
    const [newItemId, setNewItemId] = useState(null);

    const [skeletonLoading, setSkeletonLoading] = useState(false);


    const [festivalName, setFestivalName] = useState("");
    const [type, setType] = useState("Festival");
    const [festivalId, setFestivalId] = useState("");

    const openAddFestival = () => {
        // setIsEditMode(false);
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }
    const closeAddFestival = () => {
        setIsEditMode(false);
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
    }

    // popups 
    const openPicForm = (festivalid) => {
        setFestivalId(festivalid)
        picPopup.current.style.display = "block";

    }
    const closePicPopup = () => {
        picPopup.current.style.display = "none";
    }
    const openConfirmPopup = (festivalid) => {
        setFestivalId(festivalid);
        confirmPopup.current.classList.add("active-confirmation-popup");
        confirmPopupBg.current.classList.add("active-confirmationBg");
    }
    const closeConfirmPopup = () => {
        confirmPopup.current.classList.remove("active-confirmation-popup");
        confirmPopupBg.current.classList.remove("active-confirmationBg");
    }

    // ========= Getting single festival data =================
    const [status, setStatus] = useState("");

    const openEditFestival = async (festivalid) => {
        setFestivalId(festivalid);
        setIsEditMode(true);
        // getting single data using patch method 
        const re = await fetch(`${process.env.REACT_APP_URL}/festivalapi.php`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                festivalid: festivalid
            })
        })
        const data = await re.json();
        setStatus(data[0].status)
        setType(data[0].type)
        setFestivalName(data[0].festivalname)
        console.log(data);

        openAddFestival();
    }

    const [festivalPic, setFestivalPic] = useState("");

    // uploading pic 
    const uploadPic = async () => {
        const formData = new FormData();
        formData.append('pic', festivalPic);
        formData.append('festivalid', festivalId);

        loaderWaiting.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/uploadfestivalpic.php", {
            method: 'POST',
            body: formData,
        })
        const data = await re.json();
        console.log(data);
        // showRes(data.Response);
        getFestival();
        closePicPopup();
        loaderWaiting.current.style.display = "none";
    }


    // adding new festival name 
    const addFestival = async () => {

        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/festivalapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storeid: cookie.storeid,
                title: festivalName,
                type: type
            })
        });

        const data = await re.json();
        console.log(data);
        loaderLoading.current.style.display = "none";
        getFestival();
        closeAddFestival();

    }

    const [festivals, setFestivals] = useState([]);

    const getFestival = async () => {
        setDel(false);
        const re = await fetch(process.env.REACT_APP_URL + "/festivalapi.php?status=all&storeid=" + cookie.storeid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await re.json();
        setFestivals(data);
        // if (!del) {
        //     if (data[data.length - 1].festivalid) {
        //         setNewItemId(data[data.length - 1].festivalid);
        //         setTimeout(() => setNewItemId(null), 1000);
        //     }
        //     // Remove the animation class after delay
        // }
        // console.log(data[data.length-1].festivalid)
        // if (data.length <= 0) {
        //     setSkeletonLoading(true);
        // }
        // else {
        //     setSkeletonLoading(false);
        // }
        console.log(data);
        // setFestivalData(data);
    }

    // DELETE Festival 
    const deleteFestival = async () => {
        alert(festivalId)
        setDel(true);
        setNewItemId(festivalId);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/festivalapi.php", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                festivalid: festivalId
            })
        })
        const data = await re.json();
        console.log(data)
        loaderLoading.current.style.display = "none";
        closeConfirmPopup();
        getFestival();
    }


    // updating festivals data 
    const updateFestival = async () => {
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/festivalapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: status,
                type: type,
                festivalid: festivalId,
                title: festivalName
            })
        })
        const data = await re.json();
        console.log(data);
        loaderLoading.current.style.display = "none";
        setFestivalName("");
        setStatus("")
        setType("");
        getFestival();
        closeAddFestival();
        // setIsEditMode(false);

    }
    const updateFestivalByStatus = async (festivalid,status,festivalname,type) => {
        alert("Hh")
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/festivalapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: status,
                type: type,
                festivalid: festivalid,
                title: festivalname
            })
        })
        const data = await re.json();
        console.log(data);
        loaderLoading.current.style.display = "none";
        setFestivalName("");
        setStatus("")
        setType("");
        getFestival();
        closeAddFestival();
        // setIsEditMode(false);

    }





    useEffect(() => {
        getFestival()
    }, [])
    return (
        <>
            <Sidebar />
            <div className="new-employee-main">
                <div className="add-c-div">
                    <button onClick={openAddFestival}>Add Festival</button>
                </div>



                {/* showing festivals in table  */}
                <div className="table-responsive table-employee ml-5">
                    {skeletonLoading ? (
                        <span className="skeleton-loader">
                            <h1>No Data</h1>
                        </span>) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    festivals.map((x, index) => {
                                        return (
                                            <tr key={index} className={`tbrow ${newItemId === x.festivalid ? (del ? "del-row" : "new-row") : ""}`}>
                                                <td>{index + 1}</td>
                                                <td> <img onClick={() => { openPicForm(x.festivalid) }} src={x.pic} alt={x.pic} /> {x.festivalname}</td>
                                                <td>
                                                    {x.type}
                                                </td>
                                                <td>
                                                    {/* <select value={x.status} selected onChange={(e) => { updateFestivalByStatus(x.festivalid,e.target.value,x.festivalname,x.type) }} className={x.status === "yes" ? "text-light  bg-success" : "text-light  bg-dark"} style={{ width: "50px" }} value={x.status} selected onChange={(e) => { setType(e.target.value) }}>
                                                        <option value="no">no</option>
                                                        <option value="yes">yes</option>
                                                    </select> */}
                                                    {x.status}
                                                </td>
                                                <td>
                                                    <i onClick={() => { openEditFestival(x.festivalid) }} className="fa fa-edit text-success"></i>&nbsp;&nbsp;&nbsp;
                                                    <i onClick={() => { openConfirmPopup(festivals[index].festivalid) }} className="fa fa-trash text-danger"></i>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    )}

                            </tbody>
                        </table>)
                    }
                </div>

                {/* ============ Festival ADD and UPDATE form STARTED ========== */}
                <div ref={customerFormBg} className="c-bg"></div>
                <div ref={customerForm} className="add-customer-form">
                    <div className="cross-entity">
                        <i className="fas fa-times" onClick={closeAddFestival}></i>
                    </div>
                    <h2>{isEditMode ? "Edit Festival" : "Add New Festival"}</h2>
                    <div className="form-group">
                        <label>Festival Name</label>
                        <input value={festivalName} onChange={(e) => { setFestivalName(e.target.value) }} placeholder='Enter Festival Name' type="text" id="customer-name" name="customer-name" required />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select value={type} selected onChange={(e) => { setType(e.target.value) }}>
                            <option value="Festival">Festival</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {
                        isEditMode ? (
                            <div className="form-group">
                                <label>Status</label>
                                <select value={status} selected onChange={(e) => { setStatus(e.target.value) }}>
                                    <option value="no">no</option>
                                    <option value="yes">yes</option>
                                </select>
                                {/* <input type="text" value={status} onChange={(e)=>{setStatus(e.target.value)}} /> */}
                            </div>
                        )
                            :
                            null
                    }

                    <div className="form-group">
                        <button onClick={isEditMode ? updateFestival : addFestival}>
                            {isEditMode ? "Update" : "Add"} Festival
                        </button>
                    </div>
                </div>
            </div>
            {/* ============ Festival ADD and UPDATE form ENDED ========== */}

            {/* ========= picPopup Started========== */}
            <div ref={picPopup} className="pic-popup">
                <h5>Select Pic</h5>
                <div className="input-pair">
                    <input onChange={(e) => { setFestivalPic(e.target.files[0]) }} type="file" />
                    <button className='btn btn-primary' onClick={uploadPic}>Upload</button>
                    <div onClick={closePicPopup} className="pic-popup-close">
                        &times;
                    </div>
                </div>
            </div>
            {/* ========= picPopup Ended========== */}


            {/* Confirm Popup  */}
            <div ref={confirmPopupBg} className="confirmation-popupBg">
                <div ref={confirmPopup} className="confirmation-popup">
                    <div className="cross-confirm-main-div d-flex justify-content-end">
                        <div onClick={closeConfirmPopup} className="cross-confirm-popup-div">
                            <i className="fas fa-times" ></i>
                        </div>
                    </div>
                    <h6 className='text-center'>Are you Sure to Delete ?</h6>
                    <div className="del-btn-div d-flex justify-content-around">
                        <button onClick={deleteFestival} className="btn btn-danger btn-sm">Delete</button>
                        <button onClick={closeConfirmPopup} className="btn btn-light border btn-sm">Cancel</button>
                    </div>
                </div>
            </div>

            {/* Loader  */}
            <div ref={loaderLoading} className="loading">
                <p>Loading....</p>
            </div>
            {/* wait  */}
            <div ref={loaderWaiting} className="loading">
                <p>Please wait....</p>
            </div>



            {/* Response Popup  */}
            {/* <div ref={res} className="response-popup">
                <p>  {response}</p>
            </div> */}
        </>
    )
}

export default Banner