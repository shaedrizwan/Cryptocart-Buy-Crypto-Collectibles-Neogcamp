import "../stylesheets/wishlist.css"
import{useWishlist} from '../WishlistContext';
import{useCart} from "../CartContext";

export function Wishlist(){
    const {wishlistState,removeFromWishList} = useWishlist();
    const {addToCartHandler} = useCart();

    
    return(
            <div className="wishlist-pr-wrapper">
                {wishlistState.length === 0?<div>Wishlist is Empty</div> : wishlistState.map(product =>{
                    return (
                        <div key={product._id} className="wishlist-product-container">
                        <img src={product.image} alt={product.slug} className="wishlist-product-image"/>
                        <div className="wishlist-product-details-wrap">
                            <div>{product.name}</div>
                            <div>{product.owner}</div>
                            <div>{product.price}</div>
                            <button onClick={()=>addToCartHandler(product)}>Add to Cart</button>
                            <button onClick={()=>removeFromWishList(product)}>Remove from Wishlist</button>
                        </div>
                    </div>
                )})}
            </div>
    )
}