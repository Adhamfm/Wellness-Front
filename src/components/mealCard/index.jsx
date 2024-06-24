import { Link } from 'react-router-dom'
import './styles.css'
import React, { useState, useRef, useEffect } from 'react'
import Wishlist from './wishlist';
import wellnessImg from '/assets/WellnessLogo.png'
import axios from 'axios';
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function MealCard(props) {
  const [isCustomer, setIsCustomer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
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
  useEffect(() => {
    function checkCustomer() {
        const userType = localStorage.getItem('userType')
        {
            setIsCustomer((userType === 'customer') ? true : false);
        }
    }

    checkCustomer();
}, [isLoggedIn]);
  const wishlist = props.wishlistList?.whishlist ?? [];
  const data = useRef();

  const handleClick = async () => {
    //console.log(props.data);
    console.log(props.data.id);
    try {
      const userLocal = JSON.parse(localStorage.getItem('user'))
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`, {
        itemId: props.data.id,
        quantity: 1
      }, { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
      console.log(response);
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

  //console.log(localStorage.getItem("inputValue"),props.data.title)
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("\assets\WellnessLogo.png")
  function onLoad() {
    // delay for demo only
    //setTimeout(() => setIsLoading(false), 1000);

    setIsLoading(false)
  }
  const handleDeletefromCart = async () => {
    try {
      const userLocal = JSON.parse(localStorage.getItem('user'))
      console.log(userLocal);
      const test = { itemId: props.data.id }
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`, {

        data: test,
        headers: { "authorization": `Bearer ${userLocal.accessToken}` }
      }
      );
      console.log(response)
    } catch (error) {
      console.log(props.data.id);
      console.log(error)
    }
  }
  return (
    <div className="meal-cart">
      <Link to={`/meals/${props.data.id}`} style={{ textDecoration: 'none' }} >
        <img src={wellnessImg} alt="Meal image" style={{ display: isLoading ? "block" : "none" }} />
        <img src={props.data.images[0]} alt="" style={{ display: isLoading ? "none" : "block" }} onLoad={onLoad} />
        <span>MEAL</span>
        <h4>{props.data.title}</h4>
        <div className="stars">
          <i className="fa-solid fa-star"></i>
          <span><span className="specific">{props.data.rate} </span></span>
        </div>
        <h4 className="price">EGP {props.data.price}</h4>
      </Link>
      {/* Code Omitted */}
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

      {isLoggedIn ? (
        <>
          {isCustomer ? (
            <>

              <i className="fa-solid fa-cart-shopping buy-icon" onClick={handleClick}></i>
            </>
          ) : (
            <>
              <Link to="/logincustomer"> <i className="fa-solid fa-cart-shopping buy-icon" onClick={handleClick}></i></Link>
            </>
          )}

          <i className="fa-solid fa-cart-shopping buy-icon" onClick={handleClick}></i>
        </>
      ) : (
        <>
          <Link to="/logincustomer"> <i className="fa-solid fa-cart-shopping buy-icon" onClick={handleClick}></i></Link>
        </>
      )}

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
          <Wishlist id={props.data.id} wishlistList={wishlist} />
        </>
      )}
    </div>
  )
}
