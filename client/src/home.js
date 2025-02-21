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

    const getCategory = async () => {
        setLoaderMsg("Loading Categories...");
        loaderLoading.current.style.display = "block";
        try {
            const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie.storeid, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const dt = await re.json();
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



    useEffect(() => {
        if (cookie.sp != null) {
            getCategory();
            // alert("Cookie:  "+cookie.sp)
        }
        else{
            // if (ip.current) {
                ip.current.focus();
                // ip.current.style.backgroundColor="red";
                
            //   }
            //   else{
                console.log("first")
            //   }
        }


    }, [])


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
                <div className="hero-content">
                    <img src={require("./images/groceryveg.png")} alt="" />
                    <h2>Discover the <span>New</span> Collection</h2>
                    <p>Discover our wide range of milk products, starting from 50% fat free to 99% fat free.</p>
                    <button className="btn btn-success">Shop Now</button>
                </div>
            </section>

            {/* category section  */}
            <section className="cat">
                {/* checking login then showing category */}
                {cookie.sp !== null && cookie.sp !== undefined ? (<h2>Categories</h2>) : null}

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