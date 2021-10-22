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
import { Header, MobileHeader } from './components';
import Checkout from './pages/checkout';
import SuccessOrder from './pages/success';
import FailedOrder from './pages/failed';

toast.configure()

function App() {
  const {login} = useAuth()

  function PrivateRoute({path,login,...props}){
    return login? <Route path={path} {...props}/>:<Navigate state={{from:path}} replace to="/login"/>
  }


  return (
    <div className="App">
      <Header />
      <MobileHeader />
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
          <PrivateRoute login={login} path="/checkout" element={<Checkout/>}/>
          <PrivateRoute login={login} path="/successorder" element={<SuccessOrder/>}/>
          <PrivateRoute login={login} path="/failedorder" element={<FailedOrder/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
