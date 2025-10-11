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
        <div style={{ 
            padding: '1rem', 
            maxWidth: '1200px', 
            margin: '0 auto',
            minHeight: '100vh'
        }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <Link
                    to="/"
                    style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: '#f0f0f0',
                        borderRadius: '0.25rem',
                        textDecoration: 'none',
                        color: '#333',
                        fontWeight: '500',
                        fontSize: '0.9rem'
                    }}
                >
                    ← Go Back
                </Link>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem',
                alignItems: 'start'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            borderRadius: '0.5rem',
                            objectFit: 'contain',
                            maxHeight: '400px'
                        }}
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <p style={{ 
                        color: '#666', 
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem'
                    }}>
                        {product.brand}
                    </p>
                    <h1 style={{ 
                        fontSize: '1.75rem', 
                        margin: '0 0 1rem',
                        lineHeight: '1.3'
                    }}>
                        {product.name}
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Rating value={product.rating} />
                    </div>
                    <p style={{
                        fontSize: '1.5rem',
                        color: '#2c7a7b',
                        fontWeight: 'bold',
                        margin: '1rem 0'
                    }}>
                        ${product.price}
                    </p>
                    <p style={{ 
                        lineHeight: '1.6',
                        fontSize: '0.95rem'
                    }}>
                        {product.description}
                    </p>
                </div>

                <div style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    maxWidth: '500px',
                    margin: '0 auto 0 calc(50% - 120px)',
                    width: '100%'
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
                        padding: '0.75rem 0',
                        borderBottom: '1px solid #eee'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                        }}>
                            <span>Quantity:</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <button
                                    onClick={() => setQty(prev => Math.max(1, prev - 1))}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        fontSize: '1.1rem',
                                        background: '#edf2f7',
                                        border: '1px solid #ccc',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                        minWidth: '50px'
                                    }}
                                >
                                    −
                                </button>
                                <span style={{
                                    minWidth: '3rem',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    fontSize: '1.2rem'
                                }}>
                                    {qty}
                                </span>
                                <button
                                    onClick={() => setQty(prev => Math.min(10, prev + 1))}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        fontSize: '1.1rem',
                                        background: '#edf2f7',
                                        border: '1px solid #ccc',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                        minWidth: '50px'
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <span style={{ 
                                fontWeight: 'bold', 
                                color: '#2d3748',
                                fontSize: '1.1rem'
                            }}>
                                ${(product.price * qty).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button onClick={addToCartHandler} style={{
                        width: '100%',
                        background: '#2c7a7b',
                        color: 'white',
                        padding: '1rem',
                        marginTop: '1.5rem',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: '600'
                    }}>
                        Add to Cart
                    </button>
                </div>
            </div>

            <style>{`
                @media (min-width: 768px) {
                    .product-grid {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 2rem !important;
                    }
                    
                    .product-info {
                        text-align: left !important;
                    }
                    
                    .rating-container {
                        justify-content: flex-start !important;
                    }
                    
                    .purchase-box {
                        grid-column: 1 / -1 !important;
                        max-width: 400px !important;
                    }
                }
                
                @media (min-width: 1024px) {
                    .product-grid {
                        grid-template-columns: 1fr 1fr 1fr !important;
                        gap: 3rem !important;
                    }
                    
                    .purchase-box {
                        grid-column: auto !important;
                        margin: 0 !important;
                    }
                    
                    .product-screen {
                        padding: 2rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProductScreen;