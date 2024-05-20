import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Contact from "./component/Contact";
import About from "./component/About";
import Error from "./component/Error";
import ProductDetail from "./component/screen/ProductDetail";
import Header from "./component/Header";
import Footer from "./component/Footer";
import CartScreen from "./component/screen/CartScreen";
import LoginScreen from "./component/screen/LoginScreen";
import RegisterScreen from "./component/screen/RegisterScreen";
import ProfileScreen from "./component/screen/ProfileScreen";
import ShippingScreen from "./component/screen/ShippingScreen";
import PaymentScreen from "./component/screen/PaymentScreen";
import PlaceOrderScreen from "./component/screen/PlaceOrderScreen";
import OrderScreen from "./component/screen/OrderScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
