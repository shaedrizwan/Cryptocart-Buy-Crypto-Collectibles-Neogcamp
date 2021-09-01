import './App.css';
import {Routes,Route,NavLink, Navigate} from "react-router-dom";
import {Cart} from "./pages/cart";
import {Home} from "./pages/home";
import {Wishlist} from "./pages/wishlist";
import {ProductDetails} from "./pages/productPage";
import{useCart} from "./CartContext";
import { useWishlist } from './WishlistContext';
import { Products} from "./pages/products";
import { Login } from './pages/login';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from './AuthContext';
import Register from "./pages/register";
import Category from './pages/category';

toast.configure()

function App() {
  const {cartState} = useCart()
  const {wishlistState} = useWishlist()
  const {login} = useAuth()

  function PrivateRoute({path,login,...props}){
    return login? <Route path={path} {...props}/>:<Navigate state={{from:path}} replace to="/login"/>
  }


  return (
    <div className="App">
      <header>
      <NavLink end className="nav-items-home" activeClassName="nav-items-active" to="/">Home</NavLink>
        <NavLink className="nav-items" activeClassName="nav-items-active" to="/wishlist">Wishlist {wishlistState.length !== 0 && <span className="item-notif">{wishlistState.length}</span>}</NavLink>
        <NavLink className="nav-items" activeClassName="nav-items-active" to="/cart">Cart {cartState.length !== 0 && <span className="item-notif">{cartState.length}</span>}</NavLink>
        <NavLink className="nav-items" activeClassName="nav-items-active" to="/login">Login</NavLink>
        <NavLink className="nav-items" activeClassName="nav-items-active" to="/register">Register</NavLink>
      </header>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <PrivateRoute login={login} path="/cart" element={<Cart/>}/>
          <PrivateRoute login={login} path="/wishlist" element={<Wishlist/>}/>
          <Route path="/product/:slug" element={<ProductDetails/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/category/:category" element={<Category/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
