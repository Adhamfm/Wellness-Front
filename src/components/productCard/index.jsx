import React, { useEffect, useState } from 'react'
import './styles.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import wellnessImg from '/assets/WellnessLogo.png'
import Slider from '../Slider/Slider'
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//import MuiImageSlider from 'mui-image-slider';


export default function ProductCard(props) {
  const [open, setOpen] = useState(false);
  const location = useLocation() //location.pathname === '/cart'
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
    </>
  );

  const handleDeletefromCart = async () => {
    try {
      const userLocal = JSON.parse(localStorage.getItem('user'))
      console.log(userLocal);
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`, 
        {itemId: props.data._id} , { headers: { "authorization": `Bearer ${userLocal.accessToken}` } }
      );
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="product-cart">
      {/* {console.log(props)} */}
      {/* <img src={props.data.images[0]} alt="product image" /> */}
      <Slider images={props.data.images} />
      <Link to={`/products/${props.data._id}`} style={{ textDecoration: 'none' }} >
        <span>SHOP</span>
        <h4>{props.data.title}</h4>
        <Snackbar

          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          variant="success"

          action={action}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
            style={{ fontSize: "16px" }}
          >
            Added to Cart
          </Alert>
        </Snackbar>
        <div className="stars">
          <i className="fa-solid fa-star"></i>
          <span><span className="specific">{props.data.finalrate} </span>(630)</span>
        </div>
        <h4 className="price">EGP {props.data.price}</h4>
      </Link>
      {location.pathname === '/cart' ? (

        <IconButton
        size="small"
        aria-label="close"
        color="error"
        onClick={handleDeletefromCart}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      ) : (
        <>
        </>
      )}
      {isLoggedIn ? (
        <>
          <i className="fa-solid fa-cart-shopping buy-icon" onClick={handleClick}></i>
        </>
      ) : (
        <>
          <Link to="/logincustomer"> <i className="fa-solid fa-cart-shopping buy-icon" onClick={handleClick}></i></Link>
        </>
      )}
    </div>
  )
}
