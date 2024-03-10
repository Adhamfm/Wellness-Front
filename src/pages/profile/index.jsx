import { Button, CircularProgress, Grid, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/layout/NavBar/NavBar'
import axios from 'axios'
import ProductCard from '../../components/productCard'
import MealCard from '../../components/mealCard'
import ProductSection from '../../components/profile/productSection'



// const test = {
// 	message: "success",
// 	userId: "65d254a38b4f88821f67d867",
// 	accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQyNTRhMzhiNGY4ODgyMWY2N2Q4NjciLCJpYXQiOjE3MTAwMDg5MjIsImV4cCI6MTcxMjYwMDkyMn0.8Vm3WtYZjvuvQXrm86JiWhLmzPynml_qwjrRRlNiyMY",
// 	refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQyNTRhMzhiNGY4ODgyMWY2N2Q4NjciLCJpYXQiOjE3MDk1ODM5OTMsImV4cCI6MTcxMjE3NTk5M30.bo_yO1NJGAspUXvCfWeZ-mm3DhnDanv32Fg5RChz7Io"
// }


export default function profile() {

  const [mealsLoading, setMealsLoading] = useState(false)
  const [sellerLoading, setSellerLoading] = useState(false)


  const [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    phone: {
      countryCode: "",
      number: ""
    },
    meals: [],
    products: []
  })

  useEffect(() => {
    const getSellerData = async () => {
      try {
        setSellerLoading(true)
        const userLocal = JSON.parse(localStorage.getItem('user'))
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/seller/${userLocal.userId}`, { headers: { "authorization": `Bearer ${userLocal.accessToken}` } })
        setSellerData(response.data)
        setSellerLoading(false)
      } catch (error) {
        console.log(error)
      }
    };
    getSellerData()
  }, [])

  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setMealsLoading(true)
        const promises = sellerData.meals.map(id =>
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals/${id}`)
        );
        const responses = await Promise.all(promises);
        const data = responses.map(response => response.data);
        setDataList(data);
        setMealsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [sellerData.meals]);





  return (
    <>
      <NavBar />
      <h1>profile</h1>
      {/* <Button onClick={getSellerData} variant="contained"> GET DATA </Button> */}
      {sellerLoading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}
      <h2>{sellerData.name}</h2>
      <h3>MY MEALS</h3>
      {mealsLoading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center">
        {dataList.map((data, index) => (
          <Grid item xs="auto" key={data.id}>
            <MealCard data={data} />
          </Grid>)
        )}
      </Grid>
      <br /><br />
      <hr />
      <br /><br />
      <h3>MY PRODUCTS</h3>
      <ProductSection sellerData={sellerData}/>
    </>
  )
}