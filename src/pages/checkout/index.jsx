import { useState, useContext } from 'react';
import { AppStates } from '../check/index';
import './Checkout.css'; 
import NavBar from "../../components/layout/NavBar/NavBar";
import { TextField } from '@mui/material';

function Checkout() {
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cardNumber, setCardNumber] = useState('');
    const [cardPin, setCardPin] = useState('');

    const statesSetters = [setCity, setEmail, setPhone, setCardNumber, setCardPin];

    const [cityError, setCityError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [cardPinError, setCardPinError] = useState('');

    const errors = [cityError, emailError, phoneError, cardNumberError, cardPinError];

    const { cartElements, totalPrice } = useContext(AppStates);

    const handleCityError = (e) => {
        if (!(/^[a-zA-Z\s-]{2,50}$/.test(e.target.value))) {
            setCityError('Please enter a valid city!');
        } else {
            setCityError('');
        }
    };

    const handleEmailError = (e) => {
        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value))) {
            setEmailError('Please enter a valid email address!');
        } else {
            setEmailError('');
        }
    };

    const handlePhoneError = (e) => {
        if (!(/^[0-9\s-()+]{10,15}$/.test(e.target.value))) {
            setPhoneError('Please enter a valid phone number!');
        } else {
            setPhoneError('');
        }
    };

    const handleCardNumberError = (e) => {
        if (e.target.value.length > 19 || e.target.value.length < 16) {
            setCardNumberError('Card Number must be between 16 and 19 digits');
        } else {
            setCardNumberError('');
        }
    };

    const handleCardPinError = (e) => {
        if (e.target.value.length > 6 || e.target.value.length < 4) {
            setCardPinError('Card PIN must be between 4 and 6 digits');
        } else {
            setCardPinError('');
        }
    };

    const sendCheckout = (e) => {
        e.preventDefault();
        
        if (errors.filter(err => err !== "").length === 0) {
            alert('Your payment is done successfully!');
            setCartElements([]);
            statesSetters.forEach(ss => ss(""));
        } else {
            alert(errors.filter(err => err !== "")[0]);
        }
    };

    return (
        <>
        <h1 className='checkout'>CheckOut</h1>
        <div className="checkoutContainer">
            <div className="formWrapper">
                <form onSubmit={sendCheckout}>
                    <h1>Delivery info</h1>

                    <input className="in-put" type="text" value={city} 
                    placeholder='City'
                    onChange={(e) => setCity(e.target.value)}
                    onBlur={handleCityError}
                    />
                    {cityError && <p className="error">*{cityError}</p>}

                    <input className="in-put" type="email" value={email} 
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailError}
                    />
                    {emailError && <p className="error">*{emailError}</p>}

                    <input className="in-put" type="text" value={phone} 
                    placeholder='Phone number'
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={handlePhoneError}
                    />
                    {phoneError && <p className="error">*{phoneError}</p>}
                    
                    <h1>Payment info</h1>
                    
                    <input className="in-put" type="text" value={cardNumber} 
                    maxLength="19" minLength="13" placeholder='Card number'
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                    onBlur={handleCardNumberError}
                    />
                    {cardNumberError && <p className="error">*{cardNumberError}</p>}
                    <input className="in-put" type="password" value={cardPin} 
                    maxLength="6" minLength="4" placeholder='CVV'
                    onChange={(e) => setCardPin(e.target.value.replace(/\D/g, ''))}
                    onBlur={handleCardPinError}
                    />
                    {cardPinError && <p className="error">*{cardPinError}</p>}

                    <button type="submit" className='btn'>Complete Payment</button>
                </form>
            </div>
            
            <div className="productsWrapper">
                <h1>Order Summary</h1>
                {cartElements.map((item, index) => (
                    <div key={index} className="productItem">
                        <img src={item.images} alt={item.title} className="icon" />
                        <div className="productDetails">
                            <h3>{item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: EGP {item.price}</p>
                            <p>Subtotal: EGP {item.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
                <div className="totalAmount">
                    <h2>Total Amount:</h2>
                    <h2>EGP {totalPrice}</h2>
                </div>
            </div>
        </div>
        </>
    );
}

export default Checkout;