import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner.
      </p>
      <p>
        All our meals are made with high-quality ingredients, served just-in-time and
        of course by experienced chefs! 
      </p>
    </section>
  );
};

export default MealsSummary;
