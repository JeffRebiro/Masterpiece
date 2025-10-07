import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../actions/orderActions";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./OrderScreen.css";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  useEffect(() => {
    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET });   // 🔹 Reset Pay state
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, successPay]);

  if (loading) return <p className="loading">Loading order...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="order-grid">
      {/* Left Column */}
      <div className="order-left">
        <div className="order-box">
          <h2>Shipping Information</h2>
          <p><strong>Name:</strong> {order.user?.name}</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a>
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          <p className={order.isDelivered ? "status delivered" : "status not-delivered"}>
            {order.isDelivered ? `Delivered at ${order.deliveredAt}` : "Not Delivered"}
          </p>
        </div>

        <div className="order-box">
          <h2>Payment Method</h2>
          <p><strong>Method:</strong> {order.paymentMethod}</p>
          <p className={order.isPaid ? "status paid" : "status not-paid"}>
            {order.isPaid ? `Paid on ${order.paidAt}` : "Not Paid"}
          </p>
        </div>

        <div className="order-box">
          <h2>Items Ordered</h2>
          {order.orderItems.length === 0 ? (
            <p>Order is empty</p>
          ) : (
            <ul>
              {order.orderItems.map((item, index) => (
                <li key={index} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>{item.qty} × ${item.price} = ${item.qty * item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="order-right">
        <div className="order-box">
          <h2>Order Summary</h2>
          <p><strong>Shipping:</strong> ${order.shippingPrice}</p>
          <p><strong>Tax:</strong> ${order.taxPrice}</p>
          <p className="total"><strong>Total:</strong> ${order.totalPrice}</p>
        </div>

        {!order.isPaid && (
          <div className="order-box">
            <h2>Pay with PayPal</h2>
            {loadingPay ? (
              <p>Processing payment...</p>
            ) : (
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AbCWawRqgTtLVVCXOZojr41rc7ooz60ClZWU8y8UynDk3KmHn5syU0o41cyMi5iyh_E3brYWPGuLOFfr",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: order.totalPrice,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      alert(`Transaction completed by ${details.payer.name.given_name}`);
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderScreen;
