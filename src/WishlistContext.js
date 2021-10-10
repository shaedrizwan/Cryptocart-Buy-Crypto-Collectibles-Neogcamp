import {createContext,useEffect,useContext,useReducer} from "react";
import axios from 'axios'
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export function useWishlist() {
    return useContext(WishlistContext);
}


export function WishlistProvider({children}){

    const {token} = useAuth()
    
    useEffect(()=>{
        if(token){
            (async function(){
                const response = await axios.get('https://cryptocart.herokuapp.com/wishlist',{
                    headers:{
                        Authorization:token
                    }
                })
                if(response.status === 200){
                    wishlistDispatch({type:"UPDATE",payload:response.data.wishlist})
                }
            })()
        }
    },[token])

    const wishlistHandler = (state,{type,payload}) =>{
        switch(type){
            case "UPDATE": return [...payload]
            case "ATW": {
                const isPresent = state.find(product => product._id === payload._id)
                if(!isPresent){
                    return [...state,payload]
                }else{
                    return state
                }
            }
            case "RFW": return(
                state.filter(product => product !== payload)
            )
            case "EMPTY": { return state = [] }
            default: console.log("Error in displatch")
        }
    
        return state;
    }

    const addToWishList = async(product) =>{
            wishlistDispatch({type:"ATW",payload:product})
            const response = await axios.post('https://cryptocart.herokuapp.com/wishlist/add',{
                    productId:product._id
                },{
                    headers:{
                        Authorization:token
                    }
            })
            if(response.status !== 200){
            }
    }

    const removeFromWishList = async(product) =>{
        wishlistDispatch({type:"RFW",payload:product})
        toast.success("Successfully removed from Wishlist",{
            position:toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        })
        const response = await axios.post('https://cryptocart.herokuapp.com/wishlist/remove',{
                    productId:product._id
                },{
                    headers:{
                        Authorization:token
                    }
            })
        if(response.status !== 200){
            toast.success("Failed to remove from Wishlist",{
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            })
        }
    }
    

    const [wishlistState,wishlistDispatch] = useReducer(wishlistHandler,[]);
    return <WishlistContext.Provider value={{wishlistState,addToWishList,removeFromWishList}}>
        {children}
    </WishlistContext.Provider>
}