import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';
import Sidebar from './sidebars/Sidebar';

const Category = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderLoading = useRef();
    const loaderWaiting = useRef();

    const res = useRef();
    const confirmPopup = useRef();
    const confirmPopupBg = useRef();
    const [response, setresponse] = useState("");
    const picPopup = useRef();
    const [catId, setCatId] = useState();
    const [skeletonLoading, setSkeletonLoading] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);

    const [storedata, setstoreData] = useState([]);
    const [catData, setCatData] = useState([]);

    const [category, setCategory] = useState("");
    const [categoryPic, setCategoryPic] = useState();
    const [cookie, createcookie, removecookie] = useCookies();

    const openAddCategory = () => {
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }
    const closeAddCategory = () => {
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
        setCategory('')
        setIsEditMode(false)
    }

    const showRes = (re) => {
        setresponse(re);
        res.current.classList.add("active-response-popup")
        setTimeout(() => {
            res.current.classList.remove("active-response-popup")
            // showRes();
        }, 2000);
    }

    const openConfirmPopup = (catid) => {
        setCatId(catid);
        confirmPopup.current.classList.add("active-confirmation-popup");
        confirmPopupBg.current.classList.add("active-confirmationBg");
    }
    const closeConfirmPopup = () => {
        confirmPopup.current.classList.remove("active-confirmation-popup");
        confirmPopupBg.current.classList.remove("active-confirmationBg");
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
    }

    // adding new category function 
    // const addCategory = async () => {
    //     loaderLoading.current.style.display = "block";
    //     const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             catname: category,
    //             storeid: cookie.storeid
    //         })
    //     })
    //     const data = await re.json();
    //     showRes(data.Response);
    //     console.log(data)

    //     loaderLoading.current.style.display = "none";
    //     getCategory();

    // }


    const [newItemId, setNewItemId] = useState(null);

    const addCategory = async () => {
        loaderLoading.current.style.display = "block";

        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                catname: category,
                storeid: cookie.storeid
            })
        });

        const data = await re.json();
        showRes(data.Response);


        loaderLoading.current.style.display = "none";

        // Fetch categories after adding
        await getCategory();


    };


    // pic popup 
    const openPicForm = (x) => {
        picPopup.current.style.display = "block";
        setCatId(x)

    }
    const closePicPopup = () => {
        picPopup.current.style.display = "none";
    }

    // upload cat pic 
    const uploadPic = async () => {
        const formData = new FormData();
        formData.append('pic', categoryPic);
        formData.append('catid', catId);

        loaderWaiting.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/uploadcatpic.php", {
            method: 'POST',
            body: formData,
        })
        const data = await re.json();
        showRes(data.Response);
        getCategory();
        closePicPopup();
        loaderWaiting.current.style.display = "none";
    }



    // getCategory
    const getCategory = async () => {
        setDel(false);
        //  //cookie2.adminCookie2)
        try {
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie.storeid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            // Set newly added category ID (assuming data contains 'id' of the new category)
            if (!del) {
                if (data[data.length - 1].catid) {
                    setNewItemId(data[data.length - 1].catid);
                    setTimeout(() => setNewItemId(null), 1000);
                }
                // Remove the animation class after delay
            }
            // console.log(data[data.length-1].catid)
            if (data.length <= 0) {
                setSkeletonLoading(true);
            }
            else {
                setSkeletonLoading(false);
            }
            setCatData(data);
            loaderLoading.current.style.display = "none";
        }
        catch (e) {
            alert(e.message)
        }
    }


    const [del, setDel] = useState(false);

    // delete category 
    const deleteCategory = async () => {
        setDel(true);
        setNewItemId(catId);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                catid: catId
            })
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none";
        showRes(data.Response);
        closeConfirmPopup();
        await getCategory();
    }

    const openEditCategory = async (catid) => {
        setCatId(catid)
        setIsEditMode(true);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                catid: catid,

            })
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none";
        setCategory(data[0].catname);
        openAddCategory();

    }

    // update category 
    const updateCategory = async () => {
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                catid: catId,
                catname: category,
                storeid: cookie.storeid,
            })
        })
        const data = await re.json();
        // alert(data.Response)
        loaderLoading.current.style.display = "none";
        // if (data.response === "Updated") {
        showRes(data.Response);
        closeAddCategory();
        getCategory()
        // }
        closeAddCategory();
        getCategory()

    }


    useEffect(() => {
        getStores();
        getCategory();
    }, [])


    return (
        <>
            <Sidebar />
            <div className="new-employee-main">
                <div className="add-c-div">

                    <button onClick={openAddCategory}>Add Category</button>
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
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    catData.map((cat, index) => {
                                        return (
                                            <tr key={index} className={`tbrow ${newItemId === cat.catid ? (del ? "del-row" : "new-row") : ""}`}>
                                                <td>{index + 1}</td>
                                                <td> <img onClick={() => { openPicForm(cat.catid) }} src={cat.pic} alt={cat.pic} /> {cat.catname}</td>
                                                <td>
                                                    <i onClick={() => { openEditCategory(cat.catid) }} className="fa fa-edit text-success"></i>&nbsp;&nbsp;&nbsp;
                                                    <i onClick={() => { openConfirmPopup(catData[index].catid) }} className="fa fa-trash text-danger"></i>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    )}

                            </tbody>
                        </table>)
                    }
                </div>

                <div ref={customerFormBg} className="c-bg"></div>
                <div ref={customerForm} className="add-customer-form">
                    <div className="cross-entity">
                        <i className="fas fa-times" onClick={closeAddCategory}></i>
                    </div>
                    <h2>{isEditMode ? "Edit Category" : "Add New category"}</h2>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter category name' type="text" id="customer-name" name="customer-name" required />
                    </div>
                    <div className="form-group">
                        <button onClick={isEditMode ? updateCategory : addCategory}>
                            {isEditMode ? "Update" : "Add"} Category
                        </button>
                    </div>
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
                    <input onChange={(e) => { setCategoryPic(e.target.files[0]) }} type="file" />
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

            {/* Response Popup  */}
            <div ref={res} className="response-popup">
                {/* <p>{responseMessage}</p> */}
                <p>  {response}</p>
                {/* <button onClick={closeResponsePopup}>Close</button> */}
            </div>

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
                        <button onClick={deleteCategory} className="btn btn-danger btn-sm">Delete</button>
                        <button onClick={closeConfirmPopup} className="btn btn-light border btn-sm">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category