import React from 'react'
import './Product.css';
import { useStateValue } from './StateProvider';
import { saveUserBasket } from './basketService';

function Product({id,title,price,rating,image}) {
    const [{ basket, user },dispatch] = useStateValue();
    console.log("this is the basket ->>",basket)
    
    const addToBasket = async () => {
        if (!user) {
            alert('Please sign in to add items to your cart');
            return;
        }
        
        const newBasket = [...basket, {
            id: id,
            title: title,
            price: price,
            rating: rating,
            image: image,
        }];
        
        dispatch({
            type: 'ADD_TO_BASKET',
            item:{
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image,
            },
        });
        
        // Save updated basket to Firestore
        try {
            await saveUserBasket(user.uid, newBasket);
        } catch (error) {
            console.error('Error saving basket:', error);
        }
    };
    
    return (
        <div className='product'>
            <div className='product_info'>
                <p className='product_title'>{title}</p>
                <p className='product_price'>
                    <small>₹ </small>
                    <strong>{price}</strong>
                </p>
                <div className='product_rating'>
                    {
                        Array(rating)
                        .fill()
                        .map((_) =>(<p>⭐</p>))
                    }
                </div>
            </div>
            <img src={image} alt=""/>
            <button onClick={addToBasket} className='product_button'>
                {user ? 'Add to Cart' : 'Sign in to Add to Cart'}
            </button>
        </div>
    );
}

export default Product