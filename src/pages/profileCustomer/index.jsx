import React, { useEffect, useState } from 'react'
import NavBar from '../../components/layout/NavBar/NavBar'
import axios from 'axios';
import { CircularProgress, Grid } from '@mui/material';
import "./style.css";

export default function ProfileCustomer() {
    const [mealsLoading, setMealsLoading] = useState(false)
    const [customerLoading, setCustomerLoading] = useState(false)
    const [userLoaded, setUserLoaded] = useState(false);
    const [error, setError] = useState('');

    const [customerData, setCustomerData] = useState({
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
        const getCustomerData = async () => {
          try {
            setError("")
            setCustomerLoading(true)
            const userLocal = JSON.parse(localStorage.getItem('user'))
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}`, { headers: { "authorization": `Bearer ${userLocal.accessToken}` } })
            setCustomerData(response.data)
            console.log(response.data);
            setUserLoaded(true)
            setCustomerLoading(false)
          } catch (error) {
            setError("Make sure to use Customer Account")
            setUserLoaded(false)
            setCustomerLoading(false)
            console.log(error)
          }
        };
        getCustomerData()
      }, [])

  return (
   <>
   <NavBar/>
   <h1>Profile Customer</h1>
   {error && <div className="error_text"><Alert severity="error">{error}</Alert></div>/*TODO: CHANGE error TO UI/UX STYLE */}
          <div className="profile_banner">
            <h1>welcome, {customerData.name}</h1>
            {/* <Button onClick={getSellerData} variant="contained"> GET DATA </Button> */}
            {customerLoading && <div className="loading_text"><Grid item xs={12}> <CircularProgress color="inherit" /></Grid></div>}
            <h2>Email:{customerData.email}</h2>
            <h2>Phone Number:{customerData.phone.number}</h2>
            <h2> Following: {customerData.following} </h2>
          </div>
   </>
  )
}
