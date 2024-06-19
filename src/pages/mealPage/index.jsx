import { useState } from "react";
import Footer from "../../components/layout/Footer/Footer";
import NavBar from "../../components/layout/NavBar/NavBar";
import useMealPage from "./useMealPage";
import Button from '@mui/material/Button';
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alert, IconButton, Snackbar, SnackbarContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function MealPage() {
    const {
        meal,
        mealId,
        selectedQuantity,
        handleQuantityChange,
        loading,
    } = useMealPage();

    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [open, setOpen] = useState(false); //for Snackbar
    // Function to handle adding the meal to the cart
    const addToCart = () => {
        // Logic to add the meal to the cart
        // For simplicity, let's just set a flag to indicate that the meal has been added to the cart
        setIsAddedToCart(true);
    };

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
    console.log(meal);

    const handleClick = async () => {
        //console.log(props.data);
        console.log(mealId);
        try {
            const userLocal = JSON.parse(localStorage.getItem('user'))
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`, {
                itemId: mealId,
                quantity: 1
            }, { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
            handleOpen()
            console.log(response);
            console.log("added");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NavBar />

            <section className="featured-meals">

                <div className="featured-list-title">
                    <div className="title">{meal.title}</div>

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
                            style={{fontSize: "16px"}}
                        >
                            Added to Cart
                        </Alert>
                    </Snackbar>

                </div>

                {loading ? (
                    <p className="des">Loading...</p>
                ) : meal ? (
                    <div className="cart-container-list">
                        {/* <!-- Cart Items --> */}
                        <div className="cart-container">
                            <div className="left">
                                <div className="cart-image">
                                    {meal.images && <img className="cart-image" src={meal.images[0]} alt="Meal Image" />}
                                </div>
                            </div>

                            <div className="right">
                                {/* <h2>TITLE: {meal.title}</h2> */}
                                <h2>DESCRIPTION:</h2>
                                <p className="des" style={{ fontSize: 24 }}> {meal.description}</p>
                                <h3 className="price">PRICE: EGP {meal.price}</h3>
                                <br />
                                <div className="list-features">
                                    <Button className="" style={{ margin: 5 }} variant="contained" onClick={handleClick} >Add to Cart</Button>
                                    <Link to={`/profile/${meal.seller}`}><Button className="" style={{ margin: 5 }} variant="contained">Cooker</Button></Link>
                                    <Button className="" style={{ margin: 5 }} variant="contained">More</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="des">Meal not found</p>
                )}
            </section>

        </>
    );
}
// export default function MealPage() {
//     const {
//         meal,
//         selectedQuantity,
//         handleQuantityChange,
//         loading,
//     } = useMealPage();

//     const [isAddedToCart, setIsAddedToCart] = useState(false);

//     // Function to handle adding the meal to the cart
//     const addToCart = () => {
//         // Logic to add the meal to the cart
//         // For simplicity, let's just set a flag to indicate that the meal has been added to the cart
//         setIsAddedToCart(true);
//     };

//     console.log(meal);

//     return (
//         <>
//             <NavBar />
//             <div style={styles.poster}>
//                 {loading ? (
//                     <p style={styles.p}>Loading...</p>
//                 ) : meal ? (
//                     <div style={styles.mealDetails}>
//                         <h1>{meal.title}</h1>
//                         {meal.images && <img style={{border: "5px solid white", width: "100%"}} src={meal.images[2]} alt="Meal Image" />}
//                         <h4>PRICE: {meal.price}</h4>
//                         <p>DESCRIPTION: {meal.description}</p>
//                         <div style={styles.button}>
//                             {/* Render the button only if the meal hasn't been added to the cart */}
//                             {!isAddedToCart && <Button variant="contained" onClick={addToCart}>Add to Cart</Button>}
//                             {/* Show a message if the meal has been added to the cart */}
//                             {isAddedToCart && <p>Added to Cart</p>}
//                         </div>
//                     </div>
//                 ) : (
//                     <p style={styles.p}>Meal not found</p>
//                 )}
//             </div>
//             <Footer />
//         </>
//     );
// }


// // CSS styles
// const styles = {
//     poster: {
//         display: "flex",
//         width: "50%",
//         marginLeft: "25%",
//         marginTop: "50px",
//         fontFamily: "Libre Baskerville, serif",
//         textAlign: "center",
//         marginBottom: "100px",
//         fontSize: "25px",
//     },
//     button: {
//         marginTop: "40px",
//     },
//     p : {
//         display:"flex",
//         justifyContent:"center",
//         alignItems:"center",
//         fontSize:"50px",
//         marginBottom:"1000px",
//         height:"100vh"
//     },
//     mealDetails: {
//         textAlign: "left", // Align text to the left
//         marginLeft: "50px", // Add space between the photo and details
//     },
// };


