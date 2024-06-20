import React, { useEffect, useState } from 'react'
import './productCardHorizontal.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import wellnessImg from '/assets/WellnessLogo.png'
import Slider from '../Slider/Slider'
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//import MuiImageSlider from 'mui-image-slider';


export default function ProductCardHorizontal(props) {
  const [open, setOpen] = useState(false);
  const location = useLocation() //location.pathname === '/cart'
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("\assets\WellnessLogo.png")
  // if (props.id){
  //   (async () => {
  //     try {
  //       console.log(products)
  //       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${props.id}`)
  //       props.data = response.data
  //       // console.log(response)
  //       setProducts(response.data)
  //   } catch (error) {
  //       console.log(error)
  //   }
  //   })
  // }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    function checkLoggedIn() {
      const user = localStorage.getItem('user') !== null
      {
        user ? (
          setIsLoggedIn(true)
        ) : (
          setIsLoggedIn(false)
        )
      }
    }

    checkLoggedIn();
  }, [isLoggedIn]);

  const handleClick = async () => {
    //console.log(props.data);
    console.log(props.data._id);
    try {
      const userLocal = JSON.parse(localStorage.getItem('user'))
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`, {
        itemId: props.data._id,
        quantity: 1
      }, { headers: { "authorization": `token ${userLocal.accessToken}` } });
      console.log(response)
      handleOpen()
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };



  const handleDeletefromCart = async () => {
    try {
      const userLocal = JSON.parse(localStorage.getItem('user'))
      console.log(userLocal);
      const test = { itemId: props.data._id }
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`,{
    
            data: test,
            headers: { "authorization": `Bearer ${userLocal.accessToken}` } 
          }
          );
      console.log(response)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  function onLoad() {
    // delay for demo only
    //setTimeout(() => setIsLoading(false), 1000);

    setIsLoading(false)
  }
  return (
    <div className="product-cart-horizontal">
      <IconButton
        size="small"
        aria-label="close"
        color="error"
        style={{ float: 'right' }}
        onClick={handleDeletefromCart}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <div className="sldierImages">
        <img src={props.data.images[0]} alt="" style={{ display: isLoading ? "none" : "block" }} onLoad={onLoad} />
        <Link to={`/products/${props.data._id}`} style={{ textDecoration: 'none' }} >
          <span>SHOP</span>
          <h4>{props.data.title}</h4>

          <div className="stars">
            <i className="fa-solid fa-star"></i>
            <span><span className="specific">{props.data.finalrate} </span>(630)</span>
            <h4 className="price">EGP {props.data.price} | Quantity {props.data.quantity}</h4>
          </div>
        </Link>
      </div>

    </div>
  )
}
