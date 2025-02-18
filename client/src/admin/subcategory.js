import React, { useEffect, useRef, useState } from 'react'
import SideBar, { ConfirmPopup, SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';
import Sidebar from './sidebars/Sidebar';

const Subcategory = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [isEditMode, setIsEditMode] = useState(false);
    const [skeletonLoading, setSkeletonLoading] = useState(false);


    const [subcategory, setSubcategory] = useState([]);
    const [subcategoryPic, setSubcategoryPic] = useState();
    const [subcategoryName, setSubcategoryName] = useState();
    const [catId, setCatId] = useState();
    const [catData, setCatData] = useState([]);
    const [category, setCategory] = useState();
    const [cookie, createcookie, removecookie] = useCookies();

    // const [categoryData, setCategoryData] = useState([]);
    const openAddSubcategory = () => {
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
        // alert(catId)
        // getCategory();
    }
    const closeAddSubcategory = () => {
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
        setIsEditMode(false);
        setSubcategoryName('');
    }

    // const [response, setResponse] = useState("");
    // const confirmPopupRef = useRef();

    // const showRes = () => {
    //     confirmPopupRef.current.classList.add("active-response-popup");
    //     setTimeout(() => {
    //         confirmPopupRef.current.classList.remove("active-response-popup");
    //     }, 2000);
    // };



    // adding new subcategory function 
    const addSubcategory = async () => {
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/subcategoryapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                catid: catId,
                subcatname: subcategoryName
            })
        })
        const data = await re.json();
        if (data.Response === "Saved") {
            // alert(data.Response);
            // setResponse(data.Response);
            closeAddSubcategory();
            getSubCategory(catId)
        }
        loaderLoading.current.style.display = 'none';
    }

    const picPopup = useRef();

    // pic popup 
    const openPicForm = (x) => {
        picPopup.current.style.display = "block";
        setSubcatId(x)

    }
    const closePicPopup = () => {
        picPopup.current.style.display = "none";
    }
    // uploading subcategory pic 
    const uploadPic = async () => {
        loaderLoading.current.style.display = "block";
        const formData = new FormData();
        formData.append('pic', subcategoryPic);
        formData.append('subcatid', subcatId);

        const re = await fetch(process.env.REACT_APP_URL + "/uploadsubcatpic.php", {
            method: 'POST',
            body: formData
        })
        const data = await re.json();
        alert(data.Response);
        getSubCategory(catId);
        closePicPopup();


        loaderLoading.current.style.display = 'none';
    }

    // get subcategory 
    const getSubCategory = async (catid) => {
        setCatId(catid);
        // loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/subcategoryapi.php?cid=" + catid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        // loaderLoading.current.style.display = "none";
        setSubcategory(data);
    }

    // getCategory
    const getCategory = async () => {
        try {
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie.storeid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            getSubCategory(data[0].catid)
            loaderLoading.current.style.display = "none";
            setCatData(data);
        }
        catch (error) {
            setSkeletonLoading(true);
            loaderLoading.current.style.display = "none";
        }
    }

    // delete subcategory
    const deleteSubcategory = async (subcatid) => {
        // alert(catId);
        loaderLoading.current.style.display = "block";
        if (window.confirm("Are you sure you want to delete")) {
            const re = await fetch(process.env.REACT_APP_URL + "/subcategoryapi.php", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subcatid: subcatid
                })
            })
            const data = await re.json();
            if (data.response == "Deleted") {
                alert(data.response);
            }
            getSubCategory(catId);
        }
        loaderLoading.current.style.display = "none";
    }


    const [subcatId, setSubcatId] = useState();
    // getting single subcategory data 
    const openEditSubcategory = async (subcatid) => {
        setSubcatId(subcatid);
        setIsEditMode(true);
        loaderLoading.current.style.display = "block";
        const re = await fetch(`${process.env.REACT_APP_URL}/subcategoryapi.php`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subcatid: subcatid,
            })
        });
        const data = await re.json();
        // console.log(data);
        loaderLoading.current.style.display = 'none';
        setSubcategoryName(data[0].subcatname);
        // alert(subcatid);
        openAddSubcategory()
    }

    
    // updating subcategory 
    const updateSubcategory = async () => {
        // alert(subcatId)
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/subcategoryapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subcatid: subcatId,
                subcatname: subcategoryName
            })
        })
        const data = await re.json();
        // console.log(data);
        if (data.Response === "Updated") {
            // setResponse(data.Response);
            closeAddSubcategory();
            loaderLoading.current.style.display = 'none';
            setIsEditMode(false);
            getSubCategory(catId)
        }
    }

    useEffect(() => {
        getCategory();
    }, [])


    return (
        <>
             {/* <ConfirmPopup ref={confirmPopupRef} resp={response} showRes={showRes} /> */}
            <Sidebar />
            <div className="new-employee-main">
                <div className="add-c-div selection">
                    <div style={{ width: "200px" }} className="form-group">
                        <label htmlFor="subcatrgory">Select Category</label>
                        <select value={catId} onChange={(e) => { getSubCategory(e.target.value) }}>
                            {catData.map((cat, index) => {
                                return (
                                    <option key={index} value={cat.catid}>{cat.catname}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button onClick={openAddSubcategory}>Add Subcategory</button>
                </div>

                <div className="table-responsive table-employee">
                    {skeletonLoading ? (
                        <span className="skeleton-loader">
                            <h1>No Data</h1>
                        </span>) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Subcategory Name</th>
                                    {/* <th>Price</th>
                                <th>Offer Price</th>
                                <th>Des</th> */}
                                    <th>Action</th>
                                    {/* <th>Referral Code</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subcategory.map((sub, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img onClick={() => { openPicForm(sub.subcatid) }} src={sub.pic} alt={sub.pic} /> {sub.subcatname}</td>

                                                <td>
                                                    <i onClick={() => { openEditSubcategory(sub.subcatid) }} className="fa fa-edit text-success"></i> &nbsp;&nbsp;&nbsp;
                                                    <i onClick={() => { deleteSubcategory(sub.subcatid) }} className="fa fa-trash text-danger"></i>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>)}
                </div>
            </div>


            {/*  subcategory Modal  */}

            <div ref={customerFormBg} className="c-bg"></div>
            <div ref={customerForm} className="add-customer-form">
                <div className="cross-entity">
                    <i className="fas fa-times" onClick={closeAddSubcategory} ></i>
                </div>
                <h2>{isEditMode ? "Edit Subcaegory" : "Add New Subcategory"}</h2>
                <div className="form-group">
                    <select value={catId} onChange={(e) => { setCatId(e.target.value) }}>
                        <option value="">Select Category</option>
                        {catData.map((cat, index) => {
                            return (
                                <option key={index} value={cat.catid}>{cat.catname}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label for="subcategory name" >Subcategory Name</label>
                    <input value={subcategoryName} onChange={(e) => { setSubcategoryName(e.target.value) }} placeholder='Enter subcategory name' type="text" required />
                </div>
                <div className="form-group">
                    <input type="file" onChange={(e) => { setSubcategoryPic(e.target.files[0]) }} />
                </div>

                <div className="form-group">
                    <button onClick={isEditMode ? updateSubcategory : addSubcategory}>{isEditMode ? "Update Subcategory" : "Add Subcategory"}</button>
                </div>
            </div>

            {/* loader  */}
            <div ref={loaderLoading} className="loading">
                <p>Loading....</p>
            </div>

            {/* wait  */}
            <div ref={loaderWaiting} className="loading">
                <p>Please wait....</p>
            </div>

            {/* picPopup */}
            <div ref={picPopup} className="pic-popup">
                <h5>Select Pic</h5>
                <div className="input-pair">
                    <input onChange={(e) => { setSubcategoryPic(e.target.files[0]) }} type="file" />
                    <button className='btn btn-primary' onClick={uploadPic}>Upload</button>
                    <div onClick={closePicPopup} className="pic-popup-close">
                        &times;
                    </div>
                </div>
                {/* <br />
                <div className="main-pic-container">
                    {
                        picData.map((x, i) => {
                            return (
                                <div key={i} className="pic-card">
                                    <img style={{ cursor: "pointer" }} src={x.pic} alt={x.pic} onClick={() => { picOption(x.picname, x.unitid, x.picid) }} />
                                </div>
                            )
                        })
                    }
                </div> */}

            </div>
        </>
    )
}

export default Subcategory