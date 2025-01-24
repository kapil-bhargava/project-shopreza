import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';

const Category = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderLoading = useRef();
    const loaderWaiting = useRef();
    const [catId, setCatId] = useState();

    const [isEditMode, setIsEditMode] = useState(false);

    const [storeid, setStoreid] = useState();
    const [storedata, setstoreData] = useState([]);
    const [catData, setCatData] = useState([]);

    const [category, setCategory] = useState();
    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();
    // const [categoryData, setCategoryData] = useState([]);
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
        // console.log(data);
        setstoreData(data);
        // getStores();
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
        // console.log(data);
        loaderLoading.current.style.display = "none";
        getCategory();
        closeAddCategory();
        // }

    }



    // getCategory
    const getCategory = async () => {
        // console.log(cookie2.adminCookie2)
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie2.adminCookie2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        // console.log(data);
        // console.log(data[0])
        setCatData(data);
        loaderLoading.current.style.display = "none";
    }

    // delete category 

    const deleteCategory = async (catid) => {
        alert(catid)
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
            // console.log(data);
            loaderLoading.current.style.display = "none";
            getCategory()
            closeAddCategory();
            // }
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
            {cookie.adminCookie != null ? <SideBar /> : <SideBarEmp />}
            <div className="new-employee-main">
                <div className="add-c-div">
                    <button onClick={openAddCategory}>Add Category</button>
                </div>

                <div className="table-responsive table-employee">
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
                                            <td>{cat.catname}</td>
                                            {/* <td>{cat.price}</td>
                                            <td>{cat.offerprice}</td>
                                            <td>{cat.description}</td> */}
                                            <td>
                                                <i onClick={() => { openEditCategory(cat.catid) }} className="fa fa-edit text-success"></i>&nbsp;&nbsp;&nbsp;
                                                <i onClick={() => { deleteCategory(catData[index].catid) }} className="fa fa-trash text-danger"></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
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
        </>
    )
}

export default Category