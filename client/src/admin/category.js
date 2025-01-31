import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';
import Sidebar from './sidebars/Sidebar';

const Category = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderLoading = useRef();
    const loaderWaiting = useRef();
    const picPopup = useRef();
    const [catId, setCatId] = useState();
    const [skeletonLoading, setSkeletonLoading] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);

    const [storeid, setStoreid] = useState();
    const [storedata, setstoreData] = useState([]);
    const [catData, setCatData] = useState([]);

    const [category, setCategory] = useState();
    const [categoryPic, setCategoryPic] = useState();
    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();
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
    const addCategory = async () => {


        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                catname: category,
                // storeid: storeid
                storeid: cookie2.adminCookie2
            })
        })
        const data = await re.json();

        loaderLoading.current.style.display = "none";
        getCategory();
        closeAddCategory();
        // }

    }

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
        console.log(catId)
        const formData = new FormData();
        formData.append('pic', categoryPic);
        formData.append('catid', catId);

        loaderWaiting.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/uploadcatpic.php", {
            method: 'POST',
            body: formData,
        })
        const data = await re.json();
        alert(data.Response);
        getCategory();
        closePicPopup();
        loaderWaiting.current.style.display = "none";
    }



    // getCategory
    const getCategory = async () => {
        //  //cookie2.adminCookie2)
        try {
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie2.adminCookie2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            console.log(data)
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
            console.log("running getCategory catch")
        }
    }

    // delete category 
    const deleteCategory = async (catid) => {
        if (window.confirm('Are you sure')) {
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    catid: catid
                })
            })
            const data = await re.json();
            alert(data.Response);
            loaderLoading.current.style.display = "none";
            getCategory();
            closeAddCategory();
        }
    }

    const openEditCategory = async (catid) => {
        setCatId(catid)
        setIsEditMode(true);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?", {
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
        if (data.response === "Updated") {
            closeAddCategory();
            getCategory()
        }
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
                storeid: cookie2.adminCookie2,
            })
        })
        const data = await re.json();
        alert(data.Response)
        loaderLoading.current.style.display = "none";
        closeAddCategory();
        getCategory()
    }


    useEffect(() => {
        getStores();
        getCategory();
    }, [])


    return (
        <>
            <Sidebar/>
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
                                    {/* <th>Price</th>
                                <th>Offer Price</th>
                                <th>Des</th> */}
                                    <th>Action</th>
                                    {/* <th>Referral Code</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    catData.map((cat, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td> <img onClick={() => { openPicForm(cat.catid) }} src={cat.pic} alt={cat.pic} /> {cat.catname}</td>
                                                {/* <td>{cat.price}</td>
                                            <td>{cat.offerprice}</td>
                                            <td>{cat.description}</td> */}
                                                <td>
                                                    <i onClick={() => { openEditCategory(cat.catid) }} className="fa fa-edit text-success"></i>&nbsp;&nbsp;&nbsp;
                                                    <i onClick={() => { deleteCategory(catData[index].catid) }} className="fa fa-trash text-danger"></i>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    )}

                            </tbody>
                        </table>)
                    }
                </div>

                <div ref={customerFormBg} onClick={closeAddCategory} className="c-bg"></div>
                <div ref={customerForm} className="add-customer-form">
                    <h2>{isEditMode ? "Edit Category" : "Add New category"}</h2>
                    {/* <div className="form-group">
                        <label>Store</label>
                        <select onChange={(e) => { setStoreid(e.target.value) }}>
                            <option value="">Select Store</option>
                            {storedata.map((store, index) => {
                                return (
                                    <option key={index} value={store.storeid}>{store.storename}</option>
                                )
                            })}
                        </select>
                    </div> */}
                    <div className="form-group">
                        <label>Category Name</label>
                        <input value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter category name' type="text" id="customer-name" name="customer-name" required />
                    </div>
                    {/* <div className="form-group">
                        <label>Category Pic</label>
                        <input onChange={(e) => { setCategoryPic(e.target.files[0]) }} type='file' required />
                    </div> */}
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
        </>
    )
}

export default Category