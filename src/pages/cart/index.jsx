import { useEffect, useState } from "react";
import NavBar from "../../components/layout/NavBar/NavBar";
import CartCard from "../../components/cartItem";

import { CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import Footer from "../../components/layout/Footer/Footer";



export default function Cart() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])

    const [allMeals, setAllMeals] = useState([]);

    useEffect(() => {
        const getAllMeals = async () => {
            try {
                setLoading(true)
                console.log("Sending Request")
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals`);
                setAllMeals(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        getAllMeals()
    }, []);




    return (
        <>
            <NavBar />
            <h1>Cart</h1>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="center">


                {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}

                {allMeals.map((meal) =>
                    <Grid item xs="auto" key={meal.id}>
                        <CartCard data={meal} />
                    </Grid>)}
            </Grid>
            <Footer/>
        </>
    )
}
