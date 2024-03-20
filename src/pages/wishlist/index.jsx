import React, { useEffect, useState } from 'react'
import NavBar from '../../components/layout/NavBar/NavBar'
import { CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import MealCard from '../../components/mealCard';
import ProductCard from '../../components/productCard';

export default function WishlistPage() {
    const [loading, setLoading] = useState(false);
    const [allProducts, setAllProducts] = useState([])
    const [allMeals, setAllMeals] = useState([])
    const [allWishlist, setAllWishlist] = useState([]);

    function getMealItemsFromWishlist(wishlist) {
        return wishlist.filter(item => item.type === "meal");
    }
    function getProductItemsFromWishlist(wishlist) {
        return wishlist.filter(item => item.type === "product");
    }

    useEffect(() => {
        const getAllWishlist = async () => {
            try {
                setLoading(true)
                console.log("Sending Request")
                const userLocal = JSON.parse(localStorage.getItem('user'))
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/wishlist/`,
                    { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
                setAllWishlist(response.data.whishlist)
                console.log(response.data)
                setLoading(false)

            } catch (error) {
                console.log(error);
            }
        };
        getAllWishlist()
    }, []);

    useEffect(() => {
        const setMeals = async () => {
            setAllMeals(getMealItemsFromWishlist(allWishlist));
        };
        const setProducts = async () => {
            setAllProducts(getProductItemsFromWishlist(allWishlist));
        };
        setMeals()
        setProducts()
    }, [allWishlist]);


    //get wishlist items



    return (
        <>
            <NavBar />
            <h1>Wishlist</h1>
            <br /><br />
            <hr />
            <br /><br />
            <h1>Meals Wishlist</h1>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="center">

                {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}

                {allMeals.map((meal) =>
                    <Grid item xs="auto" key={meal.id}>
                        <MealCard data={meal} />
                    </Grid>)}
            </Grid>
            <br /><br />
            <hr />
            <br /><br />
            <h1>Products Wishlist</h1>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="center">

                {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}


                {allProducts.map((product) =>
                    <Grid item xs="auto" key={product._doc._id}>
                        <ProductCard data={product._doc} />
                    </Grid>)}
            </Grid>
        </>
    )
}
