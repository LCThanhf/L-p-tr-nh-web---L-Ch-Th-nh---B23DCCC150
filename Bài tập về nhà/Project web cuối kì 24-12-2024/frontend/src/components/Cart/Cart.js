// filepath: /c:/Users/chith/Downloads/react-food-ordering/frontend/src/components/Cart/Cart.js
import { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import CartContext from "../../store/Cart-Context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [submited, setSubmited] = useState(false);

  const [savedUserData] = useState({ name: '', phone: '', paymentMethod: 'cash' }); // State to save user data

  const cartContext = useContext(CartContext);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    console.log('Received table info in Cart:', props.tableInfo);
  }, [props.tableInfo]);

  const totalAmount = `${Math.max(0, cartContext.totalAmount).toLocaleString('vi-VN')} đ`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
    if (cartContext.items.length === 1) {
      setCheckout(false);
    }
  };

  const cartItemAddHandler = (item) => {
    cartContext.additem({ ...item, amount: 1 });
  };

  const cartItemRemoveAllHandler = (id) => {
    cartContext.removeAllItems(id);
    if (cartContext.items.length === 1) {
      setCheckout(false);
    }
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    if (!props.tableInfo) {
      console.error('Table info is not available');
      return;
    }
  
    setIsSubmiting(true);
    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      body: JSON.stringify({
        tableNumber: props.tableInfo.table_number,
        orderItems: cartContext.items,
        totalAmount: cartContext.totalAmount,
        paymentMethod: userData.paymentMethod,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setTimeout(() => {
      setIsSubmiting(false);
      setSubmited(true);
      cartContext.clearCart();
    }, 1500); // Delay of 1.5 seconds
  };

  const showQrCodeHandler = (userData) => {
    submitOrderHandler(userData); // Directly submit the order for bank transfer payment
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item, id) => (
        <CartItem
          key={id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          image={item.image}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemoveItem={cartItemRemoveAllHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total - Table {props.tableInfo?.table_number}</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={showQrCodeHandler} onCancel={props.onClose} savedUserData={savedUserData} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmitingModalContent = <p>Sending order data...</p>;

  const submitedModalContent = (
    <Fragment>
      <p>
        Successfully sent your order <i className="fas fa-check" style={{ color: 'green' }}></i>
      </p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !submited && cartModalContent}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && submited && submitedModalContent}
    </Modal>
  );
};

export default Cart;