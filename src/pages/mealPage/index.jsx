import { useState } from "react";
import Footer from "../../components/layout/Footer/Footer";
import NavBar from "../../components/layout/NavBar/NavBar";
import useMealPage from "./useMealPage";

import Button from '@mui/material/Button';

export default function MealPage() {
    const { 
        meal,
        mealId,
        selectedQuantity,
        handleQuantityChange,
    } = useMealPage();

    const [isAddedToCart, setIsAddedToCart] = useState(false);

    // Function to handle adding the meal to the cart
    const addToCart = () => {
        setIsAddedToCart(true);
    };

    console.log(meal);

    return (
        <>
            <NavBar />
            <div style={styles.poster}>
                <h1>TITLE: {meal.title}</h1>
                {meal.images && <img style={{border: "5px solid white", width: "100%"}} src={meal.images[2]} alt="Meal Image" />}
                <h4>PRICE: {meal.price}</h4>
                <p>DESCRIPTION: {meal.description}</p>
                <div style={styles.button}>
                    {/* Render the button only if the meal hasn't been added to the cart */}
                    {!isAddedToCart && <Button variant="contained" onClick={addToCart}>Add to Cart</Button>}
                    {/* Show a message if the meal has been added to the cart */}
                    {isAddedToCart && <p>Added to Cart</p>}
                </div>
            </div>
            <Footer />
        </>
    );
}

// CSS styles
const styles = {
    poster: {
        width: "50%",
        marginLeft: "25%",
        marginTop: "50px",
        fontFamily: "Libre Baskerville, serif",
        textAlign: "center",
        marginBottom: "100px",
        fontSize: "25px",
    },
    button: {
        marginTop: "40px",
    }
};
