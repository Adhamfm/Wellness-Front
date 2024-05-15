import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function useWishlist() {
    const [wishlish, setWishlist] = useState({});

    useEffect(() => {
        const getWishlist = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals`);
                setWishlist(response.data)
                console.log(wishlish)
            } catch (error) {
                console.log(error);
            }
        };
        getWishlist()
    },[]);


    return {
        wishlish
    }
}
