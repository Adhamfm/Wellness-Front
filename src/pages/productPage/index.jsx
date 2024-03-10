import Footer from "../../components/layout/Footer/Footer";
import NavBar from "../../components/layout/NavBar/NavBar";
import useProductPage from "./useProductPage"


export default function ProductPage() {
    const {
        product,
        productId,
        selectedQuantity,
        handleQuantityChange
    } = useProductPage();


    console.log(product);
    return (
        <>
            <NavBar />
            <h1>ProductPage</h1>
            <h2>TITLE: {product.title}</h2>
            <h3>PRICE: {product.price}</h3>
            <p>DESCRIPTION:{product.description}</p>
            <Footer />
        </>
    )
}
