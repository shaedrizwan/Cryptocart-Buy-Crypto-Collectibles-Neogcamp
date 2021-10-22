import React, { useState } from 'react'
import "./MobileHeader.css"
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink, Link} from "react-router-dom";
import "./MobileHeader.css"
import { useAuth } from '../../AuthContext';

function MobileHeader() {
    const [dropdownToggle,setDropdownToggle] = useState(false)
    const {login} = useAuth()
    return (
        <div className="mobile-header">
            <Link className="mobile-logo" to="/">CryptoCart</Link>
            <MenuIcon onClick={()=>setDropdownToggle(toggle=>!toggle)} className="hamburger"/>
            {dropdownToggle && 
                <div className="dropdown-menu">
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="/">Home</NavLink>
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="/wishlist">Wishlist</NavLink>
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="/cart">Cart</NavLink>
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="/login">{login?"Logout":"Login"}</NavLink>
                    {login || <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="/register">Register</NavLink>}
                </div>}
        </div>
    )
}

export default MobileHeader
