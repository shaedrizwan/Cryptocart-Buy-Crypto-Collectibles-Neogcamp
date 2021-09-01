import {useParams} from "react-router-dom";
import "../stylesheets/productPage.css";
import {useCart} from "../CartContext";
import {useWishlist} from "../WishlistContext";
import { useProduct } from "../ProductContext";
import BlockLoading from "react-loadingg/lib/BlockLoading";


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
        <div className="product">
        {!products && <BlockLoading/>}
        {products && <div className="product-container">
            <div className="image-container">
                <img src={product.image} alt={product.slug} className="product-image"/>
            </div>
            <div className="product-details-wrap">
                <div className="name">{product.name}</div>
                <div className="price">Price: Ξ {product.price}</div>
                <div className="pr-owner">Owner: {product.owner}</div>
                <div className="btn-container">
                    <div className="btn btn-pr" onClick={()=>addToCartHandler(product)}>Add to Cart</div>
                    <div className="btn btn-sec" onClick={()=>addToWishList(product)}>Add to Wishlist</div>
                </div>
            </div>
        </div>}
        </div>
    )
}