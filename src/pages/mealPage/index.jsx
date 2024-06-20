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
    const userLocal = JSON.parse(localStorage.getItem('user'))
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


    async function addReviews (event) {
        event.preventDefault();
        const form = new FormData(event.target);
        let review;
        for (let entry of form.entries()) {
                review = entry[1];
        }
        console.log(review);
        
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/meals/${meal.id}/reviews`, {
            content:review
        }, { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
        console.log(response);
        event.target.reset();
    }

    async function editReviews (reviewID) {

        const form = new FormData(event.target);
        let review;
        for (let entry of form.entries()) {
                review = entry[1];
        }
        console.log(review);
        
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/meals/${meal.id}/reviews/${reviewID}`, {
            content:review
        }, { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
        console.log(response);
    }

    async function deleteReviews (reviewID) {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/meals/${meal.id}/reviews/${reviewID}`,
        { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
        console.log(response);

    }
    // const currentDate = new Date().toLocaleDateString(); // Get the current date
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!userLocal || !userLocal.userId) {
            alert('Please log in to write a review.');
            return;
        }
        addReviews(event);
    };
    
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
                        <div className="comment-section">
                            <form onSubmit={handleSubmit} target="">
                                <input 
                                    name="review" 
                                    style={{ 
                                        height: '50px', 
                                        width: '100%', 
                                        padding: '10px', 
                                        borderRadius: '5px', 
                                        border: '1px solid #ccc', 
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
                                        fontSize: '16px' 
                                    }}
                                    placeholder="Write your review..."
                                />
                            </form>
    
                            {meal.reviews && meal.reviews.map((data, index) => {
                            
                                const reviewDate = new Date(data.reviewDate).toLocaleDateString(); // Format the date

                                return ( 
                                <div key={index} style={{ marginTop: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#fafafa' }}>
                                    <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{data.customerName}</p>
                                    <p style={{ margin: '5px 0', fontSize: '12px', color: '#999' }}>{reviewDate}</p>
                                    <p style={{ margin: '5px 0' }}>{data.content}</p>
                                    {data.customer == userLocal.userId && (
                                        <div>
                                            <button 
                                                onClick={() => editReviews(data._id)} 
                                                style={{ 
                                                    marginRight: '10px', 
                                                    padding: '5px 10px', 
                                                    borderRadius: '5px', 
                                                    border: 'none', 
                                                    backgroundColor: '#007BFF', 
                                                    color: 'white', 
                                                    cursor: 'pointer' 
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => deleteReviews(data._id)} 
                                                style={{ 
                                                    padding: '5px 10px', 
                                                    borderRadius: '5px', 
                                                    border: 'none', 
                                                    backgroundColor: '#FF0000', 
                                                    color: 'white', 
                                                    cursor: 'pointer' 
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                                )
                            })}
                            {/* {console.log(meal)} */}
                        </div>


                    </div>
                ) : (
                    <p className="des">Meal not found</p>
                )}
            </section>

        </>
    );
}
