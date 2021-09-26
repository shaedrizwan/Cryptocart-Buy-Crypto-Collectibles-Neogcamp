import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import { useCart } from '../CartContext'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import "../stylesheets/checkout.css"


function Checkout() {
    const {price} = useCart()
    const [address,setAddress] = useState(null)
    const {token} = useAuth()
    const navigate = useNavigate()
    const [paymentDetails,setPaymentDetails] = useState({
        cardNumber:949494949494,
        expiryDate:"05/22",
        CVV:null,
        name:"Demo"
    })

    useEffect(()=>{
        (
            async function(){
                const response = await axios.get("https://cryptocart.herokuapp.com/user/address",{
                    headers:{
                        authorization:token
                    }
                })
                if(response.status === 200){
                    setAddress(response.data.address)
                }
            }
        )()
    },[token])

    const changeHandler = e =>{
        setPaymentDetails({...paymentDetails,[e.target.name]:e.target.value})
    }

    const PlaceOrderPressed = () =>{
        if(paymentDetails.CVV === "123"){
            navigate('/successorder')
        }
        else if(paymentDetails.CVV === "111"){
            navigate('/failedorder')
        }else{
            toast.error("Enter valid CVV",{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        }
    }


    return (
        <div className="checkout">
            <div className="payment-container">
                <div className="chkt-title">Payment Summary</div>
                <div>Price: <span className="checkout-price">Ξ {price.toFixed(2)}</span></div>
                <div>Gas Fee: <span className="checkout-price">Ξ {(price*0.1).toFixed(2)}</span> (10% of the price) </div>
                <div>Total Price: <span className="checkout-price">Ξ {(price + price*0.1).toFixed(2)}</span></div>
            </div>
            
            <div className="address-container">
                <div className="chkt-title">Select Address</div>
                {address && address.map(address => <div className="address-item" key={address}>
                <input type="radio" className="hide-radio" id={address} name="address" value={address}/>
                <label for={address} className="radio-label">{address}</label>
                </div>)}
            </div>

            <div className="payment-container">
                <div className="chkt-title">Payment Details</div>
                <div className="chkt-label">Enter your name</div>
                <input type="text" className="form-input" onChange={changeHandler} name="name" value={paymentDetails.name}/>
                <div className="chkt-label">Enter your Card Number</div>
                <input type="text" className="form-input" onChange={changeHandler} name="cardNumber" value={paymentDetails.cardNumber}/>
                <div className="chkt-label">Enter Expiry Date</div>
                <input type="text" className="form-input" onChange={changeHandler} name="expiryDate" value={paymentDetails.expiryDate}/>
                <div className="chkt-label">Enter CVV</div>
                <div className="chkt-description">(Enter 123 for successful transaction or 111 for failed transaction)</div>
                <input type="text" className="form-input" onChange={changeHandler} name="CVV" value={paymentDetails.CVV}/>
                <button className="btn btn-scs" onClick={PlaceOrderPressed}>Place Order</button>
            </div>
        </div>
        
    )
}

export default Checkout
