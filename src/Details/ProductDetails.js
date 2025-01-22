import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../db/data';
import { AiFillStar} from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import './ProductDetails.css';
import { useDispatch} from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Nav from '../Navigation/Nav';

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(product?.img || "");
    const [selectedSize, setSelectedSize] = useState(product?.sizeOptions?.[0] || "");

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.newPrice,
            size: selectedSize,
            image: selectedImage,
        }));
    };

    if (!product) {
        return <h2 style={{ textAlign: 'center', color: 'red' }}>Product not found</h2>;
    }

    return (

        <>
        <Nav/>
            <div className="product-details">
                <button className="back-home" onClick={() => navigate('/')}>
                    <IoIosArrowBack size={24} />
                </button>
                <div className="image-gallery">
                    <img
                        src={selectedImage}
                        alt={product.title}
                        className="product-image"
                    />
                    <div className="thumbnail-gallery">
                        {product.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${product.title}-thumbnail`}
                                className="thumbnail"
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <h2 className="product-title">{product.title}</h2>

                <div className="rating-container">
                    {[...Array(parseInt(product.rating))].map((_, index) => (
                        <AiFillStar key={index} className="star-icon" />
                    ))}
                    <p>{product.rating} out of 5 stars</p>
                </div>

                <del><p className="price">{product.prevPrice}</p></del>
                <p className="price">${product.newPrice}</p>

                <div className="size-selector">
                    <label htmlFor="size-select">Select Size:</label>
                    <select
                        id="size-select"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                    >
                        {product.sizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <p className="description">{product.description || 'No description available.'}</p>

                <div className="feature-list">
                    <h3>Material & Shipping Info:</h3>
                    <ul>
                        <li>Material: {product.material}</li>
                        <li>Shipping: {product.shipping}</li>
                    </ul>
                </div>

                <div className="button-group">
                    <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                    <button className="buy-now" onClick={() => navigate('/cart')}>Buy Now</button>
                </div>

                <div className="feature-list">
                    <h3>Features:</h3>
                    <ul>
                        <li>High-quality materials</li>
                        <li>Comfortable for long use</li>
                        <li>Perfect for outdoor activities</li>
                        <li>Available in multiple colors</li>
                    </ul>
                </div>

                <div className="review-section">
                    <h3>Customer Reviews:</h3>
                    {product.reviews?.map((review, index) => (
                        <div className="review" key={index}>
                            <p>
                                <strong>{review.user}</strong> -{' '}
                                <span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                            </p>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
