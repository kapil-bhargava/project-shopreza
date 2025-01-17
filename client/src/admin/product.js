import React, { useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';

const Product = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [isEditMode, setIsEditMode] = useState(false);

    const [Subcategory, setSubcategory] = useState();
    const [category, setCategory] = useState();
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productOfferPrice, setProductOfferPrice] = useState();
    const [productDes, setProductDes] = useState();
    const [cookie, createcookie, removecookie] = useCookies();

    const openAddProduct = () => {
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }
    const closeAddProduct = () => {
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
        setIsEditMode(false)
    }
    // adding new Product function 
    const addProduct = async () => {
        //     const re = await fetch(process.env.REACT_APP_URL + "/signupapi.php", {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        // categoryname: category,
        // subcategoryname: subcategory,

        //         })
        //     })
        //     const data = await re.json();
        //     if (data.response === "Saved") {
        //         setCategory(data.response);
        closeAddProduct();
        //     }
    }

    const openEditProduct = async () => {
        setIsEditMode(true);
        //     const re = await fetch(process.env.REACT_APP_URL + "/editproductapi.php", {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             id: 1
        //         })
        //     })
        //     const data = await re.json();
        //     console.log(data);
        //     setProductName(data.productname);
        //     setProductPrice(data.price);
        //     setProductOfferPrice(data.offerprice);
        //     setProductDes(data.description);
        //     // setSubcategory(data.subcategoryname);
        //     // setCategory(data.categoryname);
        openAddProduct();

    }
    const updateProduct = async()=>{
        setIsEditMode(false);
        //     const re = await fetch(process.env.REACT_APP_URL + "/editproductapi.php", {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             id: 1,
        //             productname: productName,
        //             price: productPrice,
        //             offerprice: productOfferPrice,
        //             description: productDes,
        //             // subcategoryname: subcategory,
        //             // categoryname: category
        //         })
        //     })
        //     const data = await re.json();
        //     if (data.response === "Updated") {
        //         closeAddProduct();
        //     }
    }


    const deleteProduct = async () => {

    }


    return (
        <>
            {cookie.adminCookie != null ? <SideBar /> : <SideBarEmp />}
            <div className="new-employee-main">
                <div className="add-c-div">
                    <button onClick={openAddProduct}>Add Product</button>
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
                                    <i onClick={openEditProduct} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                    <i onClick={deleteProduct} className="fa fa-trash text-danger"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal  */}
            <div ref={customerFormBg} onClick={closeAddProduct} className="c-bg"></div>
            <div ref={customerForm} className="add-customer-form">
                <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
                <div className="form-group">
                    <label>Select Category</label>
                    <select onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="male">Cat 1</option>
                        <option value="female">Cat 2</option>
                        <option value="other">Cat 3</option>
                    </select>
                    <label>Select Subcategory</label>
                    <select onChange={(e) => { setSubcategory(e.target.value) }}>
                        <option value="subcat">SubCat 1</option>
                        <option value="subcat">SubCat 2</option>
                        <option value="subcat">SubCat 3</option>
                    </select>
                    <label>Product Name</label>
                    <input onChange={(e) => { setProductName(e.target.value) }} placeholder='Product name' required />
                    <label>Product Price</label>
                    <input onChange={(e) => { setProductPrice(e.target.value) }} placeholder='Price' required />
                    <label>Product Offer Price</label>
                    <input onChange={(e) => { setProductOfferPrice(e.target.value) }} placeholder='Offer Price' required />
                    <label>Product Description</label>
                    <textarea onChange={(e) => { setProductDes(e.target.value) }} placeholder='Product Description' required />
                </div>
                <div className="form-group">
                    <button onClick={isEditMode ?  updateProduct : addProduct}>
                        {isEditMode ? "Update" :"Add Product"}
                    </button>
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

export default Product