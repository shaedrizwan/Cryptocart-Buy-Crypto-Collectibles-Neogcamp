import "../stylesheets/wishlist.css"
import{useWishlist} from '../WishlistContext';
import{useCart} from "../CartContext";

export function Wishlist(){
    const {wishlistState,removeFromWishList} = useWishlist();
    const {addToCartHandler} = useCart();

    
    return(
            <div className="wishlist-pr-wrapper">
                {!wishlistState && <h2>Please wait</h2>}
                {wishlistState && wishlistState.length === 0 && <h1>Wishlist is empty</h1>}
                {wishlistState && wishlistState.length !== 0 && wishlistState.map(product =>{
                    return (
                        <div key={product._id} className="wishlist-product-container">
                        <img src={product.image} alt={product.slug} className="wishlist-product-image"/>
                        <div className="wishlist-product-details-wrap">
                            <div className="wishlist-name">{product.name}</div>
                            <div>Price: <span className="wishlist-price">Ξ {product.price}</span></div>
                            <div className="wishlist-owner">Owner: {product.owner}</div>
                            <button className="btn btn-pr" onClick={()=>addToCartHandler(product)}>Add to Cart</button>
                            <button className="btn btn-sec" onClick={()=>removeFromWishList(product)}>Remove from Wishlist</button>
                        </div>
                    </div>
                )})}
            </div>
    )
}