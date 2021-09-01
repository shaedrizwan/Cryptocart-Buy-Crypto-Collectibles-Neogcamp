import "../stylesheets/cart.css"
import {useCart} from "../CartContext";
import { Checkout } from "../components";


export function Cart(){
    const {cartState,addToCartHandler,removeFromCartHandler} = useCart();

    let {price} = cartState.reduce(function(previousValue, currentValue) {
        return {
          price: previousValue.price + currentValue.product.price*currentValue.quantity
        }
      },{price:0});

    
    return(
        <div className="cart-main">
            <div className="cart-pr-wrapper">
                {cartState.length === 0?<div>Cart is Empty</div> : cartState.map(({product,quantity}) =>{
                    return (
                        <div key={product._id} className="cart-product-container">
                        <img src={product.image} alt={product.slug} className="cart-product-image"/>
                        <div className="cart-product-details-wrap">
                            <div className="cart-product-name">{product.name}</div>
                            <div>Price: <span className="cart-product-price">Ξ {product.price}</span></div>
                            <div className="cart-product-owner">{product.owner}</div>
                            <div>Quantity:<button className="btn btn-sec" onClick={()=>addToCartHandler(product)}>+</button> <span className="cart-product-quantity">{quantity}</span><button className="btn btn-sec" onClick={()=>removeFromCartHandler(product,quantity)}>-</button></div>
                        </div>
                    </div>
                )})}
            </div>
            <div className={cartState.length===0?"cart-checkout-hide":"cart-checkout"}>
                <Checkout price={price}/>
            </div>
        </div>
    )
}