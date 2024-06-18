// NavBar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Importing the CSS file for styling
import "https://kit.fontawesome.com/0e53af926d.js" //TODO: Check if change. This is for logo(fa fa-bag-shopping)
import { Button } from '@mui/material';
import wellnessImg from '/assets/WellnessLogo.png'
function NavBar() {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);
    const handleLogout = () => {
        // Your logout logic here
        localStorage.removeItem('user')
        localStorage.removeItem('userType')
        setIsLoggedIn(false);
        navigate("/");
    };

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

    return (
        <div id="header">
            <nav className="header-list-nav">
                <div className="header-logo">
                    <Link to="/"><img src={wellnessImg} height="50px" alt="Wellness-Logo" /></Link>
                </div>

                <ul>
                    <li><Link to="/" className="active">Home</Link></li>
                    <li><Link to="/blog.html">Blog</Link></li>
                    <li><Link to="/meals">Meals</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    {/* <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/Signup">Signup</Link></li>
                        <li><Link to="/logincustomer">Login Customer</Link></li> */}
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            {isCustomer ? (
                                <li><Link to="/wishlist">Wishlist</Link></li>) : (<></>
                            )}
                        </>
                    ) : (
                        <>
                            <li><Link to="/Signup">Signup</Link></li>
                            <li><Link to="/logincustomer">Login Customer</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="header-list-icon">

                {isLoggedIn ? (<Button onClick={handleLogout}> LogOut </Button>) : (<></>)}
                <Link to="/cart"><i className="fa fa-bag-shopping"></i></Link>
            </div>
        </div>
    );
}

export default NavBar;
