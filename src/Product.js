import React from 'react'
import './Product.css';
import { useStateValue } from './StateProvider';


function Product({id,title,price,rating,image}) {
    const [{ basket },dispatch] = useStateValue();
    console.log("this is the basket ->>",basket)
    const addToBasket = () =>{
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
        <button onClick={addToBasket} className='product_button'>Add to Cart</button>
    </div>
  );
}

export default Product