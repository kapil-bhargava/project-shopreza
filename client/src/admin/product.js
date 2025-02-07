import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';
import Sidebar from './sidebars/Sidebar';

const Product = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const confirmPopup = useRef();
    const confirmPopupBg = useRef();

    const [skeletonLoading, setSkeletonLoading] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);
    const [category, setCategory] = useState("");

    const [cookie, createcookie, removecookie] = useCookies();

    const [catdata, setCatData] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [product, setproduct] = useState([]);
    const [productUnits, setProductUnits] = useState([]);
    // const [productUnitData, setProductUnitData] = useState([]);
    const [subCatId, setsubCatId] = useState("");
    const [unitId, setUnitId] = useState("");
    const [productName, setProductName] = useState("");
    const [unitStatus, setUnitStatus] = useState("");
    const [stock, setStock] = useState("");


    const [spid, setSPId] = useState("");
    const [unitName, setUnitName] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [unitOfferPrice, setUnitOfferPrice] = useState("");
    const [unitDes, setUnitDes] = useState("");


    const [catId, setCatId] = useState("");

    // getting category 
    const getCategory = async () => {
        try {
            loaderLoading.current.style.display = "block";
            // console.log(cookie2.adminCookie2)
            const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie.storeid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            // setCatId(data[0].catid)
            getSubCategory(data[0].catid)
            // console.log(data[0])
            setCatData(data);
            loaderLoading.current.style.display = "none";
            // console.log("TRY");
        }

        catch (error) {
            setSkeletonLoading(true);
            // console.log(error);
            // alert(error.message);
            // loaderLoading.current.style.display = "none";
            // console.error(error)
        }
    }

    const getSubCategory = async (catid) => {
        try {
            setCatId(catid);
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/subcategoryapi.php?cid=" + catid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            // console.log("subct data",data);
            // setsubCatId(data[0].subcatid)
            getProducts(data[0].subcatid)
            setSubcategory(data);
            loaderLoading.current.style.display = "none";
        }
        catch (error) {
            setSkeletonLoading(true);
            // console.error(error)
            // alert(error.message);
            // loaderLoading.current.style.display = "none";
        }
    }


    // getting products 
    const getProducts = async (subcatid) => {
        try {
            setsubCatId(subcatid);
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/productmasterapi.php?scid=" + subcatid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            loaderLoading.current.style.display = "none";
            setproduct(data);
        }
        catch (error) {
            setSkeletonLoading(true);
            // console.log("CATHCH pr");
            alert(error.message);
            // loaderLoading.current.style.display = "none";
        }
    }

    // getting product unit 
    const openAddProductUnit = async (spid) => {
        setSPId(spid);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/unitmasterapi.php?spid=" + spid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        // console.log(data)
        loaderLoading.current.style.display = "none";
        setProductUnits(data)
        // alert(data.Response);
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }

    // closing add product unit 
    const closeAddProductUnit = () => {
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
        closePicPopup();
        closeConfirmPopup();
        setProductName('')
        setUnitName('');
        setUnitPrice('');
        setUnitOfferPrice('');
        setStock('');
        setUnitStatus('');
        setIsEditMode(false);
    }

    // saving product 
    const SaveProduct = async () => {
        loaderLoading.current.style.display = "block";
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
        loaderLoading.current.style.display = "none";
        alert(data.Response);
        if (data.Response === "Saved") {
            //setCategory(data.response);
            getProducts(subCatId);
        }

    }

    // adding new Product unit
    const addUnit = async () => {
        try {
            loaderLoading.current.style.display = "block";
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
                    stock: stock

                })
            })
            const data = await re.json();
            // console.log(data);
            if (data.Response === "Saved") {
                alert(data.Response);
                getProducts(subCatId);
                openAddProductUnit(spid)
                loaderLoading.current.style.display = "none";

            } else {
                alert(data.Response);
                loaderLoading.current.style.display = "none";
            }
        }
        catch (error) {
            // loaderLoading.current.style.display = "none";
            alert("add unit error: " + error.message)
        }
    }

    // getting single data of product 
    const openEditProduct = async (spid) => {
        setSPId(spid);
        alert(spid)
        setIsEditMode(true);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/productmasterapi.php", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                spid: spid
            })
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none";
        // console.log(data);
        setProductName(data[0].productname);
    }

    // updating product 
    const updateProduct = async () => {
        setIsEditMode(false);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/productmasterapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                spid: spid,
                productname: productName,
            })
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none";
        // console.log(data);
        alert(data.Response)
        getProducts(subCatId);
        closeAddProductUnit();
    }

    // get single Product Unit data 
    const openEditProductUnit = async (unitid) => {
        setIsEditMode(true)
        setUnitId(unitid)
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/unitmasterapi.php?unitid=" + unitid, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none";
        setUnitName(data[0].unitname);
        setUnitPrice(data[0].price);
        setUnitOfferPrice(data[0].offerprice);
        setStock(data[0].stock);
        setUnitStatus(data[0].status);
        openAddProductUnit(spid)
        // openAddProductUnit();


    }

    // update product unit data 
    const updateProductUnit = async () => {
        try {
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/unitmasterapi.php", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unitid: unitId,
                    unitname: unitName,
                    price: unitPrice,
                    offerprice: unitOfferPrice,
                    stock: stock,
                    status: unitStatus
                })
            })
            const data = await re.json();
            loaderLoading.current.style.display = "none";
            if (data.Response === "Updated") {
                alert(data.Response);
                getProducts(subCatId);
                openAddProductUnit(spid);
            }
            else {
                alert(data.Response);
            }
        }
        catch (error) {
            // loaderLoading.current.style.display = "none";
            alert("update unit error: " + error.message)
        }
    }


    // delete product unit 
    const deleteProductUnit = async (unitid) => {
        if (window.confirm('Are you sure you want to delete')) {
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/unitmasterapi.php", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unitid: unitid

                })
            })
            const data = await re.json();
            loaderLoading.current.style.display = "none";

            if (data.Response === "Deleted") {
                alert(data.Response);
                getProducts(subCatId);
                openAddProductUnit(spid);
            }
            else {
                alert(data.Response);
            }
        }
    }


    // delete Product 
    const deleteProduct = async (spid) => {
        if (window.confirm('Are you sure you want to delete')) {
            loaderLoading.current.style.display = "block";
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
            loaderLoading.current.style.display = "none";
            if (data.Response === "Deleted") {
                alert(data.Response);
                getProducts(subCatId);
            }

        }
    }

    const [pic, setPic] = useState("");
    const picPopup = useRef();

    const openPicForm = (x) => {
        picPopup.current.style.display = "block";
        setUnitId(x)
        getUploadPic(x)
        // setPic(e.target.files[0])

    }
    const closePicPopup = () => {
        picPopup.current.style.display = "none";
    }

    const [picData, setPicData] = useState([]);
    // getUploadPic 
    const getUploadPic = async (unitid) => {
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/uploadpic.php?unitid=" + unitid, {
            method: 'GET',
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none";
        setPicData(data);
        
    }

    // useStates for pic 
    const [picName, setPicName] = useState("");
    const [picId, setPicId] = useState("");

    // pic options function
    const picOption = async (picname, unitid, picid) => {
        setPicName(picname);
        setUnitId(unitid);
        setPicId(picid);
        confirmPopup.current.style.display = "flex";
        confirmPopupBg.current.style.display = "flex";
    }
    const closeConfirmPopup = () => {
        confirmPopup.current.style.display = "none";
        confirmPopupBg.current.style.display = "none";
    }

    // delete pic api 
    const deletePic = async () => {
        try {
            if (window.confirm('Are you sure you want to delete ?')) {
                loaderLoading.current.style.display = "block";
                const re = await fetch(process.env.REACT_APP_URL + "/uploadpic.php", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        picid: picId
                    })
                })
                const data = await re.json();
                // console.log(data);
                loaderLoading.current.style.display = "none";
                if (data.Response === "Deleted") {
                    alert(data.Response);
                    getUploadPic(unitId);
                    closeConfirmPopup();
                }
                else {
                    alert(data.Response);
                }
            }
        }
        catch (error) {
            loaderLoading.current.style.display = "none";
            alert("delete pic error: " + error.message)
        }
    }

    // using the pic 

    const usePic = async () => {
        if (window.confirm('Are you sure you want to change ?')) {
            loaderLoading.current.style.display = "block";
            const re = await fetch(process.env.REACT_APP_URL + "/uploadpic.php", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unitid: unitId,
                    pic: picName,   
                })
            })
            const data = await re.json();
            // console.log(data);
            openAddProductUnit(spid);
            loaderLoading.current.style.display = "none";
            closePicPopup();
            closeConfirmPopup();
        }
    }

    // saving pic 
    const uploadPic = async () => {
        const formData = new FormData();
        formData.append('pic', pic);
        formData.append('unitid', unitId);
        formData.append('pictype', "unit");
        loaderLoading.current.style.display = "block";
        // try {
        const re = await fetch(process.env.REACT_APP_URL + "/uploadpic.php", {
            method: 'POST',
            body: formData
        })
        const data = await re.json();
        // console.log(data);
        loaderLoading.current.style.display = "none";
        getUploadPic(unitId)
        // if (data.Response === "Uploaded") {
        //     alert(data.Response);
        //     getProducts(subCatId);
        //     closePicPopup();
        // }
        // else {
        //     alert(data.Response);
        // }
        // }
        // catch (error) {
        //     loaderLoading.current.style.display = "none";
        //     alert("upload pic error: " + error.message)
        // }
    }

    // cancel update 
    const cancelUpdate = () => {
        setIsEditMode(false);
        setProductName('')
        setUnitName('');
        setUnitPrice('');
        setUnitOfferPrice('');
        setStock('');
        setUnitStatus('');

    }


    useEffect(() => {
        getCategory();
        // alert(catId)
        // getSubCategory(catId)
    }, []);




    return (
        <>
            <Sidebar/>
            <div className="new-employee-main">
                <div className="row">
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Select Category</label>
                            <select value={catId} onChange={(e) => { getSubCategory(e.target.value) }}>
                                <option value="select">Select Category</option>
                                {
                                    catdata.map((x, index) => {
                                        return (
                                            <option key={index} value={x.catid}>{x.catname}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Sub Category</label>
                            <select value={subCatId} onChange={(e) => { getProducts(e.target.value) }}>
                                <option value="select">Select Sub Category</option>
                                {
                                    subcategory.map((x, index) => {
                                        return (
                                            <option key={index} value={x.subcatid}>{x.subcatname}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input value={productName} type="text" className="form-control" onChange={(e) => { setProductName(e.target.value) }} />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <br />
                        <button className="btn btn-success" onClick={isEditMode ? updateProduct : SaveProduct}>{isEditMode ? "Update" : "Save"}</button>

                    </div>

                </div>


                <div className="table-responsive table-employee">
                    {
                        skeletonLoading ? (
                            <div className="skeleton-loader">
                                <h1>No Data</h1>
                            </div>
                        ) : (
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
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{x.productname}</td>
                                                    <td><button className="btn btn-warning" onClick={() => { openAddProductUnit(x.spid) }}>{x.available_units} Options</button></td>
                                                    <td>
                                                        <i onClick={() => { openEditProduct(x.spid) }} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                                        <i onClick={() => { deleteProduct(x.spid) }} className="fa fa-trash text-danger"></i>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>)}
                </div>
            </div>

            {/* Modal of Product Units */}
            <div ref={customerFormBg} onClick={closeAddProductUnit} className="c-bg"></div>
            <div ref={customerForm} className="add-customer-form product-unit">
            
                <h2>{isEditMode ? "Edit Product  Unit" : "Add New Product Unit"}</h2>
                <div className="input-pair-container">
                    <div className="input-pair">
                        <label>Product Unit</label>
                        <input value={unitName} onChange={(e) => { setUnitName(e.target.value) }} placeholder='Product Unit' required />
                    </div>
                    <div className="input-pair">
                        <label>Unit Price</label>
                        <input value={unitPrice} onChange={(e) => { setUnitPrice(e.target.value) }} placeholder='Unit Price' required />
                    </div>
                    <div className="input-pair">
                        <label>Unit Offer Price</label>
                        <input value={unitOfferPrice} onChange={(e) => { setUnitOfferPrice(e.target.value) }} placeholder='Unit Offer Price' required />
                    </div>
                    <div className="input-pair">
                        <label>Stock</label>
                        <input value={stock} onChange={(e) => { setStock(e.target.value) }} placeholder='Unit Stock' required />
                    </div>

                </div>
                <div>
                    <button className='btn btn-success' onClick={isEditMode ? updateProductUnit : addUnit}>
                        {isEditMode ? "Update Unit" : "Add Unit"}
                    </button>
                    {isEditMode ?
                        (
                            <button className='btn btn-danger' onClick={cancelUpdate}>
                                {/* {isEditMode ? "Update Unit" : "Add Unit"} */}
                                Cancel
                            </button>
                        ) : null
                    }
                </div>

                {/* table for product units  */}
                <div className="mt-4 table-responsive table-employee">
                    {
                        skeletonLoading ? (
                            <div className="skeleton-loader">
                                <h1>No Data</h1>
                            </div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Unit Name</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {productUnits.map((x, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>< img style={{ cursor: "pointer" }} src={x.pic} alt={x.pic} onClick={() => { openPicForm(x.unitid) }} /> {x.unitname}</td>
                                                <td>{x.stock}</td>
                                                <td>
                                                    <del>₹ {x.price}</del> ₹ {x.offerprice}
                                                </td>
                                                <td>{x.status}</td>
                                                <td>
                                                    <i
                                                        onClick={() => openEditProductUnit(x.unitid)}
                                                        className="fa fa-edit"
                                                    ></i>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <i
                                                        onClick={() => deleteProductUnit(x.unitid)}
                                                        className="fa fa-trash text-danger"
                                                    ></i>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    )
                                    }

                                </tbody>
                            </table>)
                    }
                </div>
            </div >

            {/* loader  */}
            <div ref={loaderLoading} className="loading" >
                <p>Loading....</p>
            </div >

            {/* wait  */}
            <div ref={loaderWaiting} className="loading" >
                <p>Please wait....</p>
            </div >

            {/* pic Popup  */}
            <div ref={picPopup} className="pic-popup">
                <h5>Select Pic</h5>
                <div className="input-pair">
                    <input onChange={(e) => { setPic(e.target.files[0]) }} type="file" />
                    <button className='btn btn-primary' onClick={uploadPic}>Upload</button>
                    <div onClick={closePicPopup} className="pic-popup-close">
                        &times;
                    </div>
                </div>
                <br />
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
                </div>

            </div>

            {/* confirm popup */}
            <div ref={confirmPopupBg} onClick={closeConfirmPopup} className="confirm-popup-bg"></div>
            <div ref={confirmPopup} className="confirm-popup">
                <div onClick={closeConfirmPopup} className="pic-popup-close">
                    &times;
                </div>
                <button onClick={usePic} className="btn btn-primary" >Use Pic</button>
                <button onClick={deletePic} className="btn btn-danger">Delete</button>

            </div>


        </>
    )
}

export default Product