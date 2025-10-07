import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/CartAction";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps";
import FormContainer from "../FormContainer";
import { countries } from "../../data/countries";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div style={styles.page}>
      <FormContainer>
        <h1 style={styles.heading}>Shipping</h1>
        <CheckoutSteps step1 step2 />

        <form onSubmit={submitHandler} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="address" style={styles.label}>Address</label>
            <input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              type="text"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="city" style={styles.label}>City</label>
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              type="text"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="postalCode" style={styles.label}>Postal Code</label>
            <input
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code"
              type="text"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="country" style={styles.label}>Country</label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" style={styles.button}>
            Continue
          </button>
        </form>
      </FormContainer>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: "20px",
  },
  heading: {
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "500",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    backgroundColor: "#fff",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

export default ShippingScreen;
