import React, {useContext, useEffect, useState} from 'react';
import AppJumbotron from '../../components/Jumbotron/jumbotron';
import MealsContainer from '../../components/MealsContainer/mealscontainer';
import { MyContext } from '../../context';
import Card from 'react-bootstrap/Card';
import './home.css'

function HomePage() {
  const {meals, setMeals} = useContext(MyContext);
  const [trivia, setTrivia] = useState("");
  const apiKey = 'eaea0dae677149da94e80cc7314e6276'; // eaea0dae677149da94e80cc7314e6276

  // calling the Spoonacular API to display food trivia
  useEffect(() => {
    fetch(`https://api.spoonacular.com/food/trivia/random?apiKey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {setTrivia(data.text);})
    .catch(error => console.log(error));
  }, []);

  // calling TheMealDB API to display several meals
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
    .then((res) => res.json())
    .then((data) => {setMeals(data.meals);})
    .catch(error => console.log(error));
  }, []);
  return (
    <div>
        {/* passing the jumbotron and search bar to home page  */}
        <AppJumbotron/>
        {/* trivia card section inside home page */}
        <Card className='trivia-card mt-5' body>Do you know that: {trivia}</Card>;
        {/* passing the meals property from meals container to home page */}
        <MealsContainer meals={meals}/> 
    </div>
  );
}

export default HomePage;