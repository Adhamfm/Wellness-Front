import Footer from "../../components/layout/Footer/Footer";
import NavBar from "../../components/layout/NavBar/NavBar";
import useProductPage from "./useProductPage"
import './style.css'
import Slider from "../../components/Slider/Slider";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useState } from "react";

export default function ProductPage() {
    const {
        product,
        productId,
        selectedQuantity,
        handleQuantityChange,
        aimg
    } = useProductPage();
    const [open, setOpen] = useState(false); //for Snackbar
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="large" />
            </IconButton>
        </>
    );
    console.log(product);

    const handleClick = async () => {
        //console.log(props.data);
        console.log(productId);
        try {
            const userLocal = JSON.parse(localStorage.getItem('user'))
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`, {
                itemId: productId,
                quantity: 1
            }, { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
            handleOpen()
            console.log(response);
            console.log("added");
        } catch (error) {
            console.log(error);
        }
    }

    console.log(product);
    return (
        <>
            <NavBar />
            <section className="featured-products">

                {/* <div className="our-recommendation">
                    Our recommendation
                </div> */}


                <div className="featured-list-title">
                    <div className="title">{product.title}</div>
                </div>
                <Snackbar

                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    variant="success"

                    action={action}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                        style={{ fontSize: "16px" }}
                    >
                        Added to Cart
                    </Alert>
                </Snackbar>
                <div className="cart-container-list">
                    {/* <!-- Cart Items --> */}
                    <div className="cart-container">
                        <div className="left">
                            <div className="cart-image">
                                {/* <button className="btn">New Design</button> */}
                                {/* <img src={product.images[0]} alt="" /> */}
                                <Slider images={product.images} />
                            </div>
                        </div>

                        <div className="right">
                            <h2>{product.title}</h2>
                            <p className="price">PRICE: {product.price}</p>
                            <h2>DESCRIPTION</h2>
                            <p className="des" style={{ fontSize: 24 }}>{product.description}</p>
                            <div className="list-features">
                                <Button className="" style={{ margin: 5 }} variant="contained" onClick={handleClick} >Add to Cart</Button>
                                <Link to={`/profile/${product.owner}`}><Button className="" style={{ margin: 5 }} variant="contained">Cooker</Button></Link>
                                <Button className="" style={{ margin: 5 }} variant="contained">More</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
// export default function ProductPage() {
//     const {
//         product,
//         productId,
//         selectedQuantity,
//         handleQuantityChange
//     } = useProductPage();


//     console.log(product);
//     return (
//         <>
//             <NavBar />
//             <h1>ProductPage</h1>
//             <div style={styles.poster}>
//                 <h2 style={{marginBottom:"10px"}}>TITLE: {product.title}</h2>
//                 <h3 style={{marginBottom:"10px"}}>PRICE: {product.price}</h3>
//                 <p style={{marginBottom:"10px", marginLeft:"10px"}}>DESCRIPTION:{product.description}</p>
//             </div>
//             <Footer />
//         </>
//     )
// }

// // CSS styles
// const styles = {
//     poster: {
//         // width: "50%",
//         // marginLeft: "25%",
//         marginTop: "50px",
//         fontFamily: "Libre Baskerville, serif",
//         // textAlign: "center",
//         marginBottom: "200px",
//         fontSize: "20px",
//     },
// }

