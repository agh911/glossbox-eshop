import "./App.css";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getData } from "../utils/dataHandlers.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import { SignIn } from "./pages/SignIn.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import Products from "./pages/Products.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import SingleProduct from "./pages/SingleProduct";
import Basket from "./pages/Basket.jsx";

function App() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await getData();
      console.log(response);
      setProductData(response);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Header productData={productData} />
      <Routes>
        <Route path="/" element={<Home productData={productData} />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/search" element={<SearchResults productData={productData} />} />
        <Route path="/shop" element={<Products productData={productData} />} />
        <Route path="/product/:id" element={<SingleProduct productData={productData} />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;