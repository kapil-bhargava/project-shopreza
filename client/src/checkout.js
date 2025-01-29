import Header from "./common/common"

const Checkout = () => {
    const cartCount = () => {
        // update cart count here
    }
    return (
        <>
            <Header />
            {/* checkout page */}
            <div className="checkout-container">
                {/* <h2>Checkout</h2> */}
                <div className="checkout-product-container">
                    <div className="cart-items">

                        <div className="item">
                            <img src={require("./images/fruits.png")} alt="" />
                            <div className="item-details">
                                <p>g</p>
                                <p>oio</p>
                                <strong><p>97</p></strong>
                            </div>
                            <div className="quantity">
                                <button className="quantity-btn" onClick={() => { cartCount() }}>-</button>
                                <span>67</span>
                                <button className="quantity-btn" onClick={() => { cartCount() }}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-address-container">
                    {/* <h2>Delivery Address</h2> */}
                    <div className="address-form">
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Phone Number" />
                        <input type="text" placeholder="Address" />
                    </div>
                    <div className="payment-method">
                        <input type="radio" name="payment" id="cod" />
                        <label for="cod">Cash on Delivery</label>
                        <input type="radio" name="payment" id="paypal" />
                        <label for="paypal">PayPal</label>
                        <button className="checkout-btn">Proceed to Pay</button>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Checkout