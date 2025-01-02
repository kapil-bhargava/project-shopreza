import React, { useEffect, useState } from 'react'
import Header from './common/header'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const SubCategory = () => {
    const { cid } = useParams()
    const [subcatdata, setsubcatdata] = useState([]);
    const [productdata, setproductdata] = useState([]);
    const sub = async () => {
        const re = await fetch(`https://zninfotech.com/mywork/webapi/subcategoryapi.php?cid=${cid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await re.json()
        setsubcatdata(data)
    }
    const getProduct = async (scid) => {
        document.getElementById("loader").style.display = "block"
        const re = await fetch(`https://zninfotech.com/mywork/webapi/productapi.php?scid=${scid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await re.json()
        document.getElementById("loader").style.display = "none";
        setproductdata(data)
    }
    useEffect(() => {
        sub()
    }, [])
    return (
        <>
            <div id='loader' className="loading">
                <h1>Loading....</h1>
            </div>
            <Header />
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
                    {
                        productdata.map((x, index) => {
                            return (
                                <div key={index} className="items">
                                    <img src={x.pic} alt={x.pic} />
                                    <h5>{x.productname}</h5>
                                    <p>₹ {x.available_units[0].price}</p>
                                    {/* <Link to={`/product/${x.productid}`}>View Details</Link> */}
                                </div>
                            )
                        })
                    }

                </aside>
            </section>
            <section className="sub-cat-container-2">

            </section>

        </>
    )
}

export default SubCategory