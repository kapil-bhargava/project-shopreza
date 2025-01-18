import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';

const Subcategory = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();


    const [subcategory, setSubcategory] = useState([]);
    const [subcategoryName, setSubcategoryName] = useState();
    const [catId, setCatId] = useState();
    const [catData, setCatData] = useState([]);
    const [category, setCategory] = useState();
    const [cookie, createcookie, removecookie] = useCookies();
    const [cookie2, createcookie2, removecookie2] = useCookies();
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
        setSubcategoryName('');
    }
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
            alert(data.Response);
            closeAddSubcategory();
            getSubCategory(catId)
        }
        loaderLoading.current.style.display = 'none';
    }

    // get subcategory 
    const getSubCategory = async (catid) => {
        setCatId(catid);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/subcategoryapi.php?cid=" + catid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none";
        // console.log(data);
        setSubcategory(data);
    }

    // getCategory
    const getCategory = async () => {
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie2.adminCookie2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        getSubCategory(data[1].catid)
        loaderLoading.current.style.display = "none";
        setCatData(data);
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


    // edit subcategory
    const openEditSubcategory = (subcatid) => {
        alert(subcatid);
    }

    useEffect(() => {
        getCategory();

        // alert(catId)
        // if (catId !== null) {
        //     alert(catId)
        //     getSubCategory(catId)
        // }
    }, [])


    return (
        <>
            {cookie.adminCookie != null ? <SideBar /> : <SideBarEmp />}
            <div className="new-employee-main">
                <div className="add-c-div selection">
                    <div style={{ width: "200px" }} className="form-group">
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
                                            <td><img src={sub.pic} alt={sub.pic} /> {sub.subcatname}</td>

                                            <td>
                                                <i onClick={() => { openEditSubcategory(sub.subcatid) }} className="fa fa-edit text-success"></i> &nbsp;&nbsp;&nbsp;
                                                <i onClick={() => { deleteSubcategory(sub.subcatid) }} className="fa fa-trash text-danger"></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            {/* adding subcategory Modal  */}

            <div ref={customerFormBg} onClick={closeAddSubcategory} className="c-bg"></div>
            <div ref={customerForm} className="add-customer-form">
                <h2>Add New Subcategory</h2>
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

                <label>Subcategory Name</label>
                <input value={subcategoryName} onChange={(e) => { setSubcategoryName(e.target.value) }} placeholder='Enter subcategory name' type="text" id="customer-name" name="customer-name" required />

                <div className="form-group">
                    <button onClick={addSubcategory}>Add Subcategory</button>
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

export default Subcategory