import "../stylesheets/cart.css"
import {useCart} from "../CartContext";


export function Cart(){
    const {cartState,addToCartHandler,removeFromCartHandler} = useCart();

    let {price} = cartState.reduce(function(previousValue, currentValue) {
        console.log(previousValue,currentValue.product.price)
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
                            <div>{product.name}</div>
                            <div>{product.owner}</div>
                            <div>{product.price}</div>
                            <div>Quantity: {quantity}</div>
                            <button onClick={()=>addToCartHandler(product)}>+</button>
                            <button onClick={()=>removeFromCartHandler(product,quantity)}>-</button>
                        </div>
                    </div>
                )})}
            </div>
            <div className={cartState.length===0?"cart-checkout-hide":"cart-checkout"}>
                <h2>Total Price to pay</h2>
                <div>Price: Ξ {price}</div>
                <div>Gas Fee: Ξ {(price*0.1).toFixed(2)} (10% of the price) </div>
                <div>Total Price: Ξ {(price + price*0.1).toFixed(2)}</div>
                <div>You will save Ξ {(price*0.05).toFixed(2)} in gas fees on this order</div>
                <button>Checkout</button>
            </div>
        </div>
    )
}