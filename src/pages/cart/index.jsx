import { useEffect, useState } from "react";
import NavBar from "../../components/layout/NavBar/NavBar";
import CartCard from "../../components/cartItem";

import { Button, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import Footer from "../../components/layout/Footer/Footer";
import MealCard from "../../components/mealCard";
import ProductCard from "../../components/productCard";
import { Link } from "react-router-dom";
import MealCardHorizontal from "../../components/cartComponent/mealCardHorizontal";
import ProductCardHorizontal from "../../components/cartComponent/productCardHorizontal";

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
        totalPrice = 0
        const userLocal = JSON.parse(localStorage.getItem('user'))
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`,
          { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
        console.log(response)

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
            .then(response => {
              const product = response.data
              //console.log(response.data)
              totalPrice += response.data.price * item.quantity
              const tet = {...product, quantity: item.quantity}
              console.log(tet);
              return tet
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
            .then(response => {
              const product = response.data
              totalPrice += response.data.price * item.quantity
              console.log("item.quantity↓");
              const tet = {...product, quantity: item.quantity}
              console.log(tet);
              return tet
            }) // Extract data from response
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
      <br /><br />
      {loading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}

      {mealsLoading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center">

        {(cartData.length !== 0) ? (
          <>
            {dataList.map((data, index) => (
              <Grid item xs="auto" key={data.id}>
                <MealCardHorizontal data={data} quantity={data.quantity}/>
              </Grid>)
            )}
            {productList.map((data, index) => (
              <Grid item xs="auto" key={data.id}>
                <ProductCardHorizontal data={data} quantity={data.quantity}/>
              </Grid>)
            )}
            {!loading && !mealsLoading ? (
              <Grid item xs="123" >
                <div className="price-cart" style={{ textAlign: "center"}}>
                  <h2 style={{ textAlign: "center" }}>Total Price: EGP {totalPrice} </h2>
                  <br />
                  <Link to="/checkout/"><Button variant='contained' color='success'>PURCHASE</Button></Link>
                </div>

              </Grid>
            ) : (
              <>
              </>
            )}
          </>
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ textAlign: "center" }}>Cart Empty</h2>
              <br />
              <Link to="/meals"><Button variant='contained'>Start Shopping!</Button></Link>
            </div>
          </>
        )}
      </Grid>
    </>
  )
  { totalPrice = 0 }
}
