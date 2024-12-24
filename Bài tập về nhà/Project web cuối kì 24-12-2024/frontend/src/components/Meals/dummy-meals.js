import sushiImg from '../../assets/items/sushi.jpg';
import schnitzelImg from '../../assets/items/schnitzel.jpg';
import barbecuedburgerImg from '../../assets/items/barbecuedburger.jpeg';
import saladImg from '../../assets/items/salad.jpg';
import cokeImg from '../../assets/items/coke.jpg';


const DUMMY_MEALS = [
    {
        id: "m1",
        name: "Sushi",
        description: "Finest fish and veggies",
        price: 22000,
        image: sushiImg,
        category: "SET_ONLY"
    },
    {
        id: "m2",
        name: "Schnitzel",
        description: "A german specialty!",
        price: 16500,
        image: schnitzelImg,
        category: "HOT_DISHES"
    },
    {
        id: "m3",
        name: "Barbecue Burger",
        description: "American, raw, meaty",
        price: 12990,
        image: barbecuedburgerImg,
        category: "HOT_DISHES"
    },
    {
        id: "m4",
        name: "Green Bowl",
        description: "Healthy...and green...",
        price: 18000,
        image: saladImg,
        category: "SET_ONLY"
    },
    {
        id: "m5",
        name: "Coke",
        description: "Refreshing...",
        price: 15000,
        image: cokeImg,
        category: "DRINKS"
    },
];

export default DUMMY_MEALS;
