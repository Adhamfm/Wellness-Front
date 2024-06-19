import { CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../productCard';

export default function ProductSection(props) {
    const { sellerData } = props
    const [productsLoading, setProductsLoading] = useState(false)
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        async function fetchData() {
            setProductsLoading(true)
            try {
                const promises = sellerData.products.map(id =>
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`)
                        .then(response => response.data) // Extract data from response
                        .catch(error => {
                            console.error(`Error fetching product ${id}:`, error);
                            return null; // Return null for failed requests
                        }
                        ));
                const responses = await Promise.all(promises);
                // const data = responses.map(response => response.data);
                const filteredData = responses.filter(data => data !== null);
                setProductList(filteredData);
                setProductsLoading(false)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [sellerData.products]);
    return (
        <>
            {productsLoading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}
            {productList.length === 0 && !productsLoading ? (
                <div>
                    <br />
                    <p style={{fontSize:"16px"}}>
                    Empty
                </p>
                </div>
            ) : (
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
                    {productList.map((data) => (
                        <Grid item xs="auto" key={data.id}>
                            <ProductCard data={data} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}
