import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from "../../actions/productActions";
import React from "react";
import Rating from "../Rating";
import './ProductScreen.css'; // Optional: you can use a separate CSS file

const ProductScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, product } = useSelector((state) => state.productDetails);

    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!product || Object.keys(product).length === 0) return <div>Product not found</div>;

    return (
        <div className="product-screen">
            {/* Back Button */}
            <div className="back-button">
                <Link to="/" className="back-link">
                    ← Go Back
                </Link>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
                {/* Product Image */}
                <div className="image-section">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />
                </div>

                {/* Product Info */}
                <div className="info-section">
                    <p className="product-brand">{product.brand}</p>
                    <h1 className="product-name">{product.name}</h1>
                    <div className="rating-section">
                        <Rating value={product.rating} />
                        <span className="rating-text">({product.numReviews} reviews)</span>
                    </div>
                    <p className="product-description">{product.description}</p>
                </div>

                {/* Purchase Box */}
                <div className="purchase-section">
                    <div className="price-box">
                        <span className="price-label">Price:</span>
                        <span className="price-value">${product.price}</span>
                    </div>

                    <div className="quantity-box">
                        <span className="quantity-label">Quantity:</span>
                        <div className="quantity-controls">
                            <button
                                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                                className="quantity-btn"
                            >
                                −
                            </button>
                            <span className="quantity-display">{qty}</span>
                            <button
                                onClick={() => setQty((prev) => Math.min(10, prev + 1))}
                                className="quantity-btn"
                            >
                                +
                            </button>
                        </div>
                        <span className="subtotal">
                            ${(product.price * qty).toFixed(2)}
                        </span>
                    </div>

                    <button 
                        onClick={addToCartHandler} 
                        className="add-to-cart-btn"
                        disabled={product.countInStock === 0}
                    >
                        {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    
                    {product.countInStock > 0 && (
                        <div className="stock-info">
                            In Stock: {product.countInStock} units
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;