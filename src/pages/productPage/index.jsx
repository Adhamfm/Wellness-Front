import Footer from "../../components/layout/Footer/Footer";
import NavBar from "../../components/layout/NavBar/NavBar";
import useProductPage from "./useProductPage"
import './style.css'
import Slider from "../../components/Slider/Slider";

export default function ProductPage() {
    const {
        product,
        productId,
        selectedQuantity,
        handleQuantityChange
    } = useProductPage();


    console.log(product);
    return (
        <>
            <NavBar />
            <section className="featured-products">
        
                {/* <div className="our-recommendation">
                    Our recommendation
                </div> */}

                
                <div className="featured-list-title">
                    <div className="title">Products Page</div>

                    <div className="list-features">
                        <button className="house-btn">House</button>
                        <button className="villa-btn">Villa</button>
                        <button className="apartment-btn">Apartment</button>
                    </div>
                </div>

                <div className="cart-container-list">
                    {/* <!-- Cart Items --> */}
                    <div className="cart-container">
                        <div className="left">
                            <div className="cart-image">
                                    {/* <button className="btn">New Design</button> */}
                                    <Slider images={product.images}/>
                            </div>
                        </div>
                        
                        <div className="right">
                            <h2>TITLE: {product.title}</h2>
                            <p className="price">PRICE: {product.price}</p>
                            <p className="des">DESCRIPTION:{product.description}</p>
                        </div>
                    </div>
                </div>

        </section>
            <Footer />
        </>
    )
}
// export default function ProductPage() {
//     const {
//         product,
//         productId,
//         selectedQuantity,
//         handleQuantityChange
//     } = useProductPage();


//     console.log(product);
//     return (
//         <>
//             <NavBar />
//             <h1>ProductPage</h1>
//             <div style={styles.poster}>
//                 <h2 style={{marginBottom:"10px"}}>TITLE: {product.title}</h2>
//                 <h3 style={{marginBottom:"10px"}}>PRICE: {product.price}</h3>
//                 <p style={{marginBottom:"10px", marginLeft:"10px"}}>DESCRIPTION:{product.description}</p>
//             </div>
//             <Footer />
//         </>
//     )
// }

// // CSS styles
// const styles = {
//     poster: {
//         // width: "50%",
//         // marginLeft: "25%",
//         marginTop: "50px",
//         fontFamily: "Libre Baskerville, serif",
//         // textAlign: "center",
//         marginBottom: "200px",
//         fontSize: "20px",
//     },
// }

