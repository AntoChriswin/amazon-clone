import React from 'react'
import { useStateValue } from './StateProvider'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';


function Checkout() {
  
    const[{basket},dispatch] = useStateValue();
  
    return (
    <div className='checkout'>
        <div className='checkout_left'>
            <img className='checkout_ad' src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Priya/AugArt/M36/Category-PC_Hero_3000x1200Lifestyle-_1M36._CB805227689_.jpg" alt=""></img>

            {basket?.length === 0 ?(
                <div>
                    <h2>Your Shopping Basket is empty</h2>
                    <p> You have no items in your basket. To buy one or more items, "add to cart" net to the item.</p>
                </div>
            ) : (
                <div>
                    <h2 className = "checkout_title">Your Shopping Basket </h2>
                    {basket.map(item =>(
                        <CheckoutProduct
                            id = {item.id}
                            title = {item.title}
                            image = {item.image}
                            price = {item.price}
                            rating = {item.rating}
                        />
                    ))}

                </div>
            )}
        </div>
        {basket.length > 0 &&(
            <div className='checkout_right'>
                <h1>Subtotal</h1>
                <Subtotal></Subtotal>
            </div>
        )}

    </div>
  )
}

export default Checkout