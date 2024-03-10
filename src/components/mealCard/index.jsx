import { Link } from 'react-router-dom'
import './styles.css'
import { useState } from 'react'

export default function MealCard(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState("src\assets\WellnessLogo.png")
    function onLoad() {
        // delay for demo only
        //setTimeout(() => setIsLoading(false), 1000);
    
        setIsLoading(false)
      }
  return (
    <div className="meal-cart">
    {/* {console.log(props)} */}
    <Link to={`/meals/${props.data.id}`} style={{ textDecoration: 'none' }} >
      <img src="src\assets\WellnessLogo.png" alt="Meal image" style={{ display: isLoading ? "block" : "none" }}/>
      <img src={props.data.images[2]} alt="" style={{ display: isLoading ? "none" : "block" }} onLoad={onLoad}/>
    </Link>
      <span>MEAL</span>
    <h4>{props.data.title}</h4>
    <div className="stars">
      <i className="fa-solid fa-star"></i>
      <span><span className="specific">{props.data.rate} </span>(630)</span>
    </div>
    <h4 className="price">EGP {props.data.price}</h4>
    <a href="#"><i className="fa-solid fa-cart-shopping buy-icon"></i></a>
  </div>
  )
}
