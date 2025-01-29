import { Link } from "react-router-dom"
const Items = () => {
    return (
        <>
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
        </>
    )
}

export default Items