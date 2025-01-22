import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart, updateQuantity, setCart } from '../store/cartSlice'; // Add setCart action
import './Cart.css';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Load cart from local storage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            dispatch(setCart(JSON.parse(savedCart))); // Dispatch the action to set the cart state
        }
    }, [dispatch]);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleIncreaseQuantity = (item) => {
        dispatch(addToCart(item));
    };

    const handleDecreaseQuantity = (id) => {
        dispatch(updateQuantity({ id, amount: -1 }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="cart-container">
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{item.title}</h3>
                                    <p className="cart-item-price">Price: ${item.price}</p>
                                    <p className="cart-item-size">Size: {item.size}</p>
                                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                                    <div className="cart-item-actions">
                                        <button
                                            className="quantity-btn increase"
                                            onClick={() => handleIncreaseQuantity(item)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="quantity-btn decrease"
                                            onClick={() => handleDecreaseQuantity(item.id)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <p>Total: ${calculateTotal()}</p>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
            <div className="back-to-home">
                <button onClick={handleBackToHome} className="back-btn">Back to Home</button>
            </div>
        </div>
    );
};

export default Cart;
