import { Link,useNavigate } from 'react-router-dom';
import React,{ useState , useRef,useEffect} from 'react';
import wellnessImg from '/assets/WellnessLogo.png'

export default function CartCard(props) {

    const data=useRef();
    const handleClick=()=>{
      console.log(props.data.current.title,"initialValue")
      localStorage.setItem("inputValue",props.data.current.title)
    }
    console.log(localStorage.getItem("inputValue"),props.data.title)
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
      <img src={wellnessImg} alt="Meal image" style={{ display: isLoading ? "block" : "none" }}/>
      <img src={props.data.images[2]} alt="" style={{ display: isLoading ? "none" : "block" }} onLoad={onLoad}/>
    </Link>
      <span>MEAL</span>
    <h4>{props.data.title}</h4>
    <div className="stars">
      <i className="fa-solid fa-star"></i>
      <span><span className="specific">{props.data.rate} </span>(630)</span>
    </div>
    <h4 className="price">EGP {props.data.price}</h4>
    <a href="#"><i className="fa-solid fa-cart-shopping buy-icon" onClick={handleClick}></i></a>
  </div>
  )
}
