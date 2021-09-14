import React, { useState } from 'react'
import "../stylesheets/register.css"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {BlockLoading} from 'react-loadingg'

function Register() {

    const navigate = useNavigate()
    const [loader,setLloader] = useState(false)

    const initialState = {
        firstname:"",
        lastname:"",
        email:"",
        username:"",
        password:""
    }

    const changeHandler = e =>{
        setNewUser({...newUser,[e.target.name]:e.target.value})
    }

    const registerPressed = async () =>{
        try{
            setLloader(true)
            const response = await axios.post('https://cryptocart.herokuapp.com/user/signup',newUser)
            if(response.status === 200){
                navigate('/login')
            }
            else if(response.status !== 200){
                setLloader(false)
                toast.error("Registration failed",{
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000
                })
            }
        }catch(error){
            console.log("some error occured")
        }
    }

    const [newUser,setNewUser] = useState(initialState)

    return (
        <div className="register">
            <div className="card card-pr register-container">
                <h3 className="register-title">Register</h3>
                <div className="register-label">First Name</div>
                <input className="form-input" onChange={changeHandler} name="firstname" type="text"/>
                <div className="register-label">Last Name</div>
                <input className="form-input" onChange={changeHandler} name="lastname" type="text"/>
                <div className="register-label">Email</div>
                <input className="form-input" onChange={changeHandler} name="email" type="text"/>
                <div className="register-label">Username</div>
                <input className="form-input" onChange={changeHandler} name="username" type="text"/>
                <div className="register-label">Password</div>
                <input className="form-input" onChange={changeHandler} name="password" type="password"/>
                <button className="btn btn-sec" onClick={registerPressed}>Register</button>
                {loader && <BlockLoading/>}
            </div>
        </div>
    )
}

export default Register
