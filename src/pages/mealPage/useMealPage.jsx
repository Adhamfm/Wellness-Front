import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function useMealPage() {
    const { mealid: mealId } = useParams();
    const [loading, setLoading] = useState(false);
    const [meal, setMeal] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const handleQuantityChange = ({ target: { value } }) => {
        setSelectedQuantity(value);
    }

    useEffect(() => {
        const getMealDetails = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals/${mealId}`);
                setMeal(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };

        if (mealId) {
            getMealDetails()
        }
    }, [mealId]);

    return {
        meal,
        mealId,
        selectedQuantity,
        handleQuantityChange,

    }
}
