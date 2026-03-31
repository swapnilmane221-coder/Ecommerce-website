import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductList from "./pages/productList";
import ProductDetail from "./pages/productDetail";
import Navbar from './component/Navbar';
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/Checkoutpage";
import PrivateRouter from "./component/PrivateRouter";
import Login from './pages/login.jsx';
import Signup from "./pages/signup";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route element={<PrivateRouter/>}>
          <Route path="/checkout" element={<CheckoutPage/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;