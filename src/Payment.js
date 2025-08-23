import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { clearUserBasket } from './basketService';
import { getBasketTotal } from './reducer';
import './Payment.css';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
      setError('You must be logged in to place an order.');
      return;
    }
    
    if (basket.length === 0) {
      setError('Your basket is empty.');
      return;
    }
    
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        username,
        phone,
        pin,
        basket,
        total: getBasketTotal(basket),
        created: new Date()
      });
      
      // Clear basket from state
      dispatch({ type: 'CLEAR_BASKET' });
      
      // Clear basket from Firestore
      await clearUserBasket(user.uid);
      
      navigate('/order-success', { state: { username, phone, pin } });
    } catch (err) {
      console.error('Order placement failed:', err);
      setError('Order placement failed: ' + err.message);
    }
    
    setLoading(false);
  };

  const total = getBasketTotal(basket);

  return (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__header">
          <h1 className="payment__title">Enter Delivery Details</h1>
          <p className="payment__subtitle">Please provide your delivery information to complete your order</p>
        </div>

        {error && (
          <div className="payment__error">
            {error}
          </div>
        )}

        <form className="payment__form" onSubmit={handlePlaceOrder}>
          <div className="payment__formGroup">
            <label className="payment__label">
              Full Name<span className="payment__required">*</span>
            </label>
            <input
              type="text"
              className="payment__input"
              placeholder="Enter your full name"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <p className="payment__helpText">As it appears on your ID</p>
          </div>

          <div className="payment__formGroup">
            <label className="payment__label">
              Phone Number<span className="payment__required">*</span>
            </label>
            <input
              type="tel"
              className="payment__input"
              placeholder="Enter your phone number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <p className="payment__helpText">For delivery updates</p>
          </div>

          <div className="payment__formGroup">
            <label className="payment__label">
              Pin Code<span className="payment__required">*</span>
            </label>
            <input
              type="text"
              className="payment__input"
              placeholder="Enter your pin code"
              value={pin}
              onChange={e => setPin(e.target.value)}
              required
            />
            <p className="payment__helpText">6-digit postal code</p>
          </div>

          <div className="payment__summary">
            <h3 className="payment__summaryTitle">Order Summary</h3>
            <div className="payment__summaryItem">
              <span className="payment__summaryLabel">Items ({basket.length})</span>
              <span className="payment__summaryValue">₹{total.toFixed(2)}</span>
            </div>
            <div className="payment__summaryItem">
              <span className="payment__summaryLabel">Delivery</span>
              <span className="payment__summaryValue">Free</span>
            </div>
            <div className="payment__summaryItem">
              <span className="payment__summaryLabel">Total</span>
              <span className="payment__summaryValue">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="payment__button"
            disabled={loading || basket.length === 0}
          >
            {loading ? (
              <div className="payment__loading">
                <div className="payment__spinner"></div>
                Placing Order...
              </div>
            ) : (
              `Place Order - ₹${total.toFixed(2)}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;

