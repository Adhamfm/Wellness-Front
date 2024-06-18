import { useState } from "react";
import Footer from "../../components/layout/Footer/Footer";
import NavBar from "../../components/layout/NavBar/NavBar";
import useMealPage from "./useMealPage";
import Button from '@mui/material/Button';
import "./style.css";

export default function MealPage() {
    const { 
        meal,
        selectedQuantity,
        handleQuantityChange,
        loading,
    } = useMealPage();

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    // Function to handle adding the meal to the cart
    const addToCart = () => {
        // Logic to add the meal to the cart
        // For simplicity, let's just set a flag to indicate that the meal has been added to the cart
        setIsAddedToCart(true);
    };

    console.log(meal);

    return (
        <>
            <NavBar />
            
            <section className="featured-meals">
                    
                <div className="featured-list-title">
                    <div className="title">Meal Page</div>

                    <div className="list-features">
                        <button className="cooker-btn">Cooker</button>
                        <button className="more-btn">More</button>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>

                {loading ? (
                    <p className="des">Loading...</p>
                ) : meal ? (
                    <div className="cart-container-list">
                        {/* <!-- Cart Items --> */}
                        <div className="cart-container">
                            <div className="left">
                                <div className="cart-image">
                                    {meal.images && <img className="cart-image" src={meal.images[0]} alt="Meal Image" />}
                                </div>
                            </div>
                            
                            <div className="right">
                                <h2>TITLE: {meal.title}</h2>
                                <p className="price">PRICE: {meal.price}</p>
                                <p className="des">DESCRIPTION: {meal.description}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="des">Meal not found</p>
                )}
            </section>
            
            <Footer />
        </>
    );
}
// export default function MealPage() {
//     const { 
//         meal,
//         selectedQuantity,
//         handleQuantityChange,
//         loading,
//     } = useMealPage();

//     const [isAddedToCart, setIsAddedToCart] = useState(false);

//     // Function to handle adding the meal to the cart
//     const addToCart = () => {
//         // Logic to add the meal to the cart
//         // For simplicity, let's just set a flag to indicate that the meal has been added to the cart
//         setIsAddedToCart(true);
//     };

//     console.log(meal);

//     return (
//         <>
//             <NavBar />
//             <div style={styles.poster}>
//                 {loading ? (
//                     <p style={styles.p}>Loading...</p>
//                 ) : meal ? (
//                     <div style={styles.mealDetails}>
//                         <h1>{meal.title}</h1>
//                         {meal.images && <img style={{border: "5px solid white", width: "100%"}} src={meal.images[2]} alt="Meal Image" />}
//                         <h4>PRICE: {meal.price}</h4>
//                         <p>DESCRIPTION: {meal.description}</p>
//                         <div style={styles.button}>
//                             {/* Render the button only if the meal hasn't been added to the cart */}
//                             {!isAddedToCart && <Button variant="contained" onClick={addToCart}>Add to Cart</Button>}
//                             {/* Show a message if the meal has been added to the cart */}
//                             {isAddedToCart && <p>Added to Cart</p>}
//                         </div>
//                     </div>
//                 ) : (
//                     <p style={styles.p}>Meal not found</p>
//                 )}
//             </div>
//             <Footer />
//         </>
//     );
// }


// // CSS styles
// const styles = {
//     poster: {
//         display: "flex",
//         width: "50%",
//         marginLeft: "25%",
//         marginTop: "50px",
//         fontFamily: "Libre Baskerville, serif",
//         textAlign: "center",
//         marginBottom: "100px",
//         fontSize: "25px",
//     },
//     button: {
//         marginTop: "40px",
//     },
//     p : {
//         display:"flex",
//         justifyContent:"center",
//         alignItems:"center",
//         fontSize:"50px",
//         marginBottom:"1000px",
//         height:"100vh"
//     },
//     mealDetails: {
//         textAlign: "left", // Align text to the left
//         marginLeft: "50px", // Add space between the photo and details
//     },
// };


