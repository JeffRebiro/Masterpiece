import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps";
import { savePaymentMethod } from "../../actions/CartAction";
import FormContainer from "../FormContainer";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const [paymentMethodRadio, setPaymentMethodRadio] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodRadio));
    navigate("/placeorder");
  };

  return (
    <div style={styles.page}>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <h1 style={styles.heading}>Payment Method</h1>

        <form onSubmit={submitHandler} style={styles.form}>
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Select Method</legend>

            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethodRadio === "PayPal"}
                  onChange={(e) => setPaymentMethodRadio(e.target.value)}
                />
                PayPal or Credit Card
              </label>

              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethodRadio === "Stripe"}
                  onChange={(e) => setPaymentMethodRadio(e.target.value)}
                />
                Stripe
              </label>
            </div>
          </fieldset>

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
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fafb",
  },
  heading: {
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldset: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "15px",
  },
  legend: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  radioGroup: {
    display: "flex",
    gap: "20px",
    marginTop: "10px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "1rem",
  },
  button: {
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

export default PaymentScreen;
