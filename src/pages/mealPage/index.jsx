import { useState } from "react";
import Footer from "../../components/layout/Footer/Footer";
import NavBar from "../../components/layout/NavBar/NavBar";
import useMealPage from "./useMealPage";

export default function MealPage() {

    const { 
        meal,
        mealId,
        selectedQuantity,
        handleQuantityChange,
    } = useMealPage()

    function onLoad() {
        // delay for demo only
        //setTimeout(() => setIsLoading(false), 1000);
    
        setIsLoading(false)
    }
    console.log(meal)
    
    return (
        <>
            <NavBar />
            <div style={styles.poster}>
                <h1>TITLE: {meal.title}</h1>
                {meal.images ? <img style={{border: "5px solid white", width: "100%"}} src={meal.images[2]} alt="Meal Image"/> : null}
                <h4>PRICE: {meal.price}</h4>
                <p>DESCRIPTION: {meal.description}</p>
                <input type="number" value={selectedQuantity} onChange={handleQuantityChange} />
                <h4>Total:{meal.price * selectedQuantity} EGP</h4>
                <button className="btn btn-primary">ADD TO CART</button>
            </div>
            <Footer />
        </>
    )
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
    btn: {
        marginTop: "40px",
    }
};