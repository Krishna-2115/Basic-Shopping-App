import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import logo from '../assets/logo.png';
import './Nav.css';

const Nav = ({ handleInputChange, query }) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav>
      <div>
        <img
          src={logo}
          alt='logo'
          height='40px'
        />
      </div>
      <div className="nav-container">
        <div className="search-wrapper">
          <AiOutlineSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            onChange={handleInputChange}
            value={query}
            placeholder="Search Here"
          />
        </div>
      </div>
      <div className="profile-container">
        <a href="#a">
          <FiHeart className="nav-icons" />
        </a>
        <a href="#a">
          <AiOutlineShoppingCart
            className="nav-icons"
            onClick={handleCartClick}
          />
          {cartItemCount > 0 && (
            <div className="cart-item-count">{cartItemCount}</div>
          )}
        </a>
      </div>
    </nav>
  );
};

export default Nav;
