import React, { useState } from 'react';
import NavBar from '../components/layout/NavBar/NavBar';
import './Wishlist.css'
import Footer from '../components/layout/Footer/Footer';
import { color } from '@mui/system';
function Wishlist ()  {
    /////Add items with name and price
    const [items, setItems] = useState([
        { id: 1, name: 'food1',price:"10$" },
        { id: 2, name: 'food2',price: "20$"},
        { id: 3, name: 'food3',price:"30$" },
        { id: 4, name: 'food4',price:"40$" },
      ]);
    ////////remove button  
      const removeItem = (id) => {
        const updatedList = items.filter((item) => item.id !== id);
        setItems(updatedList);
      };  
    return (  
      <div>
      <NavBar></NavBar>
      <br></br>
      <br></br>
      <br></br>
      <h1>WishList Customer</h1> 
      <br></br>
      <br></br>
      <br></br>   
      <div3>
        {items.map((item) => (
          <div2> 
            <p>Item Name: {item.name}</p>
            <img src='https://th.bing.com/th/id/OIP.fn7HURB-a0sY854FLQZXjwHaFi?rs=1&pid=ImgDetMain'></img>
            <p>{item.price}</p>
            {/* <div4>            
            <button onClick={event =>  window.location.href='/products'}>Buy</button>            
            </div4> */}
            <button onClick={() => removeItem(item.id)}>
              Cancel
            </button>
          </div2>
        ))}
      </div3>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footer></Footer>
      </div>
    );
  }
export default Wishlist;
