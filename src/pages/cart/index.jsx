import { useEffect, useState } from "react";
import NavBar from "../../components/layout/NavBar/NavBar";
import CartCard from "../../components/cartItem";

import { Button, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import Footer from "../../components/layout/Footer/Footer";
import MealCard from "../../components/mealCard";
import ProductCard from "../../components/productCard";
import { Link } from "react-router-dom";

var totalPrice = 0;

export default function Cart() {
    const [mealsLoading, setMealsLoading] = useState(false)
    const [loading, setLoading] = useState(false);
    const [dataLoaded, setDataLoading] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [products, setProducts] = useState([])
    const [allMeals, setAllMeals] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const getInCart = async () => {
            try {
                setLoading(true)
                const userLocal = JSON.parse(localStorage.getItem('user'))
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`,
                    { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
                console.log(response)
                console.log(response.data.cart)
                setCartData(response.data.cart)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        getInCart()
    }, []);

    useEffect(() => {
        async function fetchData() {
          try {
            setMealsLoading(true)
            const promises = cartData.map(item =>
            // if id is for meal 
              axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals/${item.itemId}`)
                .then(response =>{ 
                    //console.log(response.data)
                    totalPrice += response.data.price*item.quantity
                    return response.data
                }) // Extract data from response
                .catch(error => {
                  console.error(`Error fetching product ${item.itemId}:`, error);
                  return null; // Return null for failed requests
                }
                ));
            const responses = await Promise.all(promises);
            // const data = responses.map(response => response.data);
            const filteredData = responses.filter(data => data !== null);
            setDataList(filteredData);
            setMealsLoading(false)
          } catch (error) {
            console.log(error);
          }
        }
    
        fetchData();
      }, [cartData]);

    useEffect(() => {
        async function fetchData() {
          try {
            setMealsLoading(true)
            const promises = cartData.map(item =>
            // if id is for meal 
              axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${item.itemId}`)
                .then(response =>{
                    totalPrice += response.data.price*item.quantity
                    return response.data}) // Extract data from response
                .catch(error => {
                  console.error(`Error fetching product ${item.itemId}:`, error);
                  return null; // Return null for failed requests
                }
                ));
            const responses = await Promise.all(promises);
            // const data = responses.map(response => response.data);
            const filteredData = responses.filter(data => data !== null);
            setProductList(filteredData);
            setMealsLoading(false)
          } catch (error) {
            console.log(error);
          }
        }
    
        fetchData();
      }, [cartData]);

console.log(totalPrice);
    return (
        <>
            <NavBar />
            <h1>Cart</h1>
            {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}

            {mealsLoading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center">
            {dataList.map((data, index) => (
              <Grid item xs="auto" key={data.id}>
                <MealCard data={data} />
              </Grid>)
            )}
            {productList.map((data, index) => (
              <Grid item xs="auto" key={data.id}>
                <ProductCard data={data} />
              </Grid>)
            )}
          </Grid>
          {!loading&&!mealsLoading ? (
            <div style={{textAlign:"center"}}>
              <h2 style={{textAlign:"center"}}>Total Price: EGP {totalPrice}</h2>
              <Link to=""><Button variant='contained' color='success'>PURCHASE</Button></Link>
            </div>
          ) : (
            <>
            </>
          )}
        </>
    )
}
