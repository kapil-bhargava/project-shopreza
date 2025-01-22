import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';

const Product = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();

    const [isEditMode, setIsEditMode] = useState(false);
    const [category, setCategory] = useState();

    const [cookie, createcookie, removecookie] = useCookies();

    const [catdata, setCatData] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [product, setproduct] = useState([]);
    const [subCatId, setsubCatId] = useState();
    const [productName, setProductName] = useState();


    const [spid, setSPId] = useState();
    const [unitName, setUnitName] = useState();
    const [unitPrice, setUnitPrice] = useState();
    const [unitOfferPrice, setUnitOfferPrice] = useState();
    const [unitDes, setUnitDes] = useState();
    const [unitStock, setUnitStock] = useState();


    useEffect(() => {
        getCategory();
    }, []);


    const getCategory = async () => {
        // console.log(cookie2.adminCookie2)
        // loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie.adminCookie2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        // console.log(data);
        // console.log(data[0])
        setCatData(data);
        //  loaderLoading.current.style.display = "none";
    }

    const getSubCategory = async (catid) => {
        // loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/subcategoryapi.php?cid=" + catid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        //loaderLoading.current.style.display = "none";
        // console.log(data);
        setSubcategory(data);
    }

    const getProducts = async (subcatid) => {
        setsubCatId(subcatid);
        // loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/productmasterapi.php?scid=" + subcatid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        //  console.log(data);
        //loaderLoading.current.style.display = "none";
        // console.log(data);
        setproduct(data);
    }

    const openAddProduct = (spid) => {
        setSPId(spid);
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }
    const closeAddProduct = () => {
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
        setIsEditMode(false);
    }

    const SaveProduct = async () => {
        const re = await fetch(process.env.REACT_APP_URL + "/productmasterapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subcatid: subCatId,
                productname: productName,

            })
        })
        const data = await re.json();
        alert(data.Response);
        if (data.Response === "Saved") {
            //setCategory(data.response);
            getProducts(subCatId);
        }

    }

    // adding new Product function 
    const addUnit = async () => {
        const re = await fetch(process.env.REACT_APP_URL + "/unitmasterapi.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                spid: spid,
                unitname: unitName,
                price: unitPrice,
                offerprice: unitOfferPrice,
                stock: unitStock

            })
        })
        const data = await re.json();
        if (data.Response === "Saved") {
            alert("Product saved successfully");
            getProducts(subCatId);
        } else {
            alert("Product not saved");
        }
        //closeAddProduct();

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
    const updateProduct = async () => {
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


    const deleteProduct = async (spid) => {
        if (window.confirm('Are you sure you want to delete')) {
            const re = await fetch(process.env.REACT_APP_URL + "/productmasterapi.php", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spid: spid
                })
            })
            const data = await re.json();
            if (data.Response === "Deleted") {
                alert(data.Response);
                getProducts(subCatId);
            }

        }
    }


    return (
        <>
            {cookie.adminCookie != null ? <SideBar /> : <SideBarEmp />}
            <div className="new-employee-main">
                <div class="row">
                    <div class="col-md-2">
                        <div className="form-group">
                            <label>Select Category</label>
                            <select onChange={(e) => { getSubCategory(e.target.value) }}>
                                <option value="select">Select Category</option>
                                {
                                    catdata.map((x) => {
                                        return (
                                            <option value={x.catid}>{x.catname}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </div>
                    <div class="col-md-2">
                        <div className="form-group">
                            <label>Sub Category</label>
                            <select onChange={(e) => { getProducts(e.target.value) }}>
                                <option value="select">Select Sub Category</option>
                                {
                                    subcategory.map((x) => {
                                        return (
                                            <option value={x.subcatid}>{x.subcatname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input type="text" className="form-control" onChange={(e) => { setProductName(e.target.value) }} />
                        </div>
                    </div>
                    <div class="col-md-2">
                        <br />
                        <button className="btn btn-success" onClick={SaveProduct}>Save</button>

                    </div>

                </div>


                <div className="table-responsive table-employee">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Product Name</th>
                                <th>Available Units</th>
                                <th>Action</th>
                                {/* <th>Referral Code</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map((x, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{x.productname}</td>
                                            <td><button className="btn btn-warning" onClick={() => { openAddProduct(x.spid) }}>{x.available_units} Options</button></td>
                                            <td>
                                                <i onClick={openEditProduct} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                                <i onClick={() => { deleteProduct(x.spid) }} className="fa fa-trash text-danger"></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal  */}
            <div ref={customerFormBg} onClick={closeAddProduct} className="c-bg"></div>
            <div ref={customerForm} className="add-customer-form product-unit">
                <h2>{isEditMode ? "Edit Product  Unit" : "Add New Product Unit"}</h2>
                <div className="input-pair-container">
                    <div className="input-pair">
                        <label>Product Unit</label>
                        <input onChange={(e) => { setUnitName(e.target.value) }} placeholder='Product Unit' required />
                    </div>
                    <div className="input-pair">
                    <label>Product Price</label>
                    <input onChange={(e) => { setUnitPrice(e.target.value) }} placeholder='Price' required />
                    </div>
                    <div className="input-pair">
                    <label>Product Offer Price</label>
                    <input onChange={(e) => { setUnitOfferPrice(e.target.value) }} placeholder='Offer Price' required />
                    </div>
                    <div className="input-pair">
                    <label>Stock</label>
                    <input onChange={(e) => { setUnitStock(e.target.value) }} placeholder='Offer Price' required />
                    </div>
                    <div className="input-pair">
                    <label>Product Description</label>
                    <textarea onChange={(e) => { setUnitDes(e.target.value) }} placeholder='Product Description' required />
                    </div>

                </div>
                <div className="">
                    <button className='btn btn-success' onClick={isEditMode ? updateProduct : addUnit}>
                        {isEditMode ? "Update" : "Add Product"}
                    </button>
                </div>
                <div className="mt-4 table-responsive table-employee">
                    <table>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Product Name</th>
                                <th>Available Units</th>
                                <th>Action</th>
                                {/* <th>Referral Code</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Product 1</td>
                                <td>10</td>
                                <td>
                                    <i onClick={openEditProduct} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                    <i onClick={() => { deleteProduct(1) }} className="fa fa-trash text-danger"></i>
                                </td>
                            </tr>
                            {/* {
                                product.map((x, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{x.productname}</td>
                                            <td><button className="btn btn-warning" onClick={() => { openAddProduct(x.spid) }}>{x.available_units} Options</button></td>
                                            <td>
                                                <i onClick={openEditProduct} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                                <i onClick={() => { deleteProduct(x.spid) }} className="fa fa-trash text-danger"></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            } */}
                        </tbody>
                    </table>
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