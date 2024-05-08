import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import Products from "./pages/Products.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import SingleProduct from "./pages/SingleProduct";
import Basket from "./pages/Basket.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import "./App.css";

import { getData } from "../utils/dataHandlers.js";
import { getUserData } from "../utils/dataService.js";
import { checkSignIn } from './components/authentication/authenticationHelpers.js';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [productData, setProductData] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
          setEmail(storedEmail);
          const userQuery = { email: storedEmail };
          const user = await getUserData(userQuery);
          setUser(user);
          setSignedIn(true);
        }
        const response = await getData();
        setProductData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.basket && user.basket.items) {
      const totalItems = user.basket.items.reduce((acc, item) => acc + Number(item.quantity), 0);
      setNumberOfItems(totalItems);
    } else {
      setNumberOfItems(0);
    }
  }, [user]);

  const handleSignIn = async ({ email, password }) => {
    const signedIn = await checkSignIn({ email, password });
    if (signedIn) {
      setEmail(email);
      navigate('/');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('email');
    setUser(null);
    setSignedIn(false);
    navigate('/');
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header productData={productData} signedIn={signedIn} user={user} numberOfItems={numberOfItems} />
      <div className="flex-grow-1">
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
      </div>
      <Footer />
    </div>
  )
}

export default App;