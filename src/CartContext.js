import {createContext,useEffect,useContext,useReducer} from "react";
import { useAuth } from "./AuthContext";
import axios from 'axios';
import {toast} from "react-toastify";

export const CartContext = createContext();

export function useCart(){
    return useContext(CartContext);
}

const cartHandler = (state,{type,payload,quantity}) => {

    switch(type){
        case "UPDATE": return [...payload]
        case "ATC": {
            const prod = state.find(item=>item.product === payload)
            if(prod === undefined)
            {
                return state = [...state,{product:payload,quantity:1}]
            }
            else{
                return state.map(item=>item.product===payload?{...item,quantity:item.quantity+1}:item)
            }
        }
        case "RFC":{
            if(quantity === 1){
                return state.filter(item => item.product !== payload)
            }
            else{
                return state.map(item=>item.product === payload?{...item,quantity:item.quantity-1}:item)
            }
        }
        default: console.log("Error in displatch")
    }

    return state;
}



export function CartProvider({children}){
    const [cartState,cartDispatch] = useReducer(cartHandler,[]);
    const {token} = useAuth();

    useEffect(()=>{
        if(token){
            (async function(){
                const response = await axios.get('https://cryptocart.herokuapp.com/cart',{
                    headers:{
                        Authorization:token
                    }
                })
                if(response.status === 200){
                    cartDispatch({type:"UPDATE",payload:response.data.cart})
                }
            })()
        }
    },[token])

    const addToCartHandler = async (product) =>{
        cartDispatch({type:"ATC",payload:product})
        const response = await axios.post('https://cryptocart.herokuapp.com/cart/add',{
                    productId:product._id
                },{
                    headers:{
                        Authorization:token
                    }
            })
        if(response.status === 200){
            toast.success("Product added to cart successfully",{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose:3000
            })
        }else{
            toast.error("Oops! failed to update the cart!",{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose:3000
            })
        }
    }

    const removeFromCartHandler = async(product,quantity) => {
        cartDispatch({type:"RFC",payload:product,quantity})
        toast.success("Cart updated successfully",{
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose:3000
        })
        const response = await axios.post('https://cryptocart.herokuapp.com/cart/remove',{
                    productId:product._id
                },{
                    headers:{
                        Authorization:token
                    }
            })
        if(response.status !== 200){
            toast.error("Oops! failed to update the cart!",{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose:3000
            })
        }

    }

    return(
        <CartContext.Provider value={{cartState,addToCartHandler,removeFromCartHandler}}>
            {children}
        </CartContext.Provider>
    )
}
