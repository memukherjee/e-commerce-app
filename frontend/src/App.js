import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";

function App() {

  
  const [mouseOverNavItem, setMouseOverNavItem] = useState(false)
  const [mouseOverLink, setMouseOverLink] = useState(false)

  return (
    <Router>
      <Cursor mouseOverNavItem={mouseOverNavItem} mouseOverLink={mouseOverLink}/>
      <Routes>
        <Route path="/" element={<Home setMouseOverNavItem={setMouseOverNavItem} setMouseOverLink={setMouseOverLink}/>} />
        <Route path="/product/:pid" element={<Product />} />
        <Route path="/products/:category" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
