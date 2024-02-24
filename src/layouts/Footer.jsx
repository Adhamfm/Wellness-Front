import "./Footer.css"
import { Link } from "react-router-dom";


function Footer() {
    return (
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="footer-col">
                        <h1>wellness <br />&emsp;kitchen</h1>
                        <p class="c-rights">
                            © Copyright 2024<br /> Wellness Kitchen
                        </p>
                    </div>
                    <div class="footer-col">
                        <ul>
                            <li><Link to="about">about us</Link></li>
                            <li><Link to="#">Blog</Link></li>
                            <li><Link to="#">our services</Link></li>
                            <li><Link to="#">privacy policy</Link></li>
                            <li><Link to="#">affiliate program</Link></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <ul>
                            <li><Link to="#">FAQ</Link></li>
                            <li><Link to="#">shipping</Link></li>
                            <li><Link to="#">returns</Link></li>
                            <li><Link to="#">order status</Link></li>
                            <li><Link to="#">payment options</Link></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>follow us</h4>
                        <div class="social-links">
                            <Link to="#"><i class="fab fa-facebook-f"></i></Link>
                            <Link to="#"><i class="fab fa-twitter"></i></Link>
                            <Link to="#"><i class="fab fa-instagram"></i></Link>
                            <Link to="#"><i class="fab fa-whatsapp"></i></Link>
                        </div>
                        <div class="G-play">
                            <Link to=""><img src="src/assets/googleplay.jpg" alt="play button" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer