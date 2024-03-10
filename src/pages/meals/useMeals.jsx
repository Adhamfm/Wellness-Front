import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function useMeals() {
    const [allMeals, setAllMeals] = useState({});

    useEffect(() => {
        const getAllMeals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals`);
                setAllMeals(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        getAllMeals()
    },[]);


    return {
        allMeals
    }
}
