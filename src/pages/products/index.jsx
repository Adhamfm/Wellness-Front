import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard'
import { Button, CircularProgress, Grid } from '@mui/material'
import NavBar from '../../components/layout/NavBar/NavBar'
import axios from 'axios'



export default function Products() {

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([])
    // async function getProductsData() {
    //     try {
    //         setLoading(true)
    //         console.log(products)
    //         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`)
    //         // console.log(response)
    //         setProducts(response.data)
    //         setLoading(false)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                setLoading(true)
                console.log(products)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`)
                // console.log(response)
                setProducts(response.data)
                setLoading(false)
    
            } catch (error) {
                console.log(error)
            }
        }
        getAllProducts();
    }, []) 

    return (
        <>
            <NavBar />
            <h1>PRODUCTS</h1> <br />
            {/* <Button onClick={getProductsData} variant="contained"> GET USER DATA </Button> */}
            {/* {console.log(products)} */}
            {/* {import.meta.env.VITE_BACKEND_URL} */}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="center">
                {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}

                {products.map((product) =>
                    <Grid item xs="auto" key={product._id}>
                        <ProductCard data={product}/>
                    </Grid>)}
            </Grid>
        </>
    )
}