import './App.css';
import React, { useEffect } from 'react';
import Header  from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { auth  } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"; 


function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        // User is signed in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // User is signed out
        dispatch({
          type: "SET_USER",
          user: null,
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
          <Route path="/" element=
          {<>
            <Header/>
            <Home/>
          </>} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

