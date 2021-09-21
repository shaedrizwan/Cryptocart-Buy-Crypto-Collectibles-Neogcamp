import './App.css';
import {Routes,Route,Navigate} from "react-router-dom";
import {Cart} from "./pages/cart";
import {Home} from "./pages/home";
import {Wishlist} from "./pages/wishlist";
import {ProductDetails} from "./pages/productPage";
import { Products} from "./pages/products";
import { Login } from './pages/login';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from './AuthContext';
import Register from "./pages/register";
import Category from './pages/category';
import { Header } from './components';

toast.configure()

function App() {
  const {login} = useAuth()

  function PrivateRoute({path,login,...props}){
    return login? <Route path={path} {...props}/>:<Navigate state={{from:path}} replace to="/login"/>
  }


  return (
    <div className="App">
      <Header />
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
