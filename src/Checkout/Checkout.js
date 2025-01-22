import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../store/cartSlice';
import './Checkout.css';

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        paymentMethod: 'creditCard',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);  // Loading state

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        address: '',
    });

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Full name is required';
        if (!formData.email) errors.email = 'Email address is required';
        if (!formData.address) errors.address = 'Shipping address is required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;  // return true if no errors
    };

    const handlePlaceOrder = () => {
        if (!validateForm()) return;  // Stop if validation fails

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsModalOpen(true);
        }, 1500);  // Simulate loading time
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        dispatch(resetCart());
        navigate('/');
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout</h2>
            <div className="checkout-content">
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <ul className="order-items">
                        {cartItems.map((item) => (
                            <li key={item.id} className="order-item">
                                <span>{item.title} (x{item.quantity})</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="order-total">
                        <strong>Total:</strong> <span>${calculateTotal()}</span>
                    </div>
                </div>

                <div className="checkout-form">
                    <h3>Billing & Shipping Information</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {formErrors.name && <p className="error">{formErrors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {formErrors.email && <p className="error">{formErrors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Shipping Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                            {formErrors.address && <p className="error">{formErrors.address}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                            >
                                <option value="creditCard">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="cashOnDelivery">Cash on Delivery</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>

            <div className="checkout-actions">
                <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
                <button className="back-to-cart-btn" onClick={() => navigate('/cart')}>
                    Back to Cart
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="modal-icon">&#x2705;</span>  {/* Success check icon */}
                            <h2>Thank You!</h2>
                        </div>
                        <p>Your order has been placed successfully.</p>
                        <p>We appreciate your business!</p>
                        <button className="close-modal-btn" onClick={handleModalClose}>
                            Back to Home
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Checkout;
