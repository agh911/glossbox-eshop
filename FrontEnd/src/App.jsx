import "./App.css";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getData } from "../utils/dataHandlers.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import { SignIn } from "./pages/SignIn.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import Products from "./pages/Products.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import SingleProduct from "./pages/SingleProduct";
import Basket from "./pages/Basket.jsx";
import axios from "axios";

import { checkSignIn } from './components/authentication/authenticationHelpers.js';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [productData, setProductData] = useState([]);

  const handleSignIn = async ({ email, password }) => {
    const signedIn = await checkSignIn({ email, password });
    if (signedIn) {
      localStorage.setItem('email', email);
      setEmail(email);
    }
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (email == null) {
      return;
    }
    async function fetchUserData() {
      const userQuery = {
        'email': email
      }
      const user = await axios.post(`${import.meta.env.VITE_GLOSSBOXURL}/getUser`, userQuery).then((res) => res.data);
      setUser(user);
      // console.log(user.basket.items[0].product)
      setSignedIn(true);
    }
    fetchUserData();
  }, [email]);

  const handleSignOut = () => {
    localStorage.removeItem('email');
    setSignedIn(false);
  }

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
      <Header productData={productData} signedIn={signedIn} />
      <Routes>
        <Route path="/" element={<Home productData={productData} signedIn={signedIn} user={user} />} />
        <Route path="/profile" element={<Profile signedIn={signedIn} handleSignOut={handleSignOut} user={user} />} />
        <Route path="/signIn" element={<SignIn handleSignIn={handleSignIn} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/search" element={<SearchResults productData={productData} />} />
        <Route path="/shop" element={<Products productData={productData} />} />
        <Route path="/product/:id" element={<SingleProduct productData={productData} user={user} />} />
        <Route path="/basket" element={<Basket signedIn={signedIn} user={user} productData={productData} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;