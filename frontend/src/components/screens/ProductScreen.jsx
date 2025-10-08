import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from "../../actions/productActions";
import React from "react";
import Rating from "../Rating";

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product || Object.keys(product).length === 0) return <div>Product not found</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Back Button */}
            <div style={{ marginBottom: '2rem' }}>
                <Link
                    to="/"
                    style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: '#f0f0f0',
                        borderRadius: '0.25rem',
                        textDecoration: 'none',
                        color: '#333',
                        fontWeight: '500'
                    }}
                >
                    ← Go Back
                </Link>
            </div>

            {/* Product Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                alignItems: 'start'
            }}>
                {/* Product Image */}
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: '100%',
                            borderRadius: '0.5rem',
                            objectFit: 'contain',
                            maxHeight: '500px'
                        }}
                    />
                </div>

                {/* Product Info */}
                <div>
                    <p style={{ color: '#666', marginBottom: '0.5rem' }}>{product.brand}</p>
                    <h1 style={{ fontSize: '2rem', margin: '0 0 1rem' }}>{product.name}</h1>
                    <Rating value={product.rating} />
                    <p style={{
                        fontSize: '1.5rem',
                        color: '#2c7a7b',
                        fontWeight: 'bold',
                        margin: '1.5rem 0'
                    }}>
                        ${product.price}
                    </p>
                    <p style={{ lineHeight: '1.6' }}>{product.description}</p>
                </div>

                {/* Purchase Box */}
                <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1.5rem'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid #eee'
                    }}>
                        <span>Price:</span>
                        <span style={{ fontWeight: 'bold' }}>${product.price}</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid #eee'
                    }}>
                        <span>Quantity:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                                style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '1rem',
                                    background: '#edf2f7',
                                    border: '1px solid #ccc',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer'
                                }}
                            >
                                −
                            </button>
                            <span style={{ minWidth: '2rem', textAlign: 'center' }}>{qty}</span>
                            <button
                                onClick={() => setQty((prev) => Math.min(10, prev + 1))}
                                style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '1rem',
                                    background: '#edf2f7',
                                    border: '1px solid #ccc',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer'
                                }}
                            >
                                +
                            </button>
                        </div>
                        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                            ${(product.price * qty).toFixed(2)}
                        </span>
                    </div>

                    <button onClick={addToCartHandler} style={{
                        width: '100%',
                        background: '#2c7a7b',
                        color: 'white',
                        padding: '0.75rem',
                        marginTop: '1.5rem',
                        border: 'none',
                        borderRadius: '0.25rem',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;
