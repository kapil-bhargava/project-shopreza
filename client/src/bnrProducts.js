import React, { useEffect, useRef, useState } from 'react'
import Header from './common/common'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const BnrProducts = () => {
    // refs 
    const loaderWaiting = useRef();
    const loaderLoading = useRef();
    const [cookie, createcookie, removecookie] = useCookies();
    // params for festivalid
    const { festivalid } = useParams();
    const [bannerProductsData, setBannerProductsData] = useState([])

    // getting banner products 
    const getBannerProducts = async () => {

        // setFestivalId(festivalid);
        loaderLoading.current.style.display = "block";
        try {
            // const re = await fetch(process.env.REACT_APP_URL + "/festivalproductapi.php?festivalid=" + festivalid, {
            const re = await fetch(`${process.env.REACT_APP_URL}/bannerproduct_cust.php?festivalid=${festivalid}&mobile=${cookie.sp}&storeid=${cookie.storeid}`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await re.json();
            loaderLoading.current.style.display = "none";
            console.log(data)
            setBannerProductsData(data);

            // // console.log(data[0].status)
            // for (let i = 0; i < data.length; i++) {

            //     if (data[i].status === "yes") {
            //         if (switchDiv.current) {
            //             switchDiv.current.classList.add("on");
            //         }
            //         // sliderDiv.current.classList.add(" on");
            //     }

            // }
        }
        catch (error) {
            loaderLoading.current.style.display = "none";
            alert("get banner products error: " + error.message)
        }
    }

    
    const fetchRef = useRef(false);

    useEffect(() => {
        if (!fetchRef.current) {
            fetchRef.current = true; // Mark as fetched
            getBannerProducts();
        }
    }, []);



    return (
        <>
            <Header />

            {/* ========== User Banner Product Code==========  */}
            <div className="banner-product-container">
                <h1>Top Selling Products</h1>
                <div className="product-grid">
                    {/* Product grid */}
                </div>
            </div>

            {/* Loaders and Waiter  */}
            {/* loader  */}
            <div ref={loaderLoading} className="loading" >
                <p>Loading....</p>
            </div >

            {/* wait  */}
            <div ref={loaderWaiting} className="loading" >
                <p>Please wait....</p>
            </div >


        </>
    )
}

export default BnrProducts