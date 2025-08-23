import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/orders', { state: location.state });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return <h2 style={{textAlign: 'center', marginTop: '2rem'}}>Your order was successfully placed!</h2>;
}
export default OrderSuccess;
