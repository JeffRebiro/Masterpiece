import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import Rating from "../Rating";
import "./ProductScreen.css";

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
  if (!product || Object.keys(product).length === 0) return <div className="error">Product not found</div>;

  return (
    <div className="product-container">
      <Link to="/" className="back-button">← Go Back</Link>

      <div className="product-grid">
        {/* Image */}
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        {/* Info */}
        <div className="product-info">
          <p className="product-brand">{product.brand}</p>
          <h1 className="product-name">{product.name}</h1>
          <Rating value={product.rating} />
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
        </div>

        {/* Purchase */}
        <div className="purchase-box">
          <div className="purchase-row">
            <span>Price:</span>
            <span className="total-price">${product.price}</span>
          </div>

          <div className="purchase-row">
            <span>Quantity:</span>
            <div className="qty-controls">
              <button onClick={() => setQty((prev) => Math.max(1, prev - 1))} className="qty-button">−</button>
              <span className="qty-display">{qty}</span>
              <button onClick={() => setQty((prev) => Math.min(10, prev + 1))} className="qty-button">+</button>
            </div>
            <span className="total-price">${(product.price * qty).toFixed(2)}</span>
          </div>

          <button onClick={addToCartHandler} className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
