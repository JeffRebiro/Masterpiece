import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from "../../actions/productActions";
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

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: '#e53e3e' }}>Error: {error}</div>;
    if (!product) return <div style={{ textAlign: 'center', padding: '2rem' }}>Product not found</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
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

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                alignItems: 'start'
            }}>
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

                <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1.5rem'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.75rem 0',
                        borderBottom: '1px solid #eee'
                    }}>
                        <span>Price:</span>
                        <span style={{ fontWeight: 'bold', color: '#2c7a7b' }}>${product.price}</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        padding: '0.75rem 0',
                        borderBottom: '1px solid #eee'
                    }}>
                        <span>Quantity:</span>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <button
                                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontSize: '1rem',
                                        background: '#edf2f7',
                                        border: '1px solid #ccc',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                        minWidth: '45px'
                                    }}
                                >
                                    −
                                </button>
                                <span style={{
                                    minWidth: '2rem',
                                    textAlign: 'center',
                                    fontWeight: '600'
                                }}>
                                    {qty}
                                </span>
                                <button
                                    onClick={() => setQty(prev => Math.min(10, prev + 1))}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontSize: '1rem',
                                        background: '#edf2f7',
                                        border: '1px solid #ccc',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                        minWidth: '45px'
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <span style={{ fontWeight: 'bold', color: '#2d3748' }}>
                                ${(product.price * qty).toFixed(2)}
                            </span>
                        </div>
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

            <style>{`
                @media (max-width: 768px) {
                    .product-screen {
                        padding: 1rem !important;
                    }
                    
                    .product-grid {
                        grid-template-columns: 1fr !important;
                        gap: 1.5rem !important;
                    }
                    
                    .quantity-controls {
                        flex-direction: column !important;
                        gap: 1rem !important;
                    }
                    
                    .quantity-buttons {
                        justify-content: center !important;
                    }
                    
                    .subtotal {
                        text-align: center !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProductScreen;