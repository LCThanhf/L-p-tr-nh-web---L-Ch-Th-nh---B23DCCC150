import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = ({ selectedType }) => {
    return (
        <Fragment>
            <MealsSummary />
            <AvailableMeals selectedType={selectedType} />
        </Fragment>
    );
};

export default Meals;