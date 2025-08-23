import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useStateValue } from './StateProvider';
import {auth} from './firebase';


function Header() {
    const [{basket,user}]=useStateValue();

    console.log(basket);

    const handleAuth = () =>{
        if (user){
            auth.signOut();
        }
    }
    
    const handleCartClick = (e) => {
        if (!user) {
            e.preventDefault();
            alert('Please sign in to view your cart');
        }
    }
    
  return (
    <nav className = "header">
        <Link to ="/">
            <img className = "header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt=""></img>
        </Link>

        <div className = "header_search">
            <input type='text' className="header_searchInput"/>
            <SearchIcon className="header_searchIcon"/>
        </div>
        
        <div className='header_nav'>
            <Link to= {!user && "/login"} className='header_link'>
                <div onClick={handleAuth} className='header_option'>
                    <span className='header_option1'>hello {!user ? 'Guest' : user.email }</span>
                    <span className='header_option2'>{user ? 'Sign Out' : 'Sign In'}</span>
                </div>
            </Link>

            <Link to="/orders" className='header_link'>
                <div className='header_option'>
                    <span className='header_option1'>Your</span>
                    <span className='header_option2'>Orders</span>
                </div>
            </Link>

            <Link to="/" className='header_link'>
                <div className='header_option'>
                    <span className='header_option1'>Your</span>
                    <span className='header_option2'>Prime</span>
                </div>
            </Link>
        </div>

        <Link to={user ? "/checkout" : "#"} className='header_link' onClick={handleCartClick}>
            <div className='header_optionBasket'>
                <ShoppingBasketIcon className="header_ShoppingBasketIcon"/>
                <span className='header_option2 header_basketcount'>{user ? basket?.length : 0}</span>
            </div>
        </Link>

    </nav>
  )
}

export default Header