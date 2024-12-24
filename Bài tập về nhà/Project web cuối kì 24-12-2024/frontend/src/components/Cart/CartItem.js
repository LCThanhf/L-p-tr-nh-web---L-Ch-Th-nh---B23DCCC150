import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.price);

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <img src={props.image} alt={props.name} className={classes.image} />
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemoveItem}>
          <i className="fas fa-trash"></i>
        </button>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;