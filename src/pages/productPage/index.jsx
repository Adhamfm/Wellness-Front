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
            <div style={styles.poster}>
                <h1>ProductPage</h1>
                <h2>TITLE: {product.title}</h2>
                <h3>PRICE: {product.price}</h3>
                <p style={{marginTop: "30px"}}>DESCRIPTION:{product.description}</p>
            </div>
            <Footer />
        </>
    )
}

// CSS styles
const styles = {
    poster: {
        width: "50%",
        marginLeft: "25%",
        marginTop: "50px",
        fontFamily: "Libre Baskerville, serif",
        // textAlign: "center",
        marginBottom: "100px",
        fontSize: "25px",
    },
};
