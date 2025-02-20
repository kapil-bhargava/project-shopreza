import React, { useEffect, useRef, useState } from 'react'
import Header, { Tracking } from './common/common'
import { Link, useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from 'react-redux';

const SubCategory = () => {
    const mynum = useSelector((state) => state.cartitem);
    const dispatch = useDispatch();
    const { cid } = useParams();
    const [subcatdata, setsubcatdata] = useState([]);
    const [scid, setscid] = useState([]);
    const [productdata, setproductdata] = useState([]);
    const [aitem, setaitem] = useState([]);
    const [cookie, createcookie, removecookie] = useCookies();
    const loginPopup = useRef()
    const popupBg = useRef()
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const audio = useRef()
    const animatedImg = useRef();
    const unitOptionsDiv = useRef();
    const unitOptionsDivBg = useRef();
    const mobileCart = useRef();


    const [spid, setspid] = useState();


    // updating cart count 
    const handleButtonClick = async (ctype, cartid, x) => {
        const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ctype: ctype, cartid: cartid, mobile: cookie.sp, storeid: cookie.storeid })
        });
        const data = await re.json();
        if (ctype === "plus") {
            aitem[x].cartqty = parseInt(aitem[x].cartqty) + 1;
        } else {
            aitem[x].cartqty = parseInt(aitem[x].cartqty) - 1;
        }
        // console.log(aitem);

        dispatch({ type: 'INC', cdata: data.cdata });
        showUnitOptions(spid);

    };

    const handleButtonClick1 = async (ctype, cartid, x) => {

        const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ctype: ctype, cartid: cartid, mobile: cookie.sp, storeid: cookie.storeid })
        });
        const data = await re.json();
        if (ctype === "plus") {
            productdata[x].cartqty = parseInt(productdata[x].cartqty) + 1;
        } else {
            productdata[x].cartqty = parseInt(productdata[x].cartqty) - 1;
        }
        // console.log(data);
        //       alert(data.cdata);
        dispatch({ type: 'INC', cdata: data.cdata });
        getProduct(scid);

    };

    // unit options div close and open functions 
    const showUnitOptions = async (spid) => {
        setLoaderMsg("Loading Units...");
        loaderLoading.current.style.display = "block";
        setspid(spid);
        try {
            const re = await fetch(`${process.env.REACT_APP_URL}/aitemapi.php?spid=${spid}&mob=${cookie.sp}&storeid=${cookie.storeid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await re.json();
            console.log(data);
            setaitem(data);
            openUnitOptions();
            loaderLoading.current.style.display = "none";
            setLoaderMsg("");

        }
        catch (error) {
            setLoaderMsg("Failed to load Unit Options...");
        }
    }
    const openUnitOptions = () => {
        unitOptionsDivBg.current.classList.add("active-unit-options-bg-div");
        unitOptionsDiv.current.classList.add("active-unit-options-div");
        unitOptionsDiv.current.classList.add("active-unit-options-div-mobile");
    }

    const closeUnitOptions = () => {
        unitOptionsDivBg.current.classList.remove("active-unit-options-bg-div");
        unitOptionsDiv.current.classList.remove("active-unit-options-div");
        unitOptionsDiv.current.classList.remove("active-unit-options-div-mobile");
    }

    const opencart = () => {
        document.getElementById("cc").style.display = "block"
    }
    const [loaderMsg, setLoaderMsg] = useState("");

    // getting subcategory data 
    const sub = async () => {
        setLoaderMsg("Loading Subcategories...");
        try {
            loaderLoading.current.style.display = "block"
            const re = await fetch(`${process.env.REACT_APP_URL}/subcategoryapi.php?cid=${cid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await re.json()
            setLoaderMsg("Loading Products...")
            setsubcatdata(data);
            getProduct(data[0].subcatid)
            // loaderLoading.current.style.display = "none"
            // setLoaderMsg("");
        }
        catch (error) {
            setLoaderMsg("Failed to load Subcategories...");
            // console.error(error)
            // alert(error.message);
        }
    }

    // getting all products 
    const getProduct = async (scid) => {
        setLoaderMsg("Loading Products...")
        loaderLoading.current.style.display = "block"
        try {
            var mob = cookie["sp"];
            setscid(scid);
            // console.log(scid, mob, cookie.storeid);
            // alert(cookie.storeid)
            const re = await fetch(`${process.env.REACT_APP_URL}/productapi.php?scid=${scid}&mob=${mob}&storeid=${cookie.storeid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await re.json()
            loaderLoading.current.style.display = "none";
            setproductdata(data);
            setLoaderMsg("");
        }
        catch (error) {
            setLoaderMsg("Failed to load Products...");
        }
    }


    // adding to the cart 
    const addToCart = async (unitId, x, au) => {
        setLoaderMsg("Adding to cart");
        loaderLoading.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/cartapi.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ unitid: unitId, mobile: cookie.sp, storeid: cookie.storeid })
            });
            const data = await re.json();

            dispatch({ type: 'INC', cdata: data.cdata });
            if (au === "yes") { showUnitOptions(spid) } else { getProduct(scid); };
            audio.current.play();
            mobileCart.current.classList.add("active-mobile-cart");
            animatedImg.current.classList.add("active-animated-img");
            setTimeout(() => {
                animatedImg.current.classList.remove("active-animated-img");
            }, 500);
            loaderLoading.current.style.display = "none";
        }
        catch (error) {
            setLoaderMsg("Failed to add to cart...");
        }
    }


    useEffect(() => {
        sub();
    }, [])


    return (
        <>

            <Tracking />

            {/* Header */}
            <Header loginPopup={loginPopup} popupBg={popupBg} />
            {/* SubCategory Section */}
            <section className="sub-cat-main-container">
                <aside className="sidebar">

                    {/* <ul> */}
                    {
                        subcatdata.map((x, index) => {
                            return (
                                <ul key={index}>
                                    <li onClick={() => { getProduct(x.subcatid) }}>
                                        <img src={x.pic} alt={x.pic} /> <span>{x.subcatname}</span>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </aside>
                <aside className="sidebar-right">
                    <div ref={unitOptionsDivBg} className="unit-options-bg-div"></div>
                    <div ref={unitOptionsDiv} className="unit-options-div">
                        <div onClick={closeUnitOptions} className="unit-options-div-cross-btn">
                            &times;
                        </div>
                        {aitem.map((unit, index) => (
                            <div key={unit.unitid} className="options-items">
                                <img src={unit.pic} alt={unit.unitname} />
                                <h5>{unit.unitname}</h5>
                                <h5>{unit.offerprice}</h5>
                                {
                                    unit.cart === "no"
                                        ? <button className='items-options-single-btn' onClick={() => addToCart(unit.unitid, index, 'yes')} >Add</button>
                                        :
                                        <span className="quantity">
                                            <button className="quantity-btn" onClick={() => { handleButtonClick("minus", unit.cartid, index) }}>-</button>
                                            <span>{unit.cartqty}</span>
                                            <button className="quantity-btn" onClick={() => { handleButtonClick("plus", unit.cartid, index) }}>+</button>
                                        </span>
                                }
                                {/* <button className='items-options-single-btn' onClick={() => addToCart(unit.unitid)} >Add</button> */}
                                {/* <span className='items-options-btns'><button>-</button><span>{aitem.cartqty}</span><button>+</button></span> */}
                            </div >
                        ))}
                    </div>
                    {productdata.map((x, index) => (
                        <div key={index} className="items">
                            <div className="product-pic-div">
                                <img src={x.pic} alt={x.productname} />
                                <img ref={animatedImg} src={x.pic} className="animated-img" />
                            </div>
                            <h5>{x.productname}</h5>
                            <p>
                                ₹ <del>{x.price}</del> <strong>{x.offerprice}</strong>
                            </p>
                            {
                                x.available_units > 1 ? <button onClick={() => showUnitOptions(x.spid)}>Add{' '}
                                    {x.available_units > 1 && (
                                        <span className="add-btn-badge">{x.available_units}</span>
                                    )}</button> :
                                    (
                                        x.cart === "no"
                                            ? <button className='items-options-single-btn' onClick={() => addToCart(x.unitid, index, 'no')} >Adds</button>
                                            :
                                            <span className="quantity">
                                                <button className="quantity-btn" onClick={() => { handleButtonClick1("minus", x.cartid, index) }}>-</button>
                                                <span>{x.cartqty}</span>
                                                <button className="quantity-btn" onClick={() => { handleButtonClick1("plus", x.cartid, index) }}>+</button>
                                            </span>
                                    )
                            }
                        </div>
                    ))}
                </aside>
            </section >

            {/* mobile cart  */}
            < div ref={mobileCart} className="mobile-cart-main-section" >
                <div className="mobile-cart">
                    <span>
                        <i className="fa fa-shopping-cart"></i>
                        {mynum}
                    </span>

                    <Link to="/checkout">
                        <i onClick={opencart} className="fa-solid fa-chevron-right"></i>
                    </Link>
                </div>
            </ div>

            {/* popup background */}
            <div ref={popupBg} className="popup-bg"></div>
            {/* audio  */}
            <audio ref={audio} src={require("./sounds/cash-sound.mp3")}></audio>
            {/* loader  */}
            <div ref={loaderLoading} className="loading">
                <p>{loaderMsg}</p>
            </div>

            {/* wait  */}
            <div ref={loaderWaiting} className="loading">
                <p>Please wait....</p>
            </div>

        </>
    )
}

export default SubCategory