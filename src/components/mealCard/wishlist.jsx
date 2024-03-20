import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Wishlist(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isWishlist, setIsWishlist] = useState(true);




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

    const [wishlish, setWishlist] = useState({});

    function checkIfMealInWishlist(wishlist, mealId) {
        return wishlist.some(item => item.type === "meal" && item.id === mealId);
    }
    useEffect(() => {
        const getWishlist = async () => {
            try {
                const userLocal = JSON.parse(localStorage.getItem('user'))
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/wishlist/`,
                    { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
                console.log(response)
                setWishlist(response.data)
                setIsWishlist(!checkIfMealInWishlist(response.data.whishlist,props.id))
            } catch (error) {
                console.log(error);
            }
        };
        getWishlist()
    }, []);



    const toggleWishlist = () => {
        // Update the wishlist status when the button is clicked
        console.log(wishlish)
        setIsWishlist(!isWishlist);
        if (isWishlist) {
            const addToWishlist = async () => {
                try {
                    const userLocal = JSON.parse(localStorage.getItem('user'))
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/wishlist/${props.id}`,
                        { meal: props.id },
                        { headers: { "authorization": `Bearer ${userLocal.accessToken}` } });
                    console.log(response)
                } catch (error) {
                    console.log(error);
                }
            };
            addToWishlist()
        }
    };

    return (
        <>
            {isLoggedIn ? (
                // <a href="#" onClick={toggleWishlist}><i className="fa-regular fa-bookmark"></i></a>
                isWishlist ? (
                    <a href="#" onClick={toggleWishlist}><i className="fa-regular fa-bookmark"></i></a>
                ) : (
                    <a href="#" onClick={toggleWishlist}><i className="fa-solid fa-bookmark"></i></a>
                )
            ) : (
                <>
                </>
            )}
        </>
    )
}
