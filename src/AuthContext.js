import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";


const authContext = createContext();

export function useAuth(){
    return useContext(authContext)
}

export function AuthProvider({children}){
    const [login,setLogin] = useState(false)
    const [token,setToken] = useState("")
    const [loader,setLoader] = useState(false)
    const navigate = useNavigate()
    const {state} = useLocation()

    useEffect(()=>{
        const loginStatus = JSON.parse(localStorage?.getItem("login"))
        loginStatus?.isLoggedIn && setLogin(true)
        loginStatus?.isLoggedIn && setToken(loginStatus.token)
    },[])

    useEffect(()=>{
        (
            function(navigate){
                const UNAUTHORIZED = 401
                axios.interceptors.response.use(
                    (response) => response,
                    (error) =>{
                        if(error?.response?.status === UNAUTHORIZED){
                            logoutUser();
                            navigate('/login')
                        }
                        return Promise.reject(error)
                    }
                )
            }
        )(navigate)
    },[navigate])

    const loginUser = async (username,password) =>{
        try{
            setLoader(true)
            const response = await axios.post('https://cryptocart.herokuapp.com/user/login',{
                username:username,
                password:password
            })
            if(response.status === 200){
                setLogin(true)
                toast.success("Successfully Logged In",{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                setToken(response.data.token)
                localStorage?.setItem("login",JSON.stringify({isLoggedIn:true,token:response.data.token}))
                state != null ?navigate(state.from):navigate('/')
            }
        }catch(error){
            toast.error("Login failed! Invalid Username/Password",{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        }finally{
            setLoader(false)
        }
    }

    



    const logoutUser = () =>{
        setLogin(false)
        setToken("")
        localStorage?.removeItem("login")
    }

    return(
        <authContext.Provider value={{login,loginUser,logoutUser,token,loader}}>
            {children}
        </authContext.Provider>
    )
}