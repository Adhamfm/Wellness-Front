import { useState } from "react";
import Footer from "../../components/layout/Footer/Footer";
import NavBar from "../../components/layout/NavBar/NavBar";
import useMealPage from "./useMealPage";

export default function MealPage() {
    const { 
        meal,
        selectedQuantity,
        handleQuantityChange,
    } = useMealPage();

    // State to store the user's comment
    const [comment, setComment] = useState("");
    // State to store the list of comments
    const [comments, setComments] = useState([]);

    // Function to handle adding a comment
    const addComment = () => {
        if (comment.trim() !== "") {
            setComments([...comments, comment]); // Add the comment to the list
            setComment(""); // Clear the input field after adding the comment
        } else {
            alert("Please enter a comment."); // Show an alert if the comment is empty
        }
    };

    console.log(meal);

<<<<<<< HEAD
    function onLoad() {
        // delay for demo only
        //setTimeout(() => setIsLoading(false), 1000);
    
        setIsLoading(false)
    }
    console.log(meal)
    
    return (
        <>
            <NavBar />
            <div style={styles.poster}>
                <h1>TITLE: {meal.title}</h1>
                {meal.images ? <img style={{border: "5px solid white", width: "100%"}} src={meal.images[2]} alt="Meal Image"/> : null}
                <h4>PRICE: {meal.price}</h4>
                <p>DESCRIPTION: {meal.description}</p>
                <input type="number" value={selectedQuantity} onChange={handleQuantityChange} />
                <h4>Total:{meal.price * selectedQuantity} EGP</h4>
                <button className="btn btn-primary">ADD TO CART</button>
=======
    return (
        <>
            <NavBar />
            <div style={styles.container}>
                <div style={styles.mealDetails}>
                    <h1>TITLE: {meal.title}</h1>
                    {meal.images ? <img style={{border: "5px solid white", width: "100%"}} src={meal.images[2]} alt="Meal Image"/> : null}
                    <h4>PRICE: {meal.price}</h4>
                    <p>DESCRIPTION: {meal.description}</p>
                    {/* <input type="number" value={selectedQuantity} onChange={handleQuantityChange} />
                    <h4>Total: {meal.price * selectedQuantity} EGP</h4> */}
                </div>
                <div style={styles.addComment}>
                    {/* Button to add a comment */}
                    <button className="btn btn-primary" style={styles.button} onClick={addComment}>Add Review</button>
                    {/* Input field for the user's comment */}
                    <textarea 
                        style={styles.textarea}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add your comment..."
                    />
                </div>
                {/* Display the list of comments */}
                <div style={styles.commentsContainer}>
                    <h2>Comments:</h2>
                    {comments.length > 0 ? (
                        <ul style={styles.commentsList}>
                            {comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
>>>>>>> 825e244448a2b380bba3af308a8a91dbea0cabbb
            </div>
            <Footer />
        </>
    );
}

// CSS styles
const styles = {
<<<<<<< HEAD
    poster: {
        width: "50%",
        marginLeft: "25%",
        marginTop: "50px",
        fontFamily: "Libre Baskerville, serif",
        textAlign: "center",
        marginBottom: "100px",
        fontSize: "25px",
    },
    btn: {
        marginTop: "40px",
    }
};
=======
    container: {
        width: "90%", // Adjusted width for better responsiveness
        margin: "0 auto",
        display: "flex", // Ensure meal details and comments are displayed side by side on larger screens
        flexDirection: "column", 
        alignItems: "center", 
    },
    mealDetails: {
        width: "100%", // Ensure meal details take full width
        marginBottom: "20px", // Add some spacing between meal details and comments
        fontFamily: "Libre Baskerville, serif",
        fontSize: "25px",
    },
    commentsContainer: {
        width: "100%", // Ensure comments take full width
        textAlign: "left",
        padding: "20px",
        border: "1px solid black",
        borderRadius: "5px",
        backgroundColor: "white",
        marginBottom: "100px",
        marginTop:"30px",
    },
    commentsList: {
        padding: "10px",
        marginTop:"30px",
    },
    button: {
        padding: "15px 30px", 
        fontSize: "18px", 
        backgroundColor: "black", 
        color: "white", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer", 
    },
    textarea: {
        width: "100%", 
        minHeight: "100px", // Set minimum height for better visibility
        padding: "10px", 
        marginBottom: "20px", // Add some spacing between text area and comments
        fontSize: "16px", 
        borderRadius: "5px", 
    },
    addComment: {
        width: "100%",
    }
};
>>>>>>> 825e244448a2b380bba3af308a8a91dbea0cabbb
