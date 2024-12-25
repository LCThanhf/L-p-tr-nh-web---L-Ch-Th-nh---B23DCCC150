import { useState, useEffect } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    if (props.savedUserData) {
      setPaymentMethod(props.savedUserData.paymentMethod); // Set the saved payment method
    }
  }, [props.savedUserData]);

  const confirmHandler = (event) => {
    event.preventDefault();

    const url = window.location.href;
    if (!url.includes("/table")) {
      setErrorMessage("Cannot find your table!");
      return;
    }

    // Show QR code if payment method is bank transfer
    props.onSubmit({
      paymentMethod,
    });
  };

  const paymentMethodChangeHandler = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      {errorMessage && <p className={classes.error}>{errorMessage}</p>} {/* Display error message */}
      <div className={classes.paymentMethods}>
        <label>Payment Methods</label>
        <div className={classes.radioGroup}>
          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={paymentMethodChangeHandler}
            />
            Cash <i className="fas fa-money-bill"></i>
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="bankTransfer"
              checked={paymentMethod === "bankTransfer"}
              onChange={paymentMethodChangeHandler}
            />
            Bank Transfer <i className="fas fa-university"></i>
          </label>
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" className={classes["button--alt"]} onClick={props.onCancel}>
          Close
        </button>
        <button className={classes.button}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;