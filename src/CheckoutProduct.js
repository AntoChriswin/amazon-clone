import React from 'react'
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
import { saveUserBasket } from './basketService';

function CheckoutProduct({id,title,image,price,rating}) {

    const [{basket, user},dispatch] = useStateValue();

    const removeFromBasket = async () => {
        if (!user) return;
        
        let newBasket = [...basket];
        const index = basket.findIndex((basketItem) => basketItem.id === id); 
        
        if (index >= 0) {
            newBasket.splice(index, 1);
        } else {
            console.warn(`Cant remove product (id: ${id}) as its not in basket!`);
            return;
        }

        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id
        });
        
        // Save updated basket to Firestore
        try {
            await saveUserBasket(user.uid, newBasket);
        } catch (error) {
            console.error('Error saving basket:', error);
        }
    }

    return (
        <div className='checkoutproduct'>
            <img className='checkoutproduct_image' src={image} alt=""></img>
            <div className='checkoutproduct_info'>
                <p className='checkoutproduct_title'>{title}</p>
                <p className='checkoutproduct_price'>
                    <small>₹ </small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutproduct_rating'>
                    {
                        Array(rating)
                        .fill()
                        .map((_) =>(<p>⭐</p>))
                    }
                </div>
                <button onClick={removeFromBasket}>Remove from cart</button>
            </div>

        </div>
    )
}

export default CheckoutProduct