import './App.css';
import {Routes,Route,NavLink} from "react-router-dom";
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

toast.configure()

function App() {
  const {cartState} = useCart()
  const {wishlistState} = useWishlist()
  return (
    <div className="App">
      <nav>
      <NavLink end className="nav-items-home" activeClassName="nav-items-active" to="/">Home</NavLink>
        <NavLink className="nav-items" activeClassName="nav-items-active" to="login">Login</NavLink>
        <NavLink className="nav-items" activeClassName="nav-items-active" to="wishlist">Wishlist {wishlistState.length !== 0 && <span className="item-notif">{wishlistState.length}</span>}</NavLink>
        <NavLink className="nav-items" activeClassName="nav-items-active" to="cart">Cart {cartState.length !== 0 && <span className="item-notif">{cartState.length}</span>}</NavLink>
      </nav>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="wishlist" element={<Wishlist/>}/>
          <Route path="product/:slug" element={<ProductDetails/>}/>
          <Route path="products" element={<Products/>}/>
          <Route path="login" element={<Login/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
