import React, { useState } from 'react'
import './Subtotal.css'
import { NumericFormat } from 'react-number-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const [isGift, setIsGift] = useState(false);
  const navigate = useNavigate();

  // Add $79 if the gift checkbox is checked
  const subtotal = getBasketTotal(basket) + (isGift ? 79 : 0);

  return (
    <div className="subtotal">
      <NumericFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input
                type="checkbox"
                checked={isGift}
                onChange={() => setIsGift(!isGift)}
              />{' '}
              This order contains a gift (+$79)
            </small>
          </>
        )}
        decimalScale={2}
        value={subtotal}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button onClick={() => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
}
export default Subtotal