import React, { useEffect, useRef, useState } from 'react'
import SideBar, { SideBarEmp } from './admincommon'
import { useCookies } from 'react-cookie';
import Sidebar from './sidebars/Sidebar';

const Bannerproduct = () => {
    const customerForm = useRef();
    const customerFormBg = useRef();
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const confirmPopup = useRef();
    const confirmPopupBg = useRef();
    const productDetails = useRef();

    const openProductDetails = (unitid, unitname) => {
        setEditDetailsMode(false);
        setUnitName(unitname)
        setUnitId(unitid);
        productDetails.current.style.display = "block";
        customerFormBg.current.style.display = "block";
        getDetails(unitid)
    }
    const closeProductDetails = () => {
        setEditDetailsMode(false);
        productDetails.current.style.display = "none";
        customerFormBg.current.style.display = "none";
    }

    const [skeletonLoading, setSkeletonLoading] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);


    const [cookie, createcookie, removecookie] = useCookies();

    const [catdata, setCatData] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [product, setproduct] = useState([]);
    const [productUnits, setProductUnits] = useState([]);

    const [bannerData, setBannerData] = useState([]);
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
            const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie.storeid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await re.json();
            getSubCategory(data[0].catid)
            setCatData(data);
            loaderLoading.current.style.display = "none";
        }

        catch (error) {
            setSkeletonLoading(true);
        }
    }

    // GET Category Data 

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
            getProducts(data[0].subcatid)
            setSubcategory(data);
            loaderLoading.current.style.display = "none";
        }
        catch (error) {
            setSkeletonLoading(true);
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
            alert(error.message);
        }
    }



    // getting product unit 
    const openAddProductUnit = async (spid, productname) => {
        setProductName(productname)
        setSPId(spid);
        loaderLoading.current.style.display = "block";
        const re = await fetch(process.env.REACT_APP_URL + "/unitmasterapi.php?spid=" + spid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await re.json();
        loaderLoading.current.style.display = "none";
        setProductUnits(data)
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

    // banner modal functions 
    const openBannerModal = () => {
        getCategory();
        customerForm.current.style.display = "block";
        customerFormBg.current.style.display = "block";
    }
    const closeBannerModal = () => {
        customerForm.current.style.display = "none";
        customerFormBg.current.style.display = "none";
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
            if (data.Response === "Saved") {
                // alert(data.Response);
                getProducts(subCatId);
                openAddProductUnit(spid)
                loaderLoading.current.style.display = "none";

            } else {
                alert(data.Response);
                loaderLoading.current.style.display = "none";
            }
        }
        catch (error) {
            loaderLoading.current.style.display = "none";
            alert("add unit error: " + error.message)
        }
    }

    // getting single data of product 
    const openEditProduct = async (spid) => {
        setSPId(spid);
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
                // alert(data.Response);
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
                // alert(data.Response);
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
                // alert(data.Response);
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
                loaderLoading.current.style.display = "none";
                if (data.Response === "Deleted") {
                    // alert(data.Response);
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

    // ============= Details functionalities  ==========
    const [productKey, setProductKey] = useState("");
    const [keyValue, setKeyValue] = useState("");
    const [detailsData, setDetailsData] = useState([]);

    // adding details function 
    const addDetails = async () => {
        // if (!detailsName ||!detailsValue)  {
        //     alert("All fields are required");
        //     return;
        // }
        loaderLoading.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/productdetailsapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unitid: unitId,
                    productkey: productKey,
                    keyvalue: keyValue
                })
            })
            const data = await re.json();
            getDetails(unitId)
            loaderLoading.current.style.display = "none";

        }
        catch (error) {
            loaderLoading.current.style.display = "none";
            alert("add details error: " + error.message)
        }
    }

    // getting details function 
    const getDetails = async (unitid) => {
        loaderLoading.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/productdetailsapi.php?unitid=" + unitid, {
                method: 'GET',
            })
            const data = await re.json();
            loaderLoading.current.style.display = "none";
            setDetailsData(data);
        }
        catch (error) {
            loaderLoading.current.style.display = "none";
            alert("get details error: " + error.message)
        }
    }

    // delete details 
    const deleteDetails = async (descid) => {
        // alert(detailid)
        if (window.confirm('Are you sure you want to delete')) {
            loaderLoading.current.style.display = "block";
            try {
                const re = await fetch(process.env.REACT_APP_URL + "/productdetailsapi.php", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        descid: descid
                    })
                })
                const data = await re.json();
                getDetails(unitId)
                loaderLoading.current.style.display = "none";

            }
            catch (error) {
                loaderLoading.current.style.display = "none";
                alert("delete details error: " + error.message)
            }
        }
    }

    const [editDetailsMode, setEditDetailsMode] = useState(false);
    const [descid, setDescid] = useState("");

    const editDetails = async (descid) => {
        setEditDetailsMode(true)
        setDescid(descid)
        const re = await fetch(process.env.REACT_APP_URL + "/productdetailsapi.php", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descid: descid
            })
        })
        const data = await re.json();
        setProductKey(data[0].productkey)
        setKeyValue(data[0].keyvalue)


    }

    // update details 
    const updateDetails = async () => {
        // alert(descid)
        // if (!detailsName ||!detailsValue)  {
        //     alert("All fields are required");
        //     return;
        // }
        loaderLoading.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/productdetailsapi.php", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unitid: unitId,
                    descid: descid,
                    productkey: productKey,
                    keyvalue: keyValue
                })
            })
            const data = await re.json();
            getDetails(unitId)
            loaderLoading.current.style.display = "none";
            setEditDetailsMode(false)
            setProductKey('')
            setKeyValue('')
        }
        catch (error) {
            loaderLoading.current.style.display = "none";
            alert("update details error: " + error.message)
        }
    }

    // ================= BANNER FUNCTIONALITIES ==================
    const [festivalId, setFestivalId] = useState("");

    // getting all banners / festials 
    const getBanners = async () => {
        // setDel(false);
        const re = await fetch(process.env.REACT_APP_URL + "/festivalapi.php?status=all&storeid=" + cookie.storeid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await re.json();
        setFestivalId(data[0].festivalid)
        getBannerProducts(data[0].festivalid)
        setBannerData(data);
        console.log(data);
    }

    // ADDING Product to selected Banner (POST Method)
    const addProductToBanner = async (spid) => {

        loaderLoading.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/festivalproductapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    festivalid: festivalId,
                    spid: spid
                })
            })
            const data = await re.json();
            alert(data.Response)
            loaderLoading.current.style.display = "none";
            getBannerProducts(festivalId)
        }
        catch (error) {
            loaderLoading.current.style.display = "none";
            alert("add banner error: " + error.message)
        }
    }

    const switchDiv = useRef(null);


    const [bannerProductsData, setBannerProductsData] = useState([]);
    // getting Banner Products 
    const getBannerProducts = async (festivalid) => {
        setFestivalId(festivalid);
        loaderLoading.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/festivalproductapi.php?festivalid=" + festivalid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await re.json();
            loaderLoading.current.style.display = "none";
            // console.log(data)
            setBannerProductsData(data);

            // console.log(data[0].status)
            for (let i = 0; i < data.length; i++) {

                if (data[i].status === "yes") {
                    if (switchDiv.current) {
                        switchDiv.current.classList.add("on");
                    }
                    // sliderDiv.current.classList.add(" on");
                }

            }

            // changeStatus();
        }
        catch (error) {
            loaderLoading.current.style.display = "none";
            alert("get banner products error: " + error.message)
        }
    }

    // DELETE banner products 
    const deleteBannerProduct = async (bpid) => {
        // alert(bpid)
        if (window.confirm('Are you sure you want to delete')) {
            loaderLoading.current.style.display = "block";
            try {
                const re = await fetch(process.env.REACT_APP_URL + "/festivalproductapi.php", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        bpid: bpid
                    })
                })
                const data = await re.json();
                console.log(data);
                getBannerProducts(festivalId);
                loaderLoading.current.style.display = "none";
            }
            catch (error) {
                loaderLoading.current.style.display = "none";
                alert("delete banner product error: " + error.message)
            }
        }
    }



    const cancelDetails = async () => {
        setEditDetailsMode(false)
        setProductKey('')
        setKeyValue('')
    }





    const changeStatus = async (bpid, status) => {
        alert(status);
        alert(bpid)
        // let switchElement = switchDiv.current;

        // if (switchElement.classList.contains("on")) {
        //     switchElement.classList.remove("on");
        // } else {
        //     switchElement.classList.add("on");
        // }
        // alert(unitId)
        loaderLoading.current.style.display = "block";
        // try {
        const re = await fetch(process.env.REACT_APP_URL + "/festivalproductapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bpid: bpid,
                status: status
            })
        })
        const data = await re.json();
        console.log(data)
        getBannerProducts(festivalId);
        loaderLoading.current.style.display = "none";
        // }
        // catch (error) {
        //     loaderLoading.current.style.display = "none";
        //     alert("change status error: " + error.message)
        // }
    }









    useEffect(() => {

        getBanners();

        // alert(catId)
        // getSubCategory(catId)
    }, []);






    return (
        <>
            <Sidebar />
            <div className="new-employee-main">
                <div className="row">
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Select Banner</label>
                            <select value={festivalId} selected onChange={(e) => { getBannerProducts(e.target.value) }}>
                                {
                                    bannerData.map((x, index) => {
                                        return (
                                            <option key={index} value={x.festivalid}>{x.festivalname}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </div>

                    <div className="col-md-10 mb-2 text-end">
                        <button className="btn btn-success" onClick={openBannerModal}>Add New</button>

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
                                        <th>Status</th>
                                        <th>Action</th>
                                        {/* <th>Referral Code</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bannerProductsData.map((x, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{x.productname}</td>
                                                    <td>
                                                        {/* <!-- From Uiverse.io by WhiteNervosa --> */}
                                                        <div className="switch" ref={switchDiv} onClick={() => { changeStatus(x.bpid, x.status === "yes" ? "no" : "yes") }}>
                                                            <div className="slider"></div>

                                                        </div>

                                                    </td>
                                                    <td>
                                                        {x.status}
                                                        <i onClick={() => { openEditProduct(x.bpid) }} className="fa fa-edit"></i> &nbsp;&nbsp;&nbsp;
                                                        <i onClick={() => { deleteBannerProduct(x.bpid) }} className="fa fa-trash text-danger"></i>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>)}
                </div>
            </div>

           
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

            {/* adding product details popup  */}
            <div style={{ border: "1px solid black" }} ref={productDetails} className="add-customer-form product-unit product-details-section-main">
                <div className="cross-entity">
                    <i className="fas fa-times" onClick={closeProductDetails} ></i>
                </div>
                <h2>{editDetailsMode ? "Edit " : null}Product Details for: {productName + " " + unitName}</h2>
                {/* table for product details  */}
                <div className="">
                    {/* <h1>Hello product</h1> */}
                    <div className="input-row">
                        <label>Key</label>
                        <input value={productKey} onChange={(e) => { setProductKey(e.target.value) }} type="text" placeholder='Enter Key' required />

                    </div>
                    <div className="input-row">
                        <label>Value</label>
                        <textarea value={keyValue} onChange={(e) => { setKeyValue(e.target.value) }} placeholder='Product Value' required> </textarea>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={editDetailsMode ? updateDetails : addDetails}>{editDetailsMode ? "Update" : "Add"}</button> {
                        editDetailsMode ?
                            <button className="btn btn-danger btn-sm" onClick={cancelDetails}>Cancel</button>
                            : null}
                </div>
                <div className='mt-4 table-responsive table-employee'>
                    <ol>
                        {
                            detailsData.map((x, index) => {
                                return (
                                    <li key={index}><strong>{x.productkey}:</strong> {x.keyvalue} <i style={{ cursor: "pointer" }} onClick={() => { editDetails(x.descid) }} className="fa fa-pencil text-success"></i> <i style={{ cursor: "pointer" }} onClick={() => { deleteDetails(x.descid) }} className="fa fa-trash text-danger"></i></li>
                                );
                            })
                        }
                    </ol>
                </div>
            </div>



            {/* =========== Banner Modal ==================  */}
            <div ref={customerFormBg} className="c-bg"></div>
            <div ref={customerForm} className="add-customer-form banner-modal product-unit">
                <div onClick={closeBannerModal} className="pic-popup-close">
                    &times;
                </div>
                <div className="new-employee-main banner-modal">
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

                        {/* <div className="col-md-2">
                            <br />
                            <button className="btn btn-success" onClick={isEditMode ? updateProduct : SaveProduct}>{isEditMode ? "Update" : "Save"}</button>

                        </div> */}

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

                                                        <td>
                                                            <button onClick={() => { addProductToBanner(x.spid) }} className="btn-sm btn btn-primary">Add</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>)}
                    </div>
                </div>



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

                {/* adding product details popup  */}
                <div style={{ border: "1px solid black" }} ref={productDetails} className="add-customer-form product-unit product-details-section-main">
                    <div className="cross-entity">
                        <i className="fas fa-times" onClick={closeProductDetails} ></i>
                    </div>
                    <h2>{editDetailsMode ? "Edit " : null}Product Details for: {productName + " " + unitName}</h2>
                    {/* table for product details  */}
                    <div className="">
                        {/* <h1>Hello product</h1> */}
                        <div className="input-row">
                            <label>Key</label>
                            <input value={productKey} onChange={(e) => { setProductKey(e.target.value) }} type="text" placeholder='Enter Key' required />

                        </div>
                        <div className="input-row">
                            <label>Value</label>
                            <textarea value={keyValue} onChange={(e) => { setKeyValue(e.target.value) }} placeholder='Product Value' required> </textarea>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={editDetailsMode ? updateDetails : addDetails}>{editDetailsMode ? "Update" : "Add"}</button> {
                            editDetailsMode ?
                                <button className="btn btn-danger btn-sm" onClick={cancelDetails}>Cancel</button>
                                : null}
                    </div>
                    <div className='mt-4 table-responsive table-employee'>
                        <ol>
                            {
                                detailsData.map((x, index) => {
                                    return (
                                        <li key={index}><strong>{x.productkey}:</strong> {x.keyvalue} <i style={{ cursor: "pointer" }} onClick={() => { editDetails(x.descid) }} className="fa fa-pencil text-success"></i> <i style={{ cursor: "pointer" }} onClick={() => { deleteDetails(x.descid) }} className="fa fa-trash text-danger"></i></li>
                                    );
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Bannerproduct