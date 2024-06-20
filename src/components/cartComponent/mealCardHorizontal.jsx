import { Link } from 'react-router-dom'
import './mealCardHorizontal.css'
import React, { useState, useRef, useEffect } from 'react'

import wellnessImg from '/assets/WellnessLogo.png'
import axios from 'axios';
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function MealCardHorizontal(props) {
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
        F
        setOpen(false);
    };

    console.log(props.data);
    console.log(props.quantity);
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
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`,{
    
            data: test,
            headers: { "authorization": `Bearer ${userLocal.accessToken}` } 
          }
          );
          window.location.reload();
          console.log(response)
        } catch (error) {
          console.log(props.data.id);
          console.log(error)
        }
      }
    return (
        <div className="meal-cart-horizontal">
            {/* {console.log(props)} */}
            <IconButton
                    size="small"
                    aria-label="close"
                    color="error"
                    style={{float:'right'}}
                    onClick={handleDeletefromCart}
                >
                    <CloseIcon fontSize="large" />
                </IconButton>
            <Link to={`/meals/${props.data.id}`} style={{ textDecoration: 'none' }} >
                <img src={wellnessImg} alt="Meal image" style={{ display: isLoading ? "block" : "none" }} />
                <img src={props.data.images[0]} alt="" style={{ display: isLoading ? "none" : "block" }} onLoad={onLoad} />
                <br />
                
                <h4>{props.data.title}</h4>
                <br />
                <h4 className="price">EGP {props.data.price}        </h4>
                <h4 className="price">| Quantity: {props.quantity}</h4>
                </Link>
                


        </div>
    )
}
