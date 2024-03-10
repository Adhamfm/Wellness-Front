import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function useProfile() {
    const [product, setProduct] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const handleQuantityChange = ({ target: { value } }) => {
        setSelectedQuantity(value);
    }

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${productId}`);
                setProduct(response.data)
            } catch (error) {
                console.log(error);
            }
        };

        if (productId) {
            getProductDetails()
        }
    }, [productId]);

    return {
        product,
        productId,
        selectedQuantity,
        handleQuantityChange,

    }
}
