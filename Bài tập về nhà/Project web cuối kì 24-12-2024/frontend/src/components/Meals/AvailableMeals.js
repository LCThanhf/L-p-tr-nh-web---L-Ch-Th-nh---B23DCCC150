import { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import MealTypeFilter from "./MealTypeFilter";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMeals = async () => {
      const typeQuery = selectedType !== 'ALL' ? `?type=${selectedType}` : '';
      const response = await fetch(`http://localhost:5000/api/food-items${typeQuery}`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMeals = data.map(meal => ({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        type: meal.type,
        image: meal.image,
      }));

      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((error) => {
      setLoading(false);
      setHttpError(error.message);
    });
  }, [selectedType]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredMeals = meals.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <section className={classes.mealsLoading}>Loading...</section>;
  }

  if (httpError) {
    return <section className={classes.mealsError}>{httpError}</section>;
  }

  const mealsList = filteredMeals.length > 0 ? (
    filteredMeals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        price={meal.price}
        image={meal.image}
      />
    ))
  ) : (
    <p className={classes.noItemsFound}>Sorry, some items are not available.</p>
  );

  return (
    <section className={classes.meals}>
      <MealTypeFilter selectedType={selectedType} onTypeChange={handleTypeChange} onSearch={handleSearch} />
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;