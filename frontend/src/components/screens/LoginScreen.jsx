import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../actions/userActions";
import "./LoginScreen.css";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h1 className="title">Sign In</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="register-text">
          New Customer?{" "}
          <RouterLink to="/register" className="register-link">
            Click Here To Register
          </RouterLink>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
