import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import { register } from "../../actions/userActions";
import "./LoginScreen.css"; // reuse the same CSS styling

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h1 className="title">Register</h1>

        {message && <p className="error-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="register-text">
          Already have an account?{" "}
          <RouterLink to="/login" className="register-link">
            Sign In
          </RouterLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
