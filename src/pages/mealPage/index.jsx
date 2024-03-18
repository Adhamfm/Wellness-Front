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
            <h1>TITLE: {meal.title}</h1>
            {meal.images ? <img src={meal.images[2]} alt="Meal Image"/> : null}
            <h4>PRICE: {meal.price}</h4>
            <p>DESCRIPTION: {meal.description}</p>
            
        </>
    )
}
