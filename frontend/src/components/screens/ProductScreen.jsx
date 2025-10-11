import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from "../../actions/productActions";
import Rating from "../Rating";
import './ProductScreen.css';

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
    if (!product) return <div>Product not found</div>;

    return (
        <div className="product-screen">
            <div className="back-button">
                <Link to="/" className="back-link">← Go Back</Link>
            </div>

            <div className="product-grid">
                <div className="image-section">
                    <img src={product.image} alt={product.name} className="product-image" />
                </div>

                <div className="info-section">
                    <p className="product-brand">{product.brand}</p>
                    <h1 className="product-name">{product.name}</h1>
                    <Rating value={product.rating} />
                    <p className="product-price">${product.price}</p>
                    <p className="product-description">{product.description}</p>
                </div>

                <div className="purchase-section">
                    <div className="price-row">
                        <span>Price:</span>
                        <span className="price-value">${product.price}</span>
                    </div>

                    <div className="quantity-row">
                        <span>Quantity:</span>
                        <div className="quantity-controls">
                            <div className="quantity-buttons">
                                <button onClick={() => setQty(prev => Math.max(1, prev - 1))} className="quantity-btn">
                                    −
                                </button>
                                <span className="quantity-display">{qty}</span>
                                <button onClick={() => setQty(prev => Math.min(10, prev + 1))} className="quantity-btn">
                                    +
                                </button>
                            </div>
                            <span className="subtotal">${(product.price * qty).toFixed(2)}</span>
                        </div>
                    </div>

                    <button onClick={addToCartHandler} className="add-to-cart-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;