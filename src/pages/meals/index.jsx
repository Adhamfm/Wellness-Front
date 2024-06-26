import { useEffect, useState } from "react";
import NavBar from "../../components/layout/NavBar/NavBar";
import MealCard from "../../components/mealCard";

import { CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import Footer from "../../components/layout/Footer/Footer";



export default function Meals() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])

    const [allMeals, setAllMeals] = useState([]);
    const [wishlist, setWishlist] = useState({});

    useEffect(() => {
        const getAllMeals = async () => {
            try {
                setLoading(true)
                console.log("Sending Request")
                const response1 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals`);
                const userLocal = JSON.parse(localStorage.getItem('user'))
                try {
                    const response2 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/wishlist/`,
                        { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
                    console.log(response2)
                    setWishlist(response2.data)
                } catch (error) {
                    console.log(error);
                }
                setAllMeals(response1.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        getAllMeals()
    }, []);


    //get wishlist items
    // useEffect(() => {
    //     const getWishlist = async () => {
    //         try {

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getWishlist()
    // }, []);


    return (
        <>
            <NavBar />
            <h1>MEALS</h1>
            <br /><br /><br />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="center">

                {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}
                


                {allMeals.map((meal) =>
                    <Grid item xs="auto" key={meal.id}>
                        <MealCard data={meal} wishlistList={wishlist} />
                    </Grid>)}
            </Grid>
            {/* <Footer /> */}
        </>
    )
}
