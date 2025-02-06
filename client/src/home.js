import { Link, useNavigate } from 'react-router-dom'
import Header, { Footer } from './common/common'
import './main.css'
import { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import Userlogin from './userlogin'

const Home = () => {
    const loginPopup = useRef();
    const popupBg = useRef();
    const [categories, setCategories] = useState([]);
    const loaderLoading = useRef()

    const [cookie2, createCookie2, removeCookie2] = useCookies();
    const [cookie, createCookie, removeCookie] = useCookies();



    const jump = useNavigate()

    const getCategory = async () => {

        loaderLoading.current.style.display = "block"
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie.storeid, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const dt = await re.json();
        loaderLoading.current.style.display = "none"
        setCategories(dt)
    }

    const catClicked = (cid) => {
        jump(`/subcategory/${cid}`)
    }


    useEffect(() => {
        if (cookie.sp !== null || cookie.sp !== undefined){
            getCategory();
        }
        
       
    }, [])


    return (
        <>
            {/* loader  */}
            <div ref={loaderLoading} className="loading">
                <p>Loading....</p>
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
                {cookie2.sp2 !== null && cookie2.sp2 !== undefined ? (<h2>Categories</h2>) : null}

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
            <Userlogin ref={loginPopup} ref1={popupBg} />




            {/* importing Footer from './common/footer' */}
            {/* <Footer/> */}

        </>
    )
}

export default Home