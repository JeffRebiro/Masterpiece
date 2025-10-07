import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { IoCaretForwardSharp } from "react-icons/io5";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.breadcrumb}>
        <li style={styles.item}>
          {step1 ? (
            <RouterLink to="/login" style={styles.active}>Sign In</RouterLink>
          ) : (
            <span style={styles.disabled}>Sign In</span>
          )}
        </li>
        <IoCaretForwardSharp style={styles.icon} />

        <li style={styles.item}>
          {step2 ? (
            <RouterLink to="/shipping" style={styles.active}>Shipping</RouterLink>
          ) : (
            <span style={styles.disabled}>Shipping</span>
          )}
        </li>
        <IoCaretForwardSharp style={styles.icon} />

        <li style={styles.item}>
          {step3 ? (
            <RouterLink to="/payment" style={styles.active}>Payment</RouterLink>
          ) : (
            <span style={styles.disabled}>Payment</span>
          )}
        </li>
        <IoCaretForwardSharp style={styles.icon} />

        <li style={styles.item}>
          {step4 ? (
            <RouterLink to="/placeorder" style={styles.active}>Place Order</RouterLink>
          ) : (
            <span style={styles.disabled}>Place Order</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  breadcrumb: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: 0,
    margin: 0,
    fontSize: "1rem",
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  active: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#007bff",
  },
  disabled: {
    color: "gray",
    cursor: "not-allowed",
  },
  icon: {
    color: "#555",
    fontSize: "1rem",
  },
};

export default CheckoutSteps;
