import { Link } from 'react-router-dom'
import './styles.css'
import React, { useState, useRef, useEffect } from 'react'
import Wishlist from './wishlist';
import wellnessImg from '/assets/WellnessLogo.png'
import axios from 'axios';

export default function MealCard(props) {
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
    } catch (error) {
      console.log(error);
    }
  }
  //console.log(localStorage.getItem("inputValue"),props.data.title)
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("\assets\WellnessLogo.png")
  function onLoad() {
    // delay for demo only
    //setTimeout(() => setIsLoading(false), 1000);

    setIsLoading(false)
  }
  return (
    <div className="meal-cart">
      {/* {console.log(props)} */}
      <Link to={`/meals/${props.data.id}`} style={{ textDecoration: 'none' }} >
        <img src={wellnessImg} alt="Meal image" style={{ display: isLoading ? "block" : "none" }} />
        <img src={props.data.images[2]} alt="" style={{ display: isLoading ? "none" : "block" }} onLoad={onLoad} />
      </Link>
      <span>MEAL</span>
      <h4>{props.data.title}</h4>
      <div className="stars">
        <i className="fa-solid fa-star"></i>
        <span><span className="specific">{props.data.rate} </span>(630)</span>
      </div>
      <h4 className="price">EGP {props.data.price}</h4>
      {isLoggedIn ? (
        <>
          <i className="fa-solid fa-cart-shopping buy-icon" onClick={handleClick}></i>
        </>
      ) : (
        <>
           <Link to="/logincustomer"> <i className="fa-solid fa-cart-shopping buy-icon" onClick={handleClick}></i></Link>
        </>
      )}

      <Wishlist id={props.data.id} wishlistList={wishlist} />
    </div>
  )
}
