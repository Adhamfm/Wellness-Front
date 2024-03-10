import "./Footer.css"
import { Link } from "react-router-dom";


function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h1>wellness <br />&emsp;kitchen</h1>
                        <p className="c-rights">
                            © Copyright 2024<br /> Wellness Kitchen
                        </p>
                    </div>
                    <div className="footer-col">
                        <ul>
                            <li><Link to="about">about us</Link></li>
                            <li><Link to="#">Blog</Link></li>
                            <li><Link to="#">our services</Link></li>
                            <li><Link to="#">privacy policy</Link></li>
                            <li><Link to="#">affiliate program</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <ul>
                            <li><Link to="#">FAQ</Link></li>
                            <li><Link to="#">shipping</Link></li>
                            <li><Link to="#">returns</Link></li>
                            <li><Link to="#">order status</Link></li>
                            <li><Link to="#">payment options</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="#"><i className="fab fa-twitter"></i></Link>
                            <Link to="#"><i className="fab fa-instagram"></i></Link>
                            <Link to="#"><i className="fab fa-whatsapp"></i></Link>
                        </div>
                        <div className="G-play">
                            <Link to=""><img src="src/assets/googleplay.jpg" alt="play button" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer