import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../../actions/userActions.js";
import { listMyOrders } from "../../actions/orderActions.js";
import "./ProfileScreen.css"; // custom styles

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setMessage(null);
    }
  };

  return (
    <div className="profile-grid">
      <div className="profile-form-container">
        <h1 className="profile-title">User Profile</h1>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="error-message">{message}</p>}
        {success && <p className="success-message">Profile Successfully Updated</p>}

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">
            Update
          </button>
        </form>
      </div>

      {/* Orders Section */}
      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>

        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : errorOrders ? (
          <p className="error-message">{errorOrders}</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "Not Delivered"}
                    </td>
                    <td>
                      <RouterLink to={`/order/${order._id}`} className="btn-small">
                        Details
                      </RouterLink>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
