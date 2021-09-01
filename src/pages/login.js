import { useAuth } from "../AuthContext"
import {BlockLoading} from "react-loadingg"
import "../stylesheets/login.css"
import { useState } from "react";

export function Login(){

    const {login,loginUser,logoutUser} = useAuth();
    const [loader,setLoader] = useState(false)

    let username, password;

    const loginHandler = () =>{
        setLoader(true)
        loginUser(username,password)
    }

    return(
        <div className="login">
            <div className="card card-pr login-container">
                <h3 className="login-title">Login</h3>
                { !login &&
                <>
                <div className="login-label">username</div>
                <input className="form-input" type="text" onChange={(e)=>username = e.target.value}/>
                <div className="login-label">Password</div>
                <input className="form-input" type="password" onChange={(e)=>password = e.target.value}/>
                </>
                }
                {login && <div className="login-label">You're already logged in! Log out?</div>}
                <button className="btn btn-sec" onClick={login?logoutUser:loginHandler}>{login?"Log Out":"Login"}</button>
                {loader && <BlockLoading/>}
            </div>
        </div>
    )
}