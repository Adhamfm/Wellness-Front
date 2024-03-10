import './styles.css'

export default function RestHome() {
    return (
        <>
            <section id="landing">
                <h2>Unbeatable deals</h2>
                <h1>On healthy meals</h1>
                <button>Discover now</button>
            </section>

            <section id="shops" className="main-padding">
                <div className="shops-collection">
                    <h1>Shop1</h1>
                    <h1>Shop2</h1>
                    <h1>Shop3</h1>
                    <h1>Shop4</h1>
                    <h1>Shop5</h1>
                    <h1>Shop6</h1>
                </div>
            </section>

            <section className="product-section">
                <div className="top main-padding">
                    <h1>Top dishes</h1>
                    <div className="view_all_btn">
                        <a href=""><button>View all</button></a>
                    </div>
                </div>
                <div className="pro-collection ">
                    <div className="product-cart">
                        <img src="src/assets/MealTest.jpg" alt="product image" />
                        <span>Shop</span>
                        <h4>Healthy Dish</h4>
                        <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <span><span className="specific">4.5 </span>(630)</span>
                        </div>
                        <h4 className="price">EGP 260</h4>
                        <a href="#"><i className="fa-solid fa-cart-shopping buy-icon"></i></a>
                    </div>
                    <div className="product-cart">
                        <img src="src/assets/MealTest.jpg" alt="product image" />
                        <span>Shop</span>
                        <h4>Healthy Dish</h4>
                        <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <span><span className="specific">4.5 </span>(630)</span>
                        </div>
                        <h4 className="price">EGP 260</h4>
                        <a href="#"><i className="fa-solid fa-cart-shopping buy-icon"></i></a>
                    </div>
                    <div className="product-cart">
                        <img src="src/assets/MealTest.jpg" alt="product image" />
                        <span>Shop</span>
                        <h4>Healthy Dish</h4>
                        <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <span><span className="specific">4.5 </span>(630)</span>
                        </div>
                        <h4 className="price">EGP 260</h4>
                        <a href="#"><i className="fa-solid fa-cart-shopping buy-icon"></i></a>
                    </div>
                    <div className="product-cart">
                        <img src="src/assets/MealTest.jpg" alt="product image" />
                        <span>Shop</span>
                        <h4>Healthy Dish</h4>
                        <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <span><span className="specific">4.5 </span>(630)</span>
                        </div>
                        <h4 className="price">EGP 260</h4>
                        <a href="#"><i className="fa-solid fa-cart-shopping buy-icon"></i></a>
                    </div>

                </div>
            </section>

            <section id="info" className="main-padding">
                <div className="info-collection">
                    <div className="info-col">
                        <div>
                            100+</div>
                        <div> Satisfied customers
                        </div>
                    </div>
                    <div className="info-col">
                        <div>
                            4.0</div>
                        <div> Customer rating
                        </div>
                    </div>
                    <div className="info-col">
                        <div>
                            200+</div>
                        <div> Healthy recipes
                        </div>
                    </div>
                </div>
            </section>

            <section className="product-section recipe-section">
                <div className="top main-padding">
                    <h1>Recipes</h1>
                    <div className="view_all_btn">
                        <a href=""><button>View all</button></a>
                </div>
            </div>
            <div className="pro-collection ">
                <div className="product-cart">
                    <img src="src/assets/MealTest.jpg" alt="product image" />
                    <span>Chef</span>
                    <h4>Recipe</h4>
                    <div className="stars">
                        <i className="fa-solid fa-star"></i>
                        <span><span className="specific">4.5 </span>(630)</span>
                    </div>
                </div>
                <div className="product-cart">
                    <img src="src/assets/MealTest.jpg" alt="product image" />
                    <span>Chef</span>
                    <h4>Recipe</h4>
                    <div className="stars">
                        <i className="fa-solid fa-star"></i>
                        <span><span className="specific">4.5 </span>(630)</span>
                    </div>
                </div>
                <div className="product-cart">
                    <img src="src/assets/MealTest.jpg" alt="product image" />
                    <span>Chef</span>
                    <h4>Recipe</h4>
                    <div className="stars">
                        <i className="fa-solid fa-star"></i>
                        <span><span className="specific">4.5 </span>(630)</span>
                    </div>
                </div>
                <div className="product-cart">
                    <img src="src/assets/MealTest.jpg" alt="product image" />
                    <span>Chef</span>
                    <h4>Recipe</h4>
                    <div className="stars">
                        <i className="fa-solid fa-star"></i>
                        <span><span className="specific">4.5 </span>(630)</span>
                    </div>

                </div>
            </div>
        </section >
            <section id="newsletter" className="">
                <div className="container main-padding">

                    <div className="new-text">
                        <div>
                            Stay in touch for newsletters
                        </div>
                        <div>
                            get updates about latest dishes & offers
                        </div>
                    </div>
                    <label>
                        <input type="text" placeholder="" />
                        <button>Submit</button>
                    </label>
                </div>
            </section>
    </>
  )
}
