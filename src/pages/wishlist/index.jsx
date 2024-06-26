import React, { useEffect, useState } from 'react'
import NavBar from '../../components/layout/NavBar/NavBar'
import { Alert, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import MealCard from '../../components/mealCard';
import ProductCard from '../../components/productCard';

export default function WishlistPage() {
    const [loading, setLoading] = useState(false);
    const [allProducts, setAllProducts] = useState([])
    const [allMeals, setAllMeals] = useState([])
    const [allWishlist, setAllWishlist] = useState([]);
    const [wishlist, setWishlist] = useState({});
    const [error, setError] = useState('');

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
                setError("")
                console.log("Sending Request")
                const userLocal = JSON.parse(localStorage.getItem('user'))
                const response1 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/wishlist/`,
                    { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
                const response2 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/wishlist/`,
                    { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
                console.log(response2)
                setWishlist(response2.data)
                setAllWishlist(response1.data.whishlist)
                console.log(response1.data)
                setLoading(false)
            } catch (error) {
                setError("Make sure to use Customer Account")
                setLoading(false)
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

    //get wishlist items
    useEffect(() => {
        const getWishlist = async () => {
            try {

            } catch (error) {
                console.log(error);
            }
        };
        getWishlist()
    }, []);


    return (
        <>
            <NavBar />
            <h1>Wishlist</h1>
            {error && <div className="error_text"><Alert severity="error">{error}</Alert></div>/*TODO: CHANGE error TO UI/UX STYLE */}
            <br /><br />
            <hr />
            <br /><br />
            <h1>Meals Wishlist</h1>
            <br /><br />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="center">

                {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}

                {allMeals.map((meal) =>
                    <Grid item xs="auto" key={meal.id}>
                        <MealCard data={meal} wishlistList={wishlist} />
                    </Grid>)}
            </Grid>
            <br /><br />
            <hr />
            <br /><br />
            <h1>Products Wishlist</h1>
            <br /><br />
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
