import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import wellnessImg from '/assets/WellnessLogo.png'



export default function ProductCard(props) {
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
  return (
    <div className="product-cart">
      {/* {console.log(props)} */}
      <Link to={`/products/${props.data._id}`} style={{ textDecoration: 'none' }} >
        <img src={wellnessImg} alt="product image" />
      </Link>
        <span>SHOP</span>
      <h4>{props.data.title}</h4>
      <div className="stars">
        <i className="fa-solid fa-star"></i>
        <span><span className="specific">{props.data.finalrate} </span>(630)</span>
      </div>
      <h4 className="price">EGP {props.data.price}</h4>
      <a href="./cart"><i className="fa-solid fa-cart-shopping buy-icon" ></i></a>
    </div>
  )
}
