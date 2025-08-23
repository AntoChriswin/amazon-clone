import './App.css';
import React, { useEffect } from 'react';
import Header  from './Header';
import Home from './Home';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { auth  } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"; 
import Payment from './Payment';
import OrderSuccess from './OrderSuccess';
import Orders from './Orders';
import { loadUserBasket, clearUserBasket } from './basketService';

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        // User is signed in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        
        // Load user's basket from Firestore
        try {
          const userBasket = await loadUserBasket(authUser.uid);
          dispatch({
            type: "LOAD_BASKET",
            basket: userBasket
          });
        } catch (error) {
          console.error('Error loading user basket:', error);
        }
      } else {
        // User is signed out
        dispatch({
          type: "SET_USER",
          user: null,
        });
        
        // Clear basket from state
        dispatch({
          type: "CLEAR_BASKET"
        });
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/checkout" element={<><Header/><Checkout/></>} />
          <Route path="/login" element={<><Login/></>} />
          <Route path="/payment" element={<><Header/><Payment/></>} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<><Header/><Orders/></>} />
          <Route path="/" element={
            <>
              <Header/>
              <Home/>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

