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
        const re = await fetch(process.env.REACT_APP_URL + "/categoryapi.php?storeid=" + cookie2.sp2, {
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
        // if ((cookie2.sp2 !== null || cookie2.sp2 ==undefined) && ((cookie.sp !== null || cookie.sp == undefined) )){
        //     // alert(cookie.sp)
        //     getCategory();
        //     // jump('/userlogin');
        // }
        // else {
        //     alert("Please Login First")
        // }
        if (cookie2.sp2 !== null && cookie2.sp2 !== undefined) {
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
                <h2>Categories</h2>
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
                {/* <div className="container">
                    <div className="category">
                        <img src={require("./images/vegetable.png")} alt="" />
                        <h6>Vegetables</h6>
                    </div>
                    <div className="category">
                        <img src={require("./images/fruits.png")} alt="" />
                        <h6>Fruits</h6>
                    </div>
                    <div className="category">
                        <img src={require("./images/snacks.png")} alt="" />
                        <h6>Snacks</h6>
                    </div>
                </div> */}
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