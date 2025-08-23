import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { getBasketTotal } from './reducer';
import './Orders.css';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          orderBy('created', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          orderNumber: `Order #${String(index + 1).padStart(3, '0')}`,
          ...doc.data(),
          created: doc.data().created?.toDate() || new Date()
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="orders">
        <div className="orders__container">
          <div className="orders__loading">
            <div className="orders__spinner"></div>
            Loading your orders...
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="orders">
        <div className="orders__container">
          <div className="orders__signIn">
            <h2 className="orders__signInTitle">Please Sign In</h2>
            <p className="orders__signInText">You need to be signed in to view your orders.</p>
            <Link to="/login">
              <button className="orders__signInButton">Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <div className="orders__container">
        <div className="orders__header">
          <h1 className="orders__title">Your Orders</h1>
          <p className="orders__subtitle">Track your orders and view order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="orders__empty">
            <div className="orders__emptyIcon">📦</div>
            <h3 className="orders__emptyTitle">No orders yet</h3>
            <p className="orders__emptyText">When you place your first order, it will appear here.</p>
            <Link to="/">
              <button className="orders__signInButton">Start Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="orders__list">
            {orders.map((order) => (
              <div key={order.id} className="orders__card">
                <div className="orders__cardHeader">
                  <div className="orders__orderInfo">
                    <h3 className="orders__orderNumber">{order.orderNumber}</h3>
                    <p className="orders__orderDate">
                      Ordered on {order.created.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="orders__orderTotal">
                    ₹{order.total?.toFixed(2) || getBasketTotal(order.basket).toFixed(2)}
                  </div>
                </div>

                <div className="orders__deliveryInfo">
                  <div className="orders__infoGroup">
                    <span className="orders__infoLabel">Delivery To</span>
                    <span className="orders__infoValue">{order.username}</span>
                  </div>
                  <div className="orders__infoGroup">
                    <span className="orders__infoLabel">Phone</span>
                    <span className="orders__infoValue">{order.phone}</span>
                  </div>
                  <div className="orders__infoGroup">
                    <span className="orders__infoLabel">Pin Code</span>
                    <span className="orders__infoValue">{order.pin}</span>
                  </div>
                  <div className="orders__infoGroup">
                    <span className="orders__infoLabel">Status</span>
                    <span className="orders__status orders__status--processing">Processing</span>
                  </div>
                </div>

                <div className="orders__itemsSection">
                  <h4 className="orders__itemsTitle">Items ({order.basket.length})</h4>
                  <div className="orders__itemsList">
                    {order.basket.map((item, index) => (
                      <div key={index} className="orders__item">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="orders__itemImage"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60x60?text=Image';
                          }}
                        />
                        <div className="orders__itemInfo">
                          <h5 className="orders__itemTitle">{item.title}</h5>
                          <div className="orders__itemPrice">₹{item.price}</div>
                          <div className="orders__itemRating">
                            {Array(item.rating).fill().map((_, i) => (
                              <span key={i} className="orders__star">⭐</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="orders__actions">
                  <button className="orders__button orders__button--primary">
                    Track Package
                  </button>
                  <button className="orders__button orders__button--secondary">
                    Buy Again
                  </button>
                  <button className="orders__button orders__button--secondary">
                    Leave a Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
