import { createContext, useState, useEffect } from 'react';
import Checkout from '../checkout/index';
import axios from 'axios';

export const AppStates = createContext(null);

function Check() {
    const [cartElements, setCartElements] = useState([]); 
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getInCart = async () => {
            try {
                const userLocal = JSON.parse(localStorage.getItem('user'));
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/customer/${userLocal.userId}/cart`, {
                    headers: { "authorization": `Bearer ${userLocal.accessToken}` }
                });
                const cart = response.data.cart;

                // Fetch product and meal data for each cart item
                let total = 0;
                const promises = cart.map(item => {
                    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${item.itemId}`)
                        .then(response => {
                            total += response.data.price * item.quantity;
                            return { ...response.data, quantity: item.quantity };
                        })
                        .catch(error => {
                            console.error(`Error fetching product ${item.itemId}:`, error);
                            return null;
                        })
                        .then(productData => {
                            if (productData) return productData;

                            return axios.get(`${import.meta.env.VITE_BACKEND_URL}/meals/${item.itemId}`)
                                .then(response => {
                                    total += response.data.price * item.quantity;
                                    return { ...response.data, quantity: item.quantity };
                                })
                                .catch(error => {
                                    console.error(`Error fetching meal ${item.itemId}:`, error);
                                    return null;
                                });
                        });
                });

                const responses = await Promise.all(promises);
                const filteredData = responses.filter(data => data !== null);

                setCartElements(filteredData);
                setTotalPrice(total);
            } catch (error) {
                console.log(error);
            }
        };
        getInCart();
    }, []);

    return (
        <AppStates.Provider value={{ cartElements, totalPrice }}>
            <Checkout />
        </AppStates.Provider>
    );
}

export default Check;