import React, { useEffect } from 'react';
import { useParams, useSearchParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/CartAction';
import { IoTrashBinSharp } from 'react-icons/io5';

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const qty = searchParams.get('qty');

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, Number(qty)));
        }
    }, [dispatch, id, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#ffe5e5',
                    color: '#a00',
                    borderRadius: '0.5rem',
                    fontWeight: '500'
                }}>
                    Your Cart Is Empty.{' '}
                    <RouterLink to="/" style={{ color: '#0077cc', textDecoration: 'underline' }}>
                        Go Back
                    </RouterLink>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    <div>
                        {cartItems.map(item => (
                            <div key={item.product} style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1.5rem',
                                borderBottom: '1px solid #eee',
                                paddingBottom: '1rem'
                            }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        marginRight: '1rem',
                                        borderRadius: '0.25rem'
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <RouterLink to={`/product/${item.product}`} style={{
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#333',
                                        textDecoration: 'none'
                                    }}>
                                        {item.name}
                                    </RouterLink>
                                    <p style={{ marginBottom: '0.5rem', color: '#666' }}>Price: ${item.price}</p>
                                    <button
                                        onClick={() => removeFromCartHandler(item.product)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#c00',
                                            cursor: 'pointer',
                                            fontSize: '1.2rem'
                                        }}
                                        title="Remove item"
                                    >
                                        <IoTrashBinSharp />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        border: '1px solid #ddd',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                        </h2>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </p>
                        <button
                            onClick={checkoutHandler}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#0077cc',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.25rem',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
