import {useParams} from "react-router-dom";
import "../stylesheets/productPage.css";
import {useCart} from "../CartContext";
import {useWishlist} from "../WishlistContext";
import { useProduct } from "../ProductContext";


export function ProductDetails(){
    const {addToCartHandler} = useCart();
    const {addToWishList} = useWishlist();
    const {slug} = useParams();
    const {products} = useProduct();
    let product = []

    if(products){
        product = products.find(item => item.slug === slug)
    }

    
    return(
        <>
        {!products && <div>Please wait.. Product is loading!</div>}
        {products && <div className="product-container">
            <img src={product.image} alt={product.slug} className="product-image"/>
            <div className="product-details-wrap">
                <div>{product.name}</div>
                <div>{product.owner}</div>
                <div>{product.price}</div>
                <button onClick={()=>addToCartHandler(product)}>Add to Cart</button>
                <button onClick={()=>addToWishList(product)}>Add to Wishlist</button>
            </div>
        </div>}
        </>
    )
}