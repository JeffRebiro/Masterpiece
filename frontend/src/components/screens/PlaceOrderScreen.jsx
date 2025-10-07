import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps";
import "./PlaceOrderScreen.css"; // we'll style here

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice < 5000 ? 0 : 0;
  cart.taxPrice = Number((0.28 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    if (success) {
      navigate(`/order/${order._id}`);
    }
    alert("Order Placed Successfully!");
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success, order]);


  return (
    <div className="placeorder-container">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="placeorder-grid">
        {/* LEFT SECTION */}
        <div className="placeorder-left">
          {/* Shipping */}
          <div className="placeorder-box">
            <h2>Shipping</h2>
            <p>
              <strong>Address:</strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment */}
          <div className="placeorder-box">
            <h2>Payment Method</h2>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="placeorder-box">
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="placeorder-items">
                {cart.cartItems.map((item, index) => (
                  <li key={index} className="placeorder-item">
                    <img src={item.image} alt={item.name} />
                    <RouterLink to={`/product/${item.product}`}>
                      {item.name}
                    </RouterLink>
                    <span>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="placeorder-right">
          <div className="summary-box">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items:</span>
              <span>${cart.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${cart.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${cart.taxPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${cart.totalPrice}</span>
            </div>
            <button
              className="btn-primary"
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
