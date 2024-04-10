import "./App.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import axios from "axios";
import { socket } from "../utils/socket.js";

import { checkSignIn } from './components/authentication/authenticationHelpers.js';
import { getUserData } from "../utils/dataService.js";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [productData, setProductData] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(0);

  const navigate = useNavigate();

  const handleSignIn = async ({ email, password }) => {
    const signedIn = await checkSignIn({ email, password });
    if (signedIn) {
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
      const user = await getUserData(userQuery);
      setUser(user);
      setSignedIn(true);
    }
    fetchUserData();
  }, [email]);

  const handleSignOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setSignedIn(false);
    navigate('/');
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await getData();
      // console.log(response);
      setProductData(response);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (user && user.basket && user.basket.items) {
      const totalItems = user.basket.items.reduce((acc, item) => acc + Number(item.quantity), 0);
      setNumberOfItems(totalItems);
    } else {
      setNumberOfItems(0);
    }
  }, [user]);

  return (
    <>
      <Header productData={productData} signedIn={signedIn} user={user} numberOfItems={numberOfItems} />
      <Routes>
        <Route path="/" element={<Home productData={productData} signedIn={signedIn} user={user} />} />
        <Route path="/profile" element={<Profile signedIn={signedIn} handleSignOut={handleSignOut} user={user} productData={productData} />} />
        <Route path="/signIn" element={<SignIn handleSignIn={handleSignIn} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/search" element={<SearchResults productData={productData} />} />
        <Route path="/shop" element={<Products productData={productData} />} />
        <Route path="/product/:id" element={<SingleProduct user={user} setNumberOfItems={setNumberOfItems} />} />
        <Route path="/basket" element={<Basket signedIn={signedIn} user={user} productData={productData} numberOfItems={numberOfItems} setNumberOfItems={setNumberOfItems} />} />
        <Route path="/success" element={<Success />} />
        <Route path="/canceled" element={<Cancel />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;