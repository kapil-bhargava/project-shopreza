import { Link, useNavigate } from 'react-router-dom'
import Header, { Footer, Tracking } from './common/common'
import './main.css'
import { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import Userlogin from './userlogin'

const Home = () => {
    const loginPopup = useRef();
    const popupBg = useRef();
    const ip = useRef();
    const [categories, setCategories] = useState([]);
    const loaderLoading = useRef()

    const [cookie, createCookie, removeCookie] = useCookies();
    const [loaderMsg, setLoaderMsg] = useState("");



    const jump = useNavigate()
    const [catId, setCatId] = useState("");

    const getCategory = async () => {
        setLoaderMsg("Loading Categories...");
        loaderLoading.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie.storeid, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const dt = await re.json();
            setCatId(dt[0].catid)
            // loaderLoading.current.style.display = "none";
            setCategories(dt);
            // loaderLoading.current.style.display = "none";
            setLoaderMsg("");
        }
        catch (e) {
            console.error(e);
            loaderLoading.current.style.display = "none";
            setLoaderMsg("Failed to load categories!");

        }
    }
    const catClicked = (cid) => {

        jump(`/subcategory/${cid}`)
    }






    function updateStatus() {
        const statusDiv = document.getElementById('status');
        if (navigator.onLine) {
            statusDiv.textContent = "You are Online";
            statusDiv.className = "status-popup online show";
        } else {
            statusDiv.textContent = "You are Offline";
            statusDiv.className = "status-popup offline show";
        }
        statusDiv.style.display = "block";
        setTimeout(() => {
            statusDiv.classList.remove("show");
            setTimeout(() => {
                statusDiv.style.display = "none";
            }, 500);
        }, 3000);
    }

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    const [bannersData, setBannersData] = useState([]);
    // getting banners 
    const getBanners = async () => {
        const re = await fetch(process.env.REACT_APP_URL + "/banner_cust.php?type=Festival&storeid=" + cookie.storeid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await re.json();
        console.log(data);
        setBannersData(data);
    }


    // jumping to banner products of user 
    const navigateToBannerProduct = (festivalid) => {
        jump(`/bnrproducts/${festivalid}`)
    }


    // useEffect functionalities 
    useEffect(() => {
        if (cookie.sp != null) {
            getCategory();
            getBanners();
        }
        else {
            ip.current.focus();
        }


    }, [])

    return (
        <>

            <Tracking />
            <div id="status" className="status-popup"></div>

            {/* loader  */}
            <div ref={loaderLoading} className="loading">
                <p>{loaderMsg}</p>
            </div>
            {/* importing Header from './common/header' */}
            <Header loginPopup={loginPopup} popupBg={popupBg} />

            {/* hero section */}
            <section className="hero">
                <h1>Get Groceries Delivered in Minutes!</h1>
                <p>Fresh fruits, vegetables, and daily essentials at your doorstep.</p>
                <button onClick={() => { catClicked(catId) }}>Shop Now</button>
            </section>

            {/* Banner section coding  */}
            <div className="banner-section">
                {
                    bannersData.map((x, index) => {
                        return (
                            <div onClick={() => { navigateToBannerProduct(x.festivalid) }} key={index} className="banner">
                                <div className="banner-img-div">
                                    <img src={x.pic} alt="" />
                                    <div className="banner-text">
                                        <p>{x.festivalname}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* category section  */}
            <section className="cat">
                {/* checking login then showing category */}
                {cookie.sp !== null && cookie.sp !== undefined ? (<h4>Categories</h4>) : null}

                <div className="container">
                    {
                        categories.map((x, index) => {
                            return (
                                <div key={index} onClick={() => { catClicked(x.catid) }} className="category">
                                    <img src={x.pic} alt="" />
                                    <h6>{x.catname}</h6>
                                </div>
                            )
                        })
                    }
                </div>

            </section>

            {/* items secton  */}
            <div className="fixed-gradiet-section"></div>
            <section className="items-container">
                <h2>Our Items</h2>
                <div className="container">
                    {/* items */}
                    <Link className='link' to="/products">
                        <div className="items">
                            <img src={require("./images/amul_butter.png")} alt="" />
                            <h5>Item 1</h5>
                            <p>₹ 9.99</p>
                        </div>
                    </Link>
                    <div className="items">
                        <img src={require("./images/snacks.png")} alt="" />
                        <h5>Item 2</h5>
                        <p>₹ 19.99</p>
                    </div>
                    <div className="items">
                        <img src={require("./images/snacks.png")} alt="" />
                        <h5>Item 3</h5>
                        <p>₹ 29.99</p>
                    </div>
                    <div className="items">
                        <img src={require("./images/snacks.png")} alt="" />
                        <h5>Item 3</h5>
                        <p>₹ 29.99</p>
                    </div>
                    <div className="items">
                        <img src={require("./images/snacks.png")} alt="" />
                        <h5>Item 3</h5>
                        <p>₹ 29.99</p>
                    </div>
                    <div className="items">
                        <img src={require("./images/snacks.png")} alt="" />
                        <h5>Item 3</h5>
                        <p>₹ 29.99</p>
                    </div>
                    <div className="items">
                        <img src={require("./images/snacks.png")} alt="" />
                        <h5>Item 3</h5>
                        <p>₹ 29.99</p>
                    </div>
                    <div className="items">
                        <img src={require("./images/snacks.png")} alt="" />
                        <h5>Item 3</h5>
                        <p>₹ 29.99</p>
                    </div>
                    <div className="items">
                        <img src={require("./images/snacks.png")} alt="" />
                        <h5>Item 3</h5>
                        <p>₹ 29.99</p>
                    </div>
                </div>
            </section>
            <Userlogin ref={loginPopup} ref1={popupBg} ip={ip} />




            {/* importing Footer from './common/footer' */}
            {/* <Footer/> */}

        </>
    )
}

export default Home