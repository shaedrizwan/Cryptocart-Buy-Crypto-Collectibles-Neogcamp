import React from 'react'
import "./Header.css"
import {NavLink} from "react-router-dom"
import { useCart } from '../../CartContext'
import { useWishlist } from '../../WishlistContext'
import { SearchBar } from '..'

function Header() {
    const {cartState} = useCart()
    const {wishlistState} = useWishlist()
    return (
        <div className="header">
            <NavLink end className="nav-items-home" activeClassName="nav-items-active" to="/">Home</NavLink>
            <SearchBar />
            <NavLink className="nav-items" activeClassName="nav-items-active" to="/wishlist">Wishlist {wishlistState.length !== 0 && <span className="item-notif">{wishlistState.length}</span>}</NavLink>
            <NavLink className="nav-items" activeClassName="nav-items-active" to="/cart">Cart {cartState.length !== 0 && <span className="item-notif">{cartState.length}</span>}</NavLink>
            <NavLink className="nav-items" activeClassName="nav-items-active" to="/login">Login</NavLink>
            <NavLink className="nav-items" activeClassName="nav-items-active" to="/register">Register</NavLink>
        </div>
    )
}

export default Header
