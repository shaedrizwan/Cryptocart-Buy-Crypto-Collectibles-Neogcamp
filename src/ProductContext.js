import { createContext,useContext, useEffect, useState } from "react";
import axios from 'axios'

const productContext = createContext();

export function useProduct(){
    return useContext(productContext)
}

export function ProductProvider({children}){

    const [products,setProducts] = useState()
    useEffect(()=>{
        (async function(){
            const response = await axios.get('https://cryptocart.herokuapp.com/product')
            if(response.status === 200){
                setProducts(response.data.products)
            }
        })()
    },[])

    return(
        <productContext.Provider value={{products}}>
            {children}
        </productContext.Provider>
    )
}