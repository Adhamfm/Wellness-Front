// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Importing the CSS file for styling

function NavBar() {
    return (
        <nav className="navbar">
            <Link to="/" className='site-title'> Wellness Hub Application</Link>
            <ul className="nav-list">
                <li className="nav-item"><Link to="/">Home</Link></li>
                <li className="nav-item"><Link to="/about">About</Link></li>
                <li className="nav-item"><Link to="#">Services</Link></li>
                <li className="nav-item"><Link to="/signup">Signup</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
