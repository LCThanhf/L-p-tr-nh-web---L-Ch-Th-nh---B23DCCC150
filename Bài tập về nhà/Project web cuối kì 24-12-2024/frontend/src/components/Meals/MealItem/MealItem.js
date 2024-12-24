import { useContext } from "react";
import CartContext from "../../../store/Cart-Context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
    const cartContext = useContext(CartContext);
    const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.price);

    const addToCartHandler = (amount) => {
        cartContext.additem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
            image: props.image,
        });
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <img src={props.image} alt={props.name} className={classes.image} />
                <div className={classes.price}>{price}</div>
            </div>
            <div className={classes.formContainer}>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;