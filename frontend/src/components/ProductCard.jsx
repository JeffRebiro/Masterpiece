import Rating from './Rating';
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // <-- Add this line to import the CSS

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className="product-card-link">
            <div className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="card-body"> {/* New wrapper for text content */}
                    <h3 className="card-title">{product.name}</h3>
                    <div className="product-rating-area">
                        <Rating value={product.rating} />
                    </div>
                    <p className="card-price">${product.price}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;