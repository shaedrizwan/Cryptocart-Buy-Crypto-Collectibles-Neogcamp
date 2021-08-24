import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

export function useAuth(){
    return useContext(authContext)
}

export function AuthProvider({children}){
    const [login,setLogin] = useState(false)
    const [token,setToken] = useState("")

    useEffect(()=>{
        const loginStatus = JSON.parse(localStorage?.getItem("login"))
        loginStatus?.isLoggedIn && setLogin(true)
        loginStatus?.isLoggedIn && setToken(loginStatus.token)
    },[])

    const loginUser = async (username,password) =>{
        const response = await axios.post('https://cryptocart-backend.herokuapp.com/user/login',{
            username:username,
            password:password
        })
        if(response.status === 200){
            setLogin(true)
            setToken(response.data.token)
            localStorage?.setItem("login",JSON.stringify({isLoggedIn:true,token:response.data.token}))
        }
        else if(response.status !== 200){
            console.log("login error")
        }
    }


    const logoutUser = () =>{
        setLogin(false)
        setToken("")
        localStorage?.removeItem("login")
        console.log("Successfully logged out")
    }

    return(
        <authContext.Provider value={{login,loginUser,logoutUser,token}}>
            {children}
        </authContext.Provider>
    )
}