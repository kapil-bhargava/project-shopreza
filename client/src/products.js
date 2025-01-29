import React, { useEffect } from 'react'
import Header from './common/common'
import Items from './common/items'

const Products = () => {


  // const getCategory = async () => {
  //   const re = await fetch("https://zninfotech.com/mywork/webapi/categoryapi.php", {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  //   const dt = await re.json();
  //   console.log(dt);
  // }

  // useEffect(() => {
  //   getCategory();
  // }, [])

  return (
    <>
      {/* Using Header from common.js  */}
      <Header />
      {/* product main code  */}
      <div className="product-container">
        <div className="left">
          <div className="product-img-div">
            <img src={require("./images/amul_butter.png")} alt="Product Image" />
          </div>
        </div>

        <div className="right">
          <h4>Amul Salted Butter</h4>
          <p>Product Description</p>
          <h5>₹ 50</h5>
          <button>Add</button>
        </div>
      </div>
      <div className="products-details-container">
        <div className='products-details'>
          <h2>Product Details</h2>
          <p><strong>Salted Butter</strong></p>
          <h3>Type</h3>
          <p>Salted</p>

          <h3>Flavour</h3>
          <p>Ingredients</p>
          <p>Butter, Common Salt</p>

          <h3>Unit</h3>
          <p>100 g</p>

          <h3>Key Features</h3>
          <ul>
            <li>Made from the finest cream</li>
            <li>Natural and pure</li>
          </ul>

          <h3>FSSAI License</h3>
          <p>10012021000071</p>

          <h3>Shelf Life</h3>
          <p>12 months</p>

          <h3>Return Policy</h3>
          <p>
            This Item is non-returnable. For a damaged, defective, incorrect or expired item,
            you can request a replacement within 72 hours of delivery. In case of an incorrect
            item, you may raise a replacement or return request only if the item is sealed/unopened/unused
            and in original condition.
          </p>

          <h3>Manufacturer Details</h3>
          <p>
            Kaira District Co-operative Milk Producers' Union Limited, Anand 388 001. At Food Complex
            Mogar, Mogar. Lic. No. - 10014021001010.
          </p>
          <h3>Country of Origin</h3>
          <p>India</p>

          <h3>Customer Care Details</h3>
          <p>Email: info@blinkit.com</p>

          <h3>Seller</h3>
          <p>TAMS GLOBAL PRIVATE LIMITED</p>

          <h3>Seller FSSAI</h3>
          <p>12722066002910</p>

          <h3>Description</h3>
          <p>
            Made from the freshest of cream, the Amul butter has wonderful taste which is delicate
            and slightly salty. This finely processed butter is natural, pure and tastes best with
            toasts and sandwiches. Has a natural and pure formulation that gives a great taste. Made
            from fresh cream that has a delicious flavour. Spread it over toast or cook your curries
            in it for a heavenly taste.
          </p>

          <h3>Disclaimer</h3>
          <p>
            Every effort is made to maintain accuracy of all information. However, actual product
            packaging and materials may contain more and/or different information. It is recommended
            not to solely rely on the information presented.
          </p>
        </div>
      </div>




      {/* <Items /> */}

    </>
  )
}

export default Products