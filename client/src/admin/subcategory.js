import React, { useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';

const Subcategory = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();


    const [Subcategory, setSubcategory] = useState();
    const [category, setCategory] = useState();
    const [cookie, createcookie, removecookie] = useCookies();
    // const [categoryData, setCategoryData] = useState([]);
    const openAddSubcategory = () => {
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }
    const closeAddSubcategory = () => {
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
    }
    // adding new category function 
    const addSubcategory = async () => {
        //     const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        // categoryname: category,
        // subcategoryname: subcategory
        //         })
        //     })
        //     const data = await re.json();
        //     if (data.response === "Saved") {
        //         setCategory(data.response);
        closeAddSubcategory();
        //     }
    }


    return (
        <>
            {cookie.adminCookie != null ? <SideBar /> : <SideBarEmp />}
            <div className="new-employee-main">
                <div className="add-c-div">
                    <button onClick={openAddSubcategory}>Add Subcategory</button>
                </div>

                <div className="table-responsive table-employee">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Offer Price</th>
                                <th>Des</th>
                                <th>Action</th>
                                {/* <th>Referral Code</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Product 1</td>
                                <td>₹ 45</td>
                                <td>₹ 39</td>
                                <td>Employee</td>
                                <td>
                                    {/* <i onClick={openEditProduct} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                    <i onClick={deleteProduct} className="fa fa-trash text-danger"></i> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <div ref={customerFormBg} onClick={closeAddSubcategory} className="c-bg"></div>
            <div ref={customerForm} className="add-customer-form">
                <h2>Add New Subcategory</h2>
                <div className="form-group">
                    <label>Select Category</label>
                    <select onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="male">Cat 1</option>
                        <option value="female">Cat 2</option>
                        <option value="other">Cat 3</option>
                    </select>
                    <label>Subcategory Name</label>
                    <input onChange={(e) => { setSubcategory(e.target.value) }} placeholder='Enter subcategory name' type="text" id="customer-name" name="customer-name" required />
                </div>
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