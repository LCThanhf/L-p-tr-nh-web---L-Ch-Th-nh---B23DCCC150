// frontend/src/components/Meals/MealItem/MealItemForm.js
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const submitHandler = (event) => {
        event.preventDefault();
        props.onAddToCart(1); // Always add 1 item to the cart
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <button type="submit"><i className="fas fa-plus-circle"></i></button>
        </form>
    );
};

export default MealItemForm;