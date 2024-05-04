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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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
